import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

interface RequestItem {
  sigunguCd: string;
  bjdongCd: string;
  bun: string;
  ji: string;
  cost?: number; // 월 임대료 또는 매매가 (사용자 입력값)
}

export async function POST(request: NextRequest) {
  const startTime = performance.now();
  try {
    const body = await request.json();
    const { type, items }: { type: 'LEASE' | 'PURCHASE' | 'INVEST', items: RequestItem[] } = body;

    if (!items || items.length < 1) {
      return NextResponse.json({ error: '최소 하나 이상의 물건 정보가 필요합니다.' }, { status: 400 });
    }

    logger.info({
      event: 'building_report_v2.request',
      type,
      itemCount: items.length
    });

    const serviceKey = process.env.BUILDING_API_KEY;
    const baseUrl = `https://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo`;

    // 병렬로 모든 물건 데이터 및 인근 실거래가 가져오기
    const buildingPromises = items.map(async (item) => {
      // 1. 건축물대장 조회
      const queryParams = [
        `serviceKey=${serviceKey}`,
        `sigunguCd=${item.sigunguCd}`,
        `bjdongCd=${item.bjdongCd}`,
        `bun=${(item.bun || '0000').padStart(4, '0')}`,
        `ji=${(item.ji || '0000').padStart(4, '0')}`,
        `numOfRows=1`,
        `pageNo=1`,
        `_type=json`
      ].join('&');

      const finalUrl = `${baseUrl}?${queryParams}`;
      
      try {
        const [bResponse, mResponse] = await Promise.all([
          fetch(finalUrl),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/real-trade?lawdCd=${item.sigunguCd}&dong=${item.bjdongCd}`)
        ]);

        const rawData = await bResponse.text();
        const marketData = await mResponse.json();
        
        if (!bResponse.ok || rawData.trim().startsWith('<')) {
          return { error: true, status: bResponse.status, details: rawData.substring(0, 100) };
        }

        const data = JSON.parse(rawData);
        const apiItem = data.response?.body?.items?.item;
        const buildingData = Array.isArray(apiItem) ? apiItem[0] : apiItem;

        if (!buildingData) {
          return { error: true, message: '데이터를 찾을 수 없습니다.' };
        }

        // 데이터 정규화 (Normalization)
        return {
          id: buildingData.mgmBldrgstPk,
          name: buildingData.bldNm || buildingData.dongNm || '건물명 없음',
          address: buildingData.newPlatPlc || buildingData.platPlc,
          metrics: {
            cost: item.cost || 0,
            area: parseFloat(buildingData.totArea || '0'),
            bcRat: parseFloat(buildingData.bcRat || '0'),
            vlRat: parseFloat(buildingData.vlRat || '0'),
            parking: (parseInt(buildingData.indrMechUtcnt || '0') + parseInt(buildingData.indrAutoUtcnt || '0') +
                      parseInt(buildingData.oudrMechUtcnt || '0') + parseInt(buildingData.oudrAutoUtcnt || '0')),
            year: parseInt((buildingData.useAprDay || '0000').substring(0, 4)),
            violation: buildingData.vlrtBldRgstYn === 'Y' || buildingData.vlrtBldRgstYn === '1',
            marketAvgPyung: marketData.data?.stats?.trade?.avgPricePerPyung || 0
          },
          raw: buildingData
        };
      } catch (err: any) {
        return { error: true, message: err.message };
      }
    });

    const results = await Promise.all(buildingPromises);
    const validBuildings = results.filter((r: any) => !r.error);

    if (validBuildings.length === 0) {
      return NextResponse.json({ error: '유효한 물건 데이터를 불러오지 못했습니다.' }, { status: 500 });
    }

    // 추천 알고리즘 V3 (Dynamic Weights & Reasoning)
    const currentYear = new Date().getFullYear();
    const currentCostBaseline = body.currentCost || 1000;

    // 가중치 설정 (사용자 지정 -> 시스템 학습값 -> 기본값 순으로 적용)
    const systemLearnedWeights = { cost: 0.35, area: 0.35, parking: 0.15, modernity: 0.15 }; // 학습 데이터 예시
    const weights = body.weights || systemLearnedWeights;

    const scores = validBuildings.map((b: any) => {
      let score = 0;
      const age = currentYear - b.metrics.year;

      // 1. 가성비 및 절감액 (Weight: cost)
      const monthlySaving = currentCostBaseline - b.metrics.cost;
      const annualSaving = monthlySaving * 12;
      const costScore = (annualSaving / 100) * 100 * weights.cost;

      // 2. 면적 및 공간 (Weight: area)
      const areaScore = (b.metrics.area / 100) * 100 * weights.area;

      // 3. 주차 편의 (Weight: parking)
      const parkingScore = Math.min(b.metrics.parking / 10, 1) * 100 * weights.parking;

      // 4. 신축도 (Weight: modernity)
      const modernityScore = Math.max(0, (30 - age) / 30) * 100 * weights.modernity;

      score = costScore + areaScore + parkingScore + modernityScore;

      // 위반건축물 감점 (고정 패널티)
      if (b.metrics.violation) score -= 100;

      return {
        score,
        monthlySaving,
        annualSaving,
        cumulativeEffect3Y: (annualSaving * 3) - (b.metrics.cost * 0.1),
        breakdown: { costScore, areaScore, parkingScore, modernityScore }
      };
    });

    const bestBuildingIndex = scores.map(s => s.score).indexOf(Math.max(...scores.map(s => s.score)));
    const bestB = validBuildings[bestBuildingIndex];
    const bestS = scores[bestBuildingIndex];

    // Reasoning Engine V3: 상대적 우위 분석
    let reasoning = "";
    if (type === 'LEASE') {
      const runnerUpIndex = scores.map(s => s.score).indexOf(Math.max(...scores.map((s, i) => i === bestBuildingIndex ? -Infinity : s.score)));
      if (runnerUpIndex !== -1) {
        const other = validBuildings[runnerUpIndex];
        
        if (bestB && bestB.metrics && other && other.metrics) {
          const costDiff = other.metrics.cost - bestB.metrics.cost;
          const areaDiff = bestB.metrics.area - other.metrics.area;
          
          if (costDiff > 0 && areaDiff > 0) {
            reasoning = `후보 ${runnerUpIndex + 1} 대비 월 고정비를 ${costDiff.toLocaleString()}만원 절감하면서도, 면적은 ${(areaDiff * 0.3025).toFixed(1)}평 더 넓어 압도적입니다.`;
          } else if (costDiff > 0) {
            reasoning = `타 후보지 대비 월 약 ${bestS.monthlySaving.toLocaleString()}만원의 비용 절감 효과가 가장 크며, 3년 누적 실질 이익이 극대화됩니다.`;
          } else {
            reasoning = `비용은 다소 높으나 주차 및 공간 효율성 면에서 기업의 브랜드 가치와 실무 편의를 가장 잘 충족합니다.`;
          }
        } else {
          reasoning = `가성비와 공간 효율성이 최적으로 평가되었습니다.`;
        }
      } else {
        reasoning = `가성비와 공간 효율성이 최적으로 평가되었습니다.`;
      }
    } else {
      reasoning = `미래 가치와 자산 건전성, 그리고 수익률 측면에서 가장 높은 점수를 받았습니다.`;
    }

    const responseData = {
      meta: {
        type,
        timestamp: new Date().toISOString(),
        currentCostBaseline,
        weights,
        latency: `${(performance.now() - startTime).toFixed(2)}ms`
      },
      recommendation: {
        bestBuildingIndex,
        reason: reasoning,
        totalScore: bestS.score
      },
      buildings: validBuildings.map((b: any, idx: number) => ({
        ...b,
        score: scores[idx].score,
        analysis: {
          monthlySaving: scores[idx].monthlySaving,
          annualSaving: scores[idx].annualSaving,
          cumulativeEffect3Y: scores[idx].cumulativeEffect3Y,
          breakdown: scores[idx].breakdown
        },
        tags: {
          isBest: idx === bestBuildingIndex,
          isNewest: b.metrics.year === Math.max(...validBuildings.map((v: any) => v.metrics.year)),
          isLargest: b.metrics.area === Math.max(...validBuildings.map((v: any) => v.metrics.area)),
          riskLevel: b.metrics.violation ? 'DANGER' : (currentYear - b.metrics.year > 25 ? 'CAUTION' : 'SAFE')
        }
      }))
    };

    return NextResponse.json(responseData);

  } catch (error: any) {
    logger.error({
      event: 'building_report_v2.fatal_error',
      message: error.message
    });
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}