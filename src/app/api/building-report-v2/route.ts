import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { BuildingAnalysisService } from '@/lib/services/building-analysis';

export const runtime = 'edge';

interface RequestItem {
  sigunguCd: string;
  bjdongCd: string;
  bun: string;
  ji: string;
  cost?: number;
}

export async function POST(request: NextRequest) {
  const startTime = performance.now();
  try {
    const body = await request.json();
    const { type, items, weights, currentCost }: { 
      type: 'LEASE' | 'PURCHASE' | 'INVEST', 
      items: RequestItem[],
      weights?: any,
      currentCost?: number
    } = body;

    if (!items || items.length < 1) {
      return NextResponse.json({ error: '최소 하나 이상의 물건 정보가 필요합니다.' }, { status: 400 });
    }

    const serviceKey = process.env.BUILDING_API_KEY;
    const baseUrl = `https://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo`;

    const buildingPromises = items.map(async (item) => {
      const queryParams = new URLSearchParams({
        serviceKey: serviceKey || '',
        sigunguCd: item.sigunguCd,
        bjdongCd: item.bjdongCd,
        bun: (item.bun || '0000').padStart(4, '0'),
        ji: (item.ji || '0000').padStart(4, '0'),
        numOfRows: '1',
        pageNo: '1',
        _type: 'json'
      }).toString();

      try {
        const [bResponse, mResponse] = await Promise.all([
          fetch(`${baseUrl}?${queryParams}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/real-trade?lawdCd=${item.sigunguCd}&dong=${item.bjdongCd}`)
        ]);

        const rawData = await bResponse.text();
        const marketData = await mResponse.json();
        
        if (!bResponse.ok || rawData.trim().startsWith('<')) return { error: true };

        const data = JSON.parse(rawData);
        const b = data.response?.body?.items?.item;
        const itemData = Array.isArray(b) ? b[0] : b;

        if (!itemData) return { error: true };

        return {
          id: itemData.mgmBldrgstPk,
          name: itemData.bldNm || itemData.dongNm || '건물명 없음',
          address: itemData.newPlatPlc || itemData.platPlc,
          metrics: {
            cost: item.cost || 0,
            area: parseFloat(itemData.totArea || '0'),
            parking: (parseInt(itemData.indrMechUtcnt || '0') + parseInt(itemData.indrAutoUtcnt || '0') +
                      parseInt(itemData.oudrMechUtcnt || '0') + parseInt(itemData.oudrAutoUtcnt || '0')),
            year: parseInt((itemData.useAprDay || '0000').substring(0, 4)),
            violation: itemData.vlrtBldRgstYn === 'Y' || itemData.vlrtBldRgstYn === '1',
            marketAvgPyung: marketData.data?.stats?.trade?.avgPricePerPyung || 0
          },
          raw: itemData 
        };
      } catch (err) {
        return { error: true };
      }
    });

    const validBuildings = (await Promise.all(buildingPromises)).filter(b => !b.error);

    if (validBuildings.length === 0) {
      return NextResponse.json({ error: '유효한 데이터를 불러오지 못했습니다.' }, { status: 500 });
    }

    // ★ 핵심: await 추가 ★
    const analysis = await BuildingAnalysisService.analyze(validBuildings, type, weights, currentCost);

    const responseData = {
      meta: {
        type,
        timestamp: new Date().toISOString(),
        weights: analysis.weights,
        latency: `${(performance.now() - startTime).toFixed(2)}ms`
      },
      recommendation: {
        bestBuildingIndex: analysis.bestIndex,
        reason: analysis.reasoning,
        totalScore: analysis.buildings[analysis.bestIndex].analysis.score
      },
      buildings: analysis.buildings.map((b: any, idx: number) => ({
        ...b,
        reportType: type,
        tags: {
          isBest: idx === analysis.bestIndex,
          riskLevel: b.metrics.violation ? 'DANGER' : (new Date().getFullYear() - b.metrics.year > 25 ? 'CAUTION' : 'SAFE')
        }
      }))
    };

    return NextResponse.json(responseData);

  } catch (error: any) {
    logger.error({ event: 'api.v2.error', message: error.message });
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}
