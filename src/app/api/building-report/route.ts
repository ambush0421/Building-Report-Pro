import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sigunguCd = searchParams.get('sigunguCd');
  const bjdongCd = searchParams.get('bjdongCd');
  const bun = searchParams.get('bun') || '0000';
  const ji = searchParams.get('ji') || '0000';

  logger.info({
    event: 'building_report.request',
    params: { sigunguCd, bjdongCd, bun, ji }
  });

  if (!sigunguCd || !bjdongCd) {
    logger.warn({
      event: 'building_report.invalid_params',
      message: 'Missing required parameters'
    });
    return NextResponse.json({ error: '시군구코드와 법정동코드는 필수입니다.' }, { status: 400 });
  }

  const serviceKey = process.env.BUILDING_API_KEY;
  // [15134735] 국토교통부_건축HUB_건축물대장정보 서비스
  const url = `https://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo`;

  try {
    const queryParams = [
      `serviceKey=${serviceKey}`, 
      `sigunguCd=${sigunguCd}`,
      `bjdongCd=${bjdongCd}`,
      `bun=${bun.padStart(4, '0')}`,
      `ji=${ji.padStart(4, '0')}`,
      `numOfRows=10`,
      `pageNo=1`,
      `_type=json`
    ].join('&');

    const finalUrl = `${url}?${queryParams}`;

    logger.debug({
      event: 'building_report.api_call',
      url: url,
      params: { sigunguCd, bjdongCd, bun, ji }
    });

    const response = await fetch(finalUrl);
    const rawData = await response.text();

    if (!response.ok) {
      logger.error({
        event: 'building_report.api_error',
        status: response.status,
        details: rawData.substring(0, 500)
      });
      return NextResponse.json({ error: '공공데이터 API 서버 응답 오류', details: rawData.substring(0, 500) }, { status: response.status });
    }

    if (rawData.trim().startsWith('<')) {
      logger.error({
        event: 'building_report.xml_response',
        details: rawData.substring(0, 500)
      });
      return NextResponse.json({ error: '인증 오류 또는 잘못된 요청입니다. (XML 응답)', details: rawData.substring(0, 200) }, { status: 401 });
    }

    const data = JSON.parse(rawData);
    const items = data.response?.body?.items?.item;
    const itemList = Array.isArray(items) ? items : (items ? [items] : []);

    logger.info({
      event: 'building_report.success',
      itemCount: data.response?.body?.totalCount || 0,
      fetchedCount: itemList.length
    });

    // Transform Data
    const reportItems = itemList.map((item: any) => {
      // Log missing critical fields
      if (!item.vlrtBldRgstYn && item.vlrtBldRgstYn !== '0') {
         // Some APIs omit this if 'N' or empty. We'll treat as clean but log debug.
         // logger.debug({ event: 'building_report.field_missing', field: 'vlrtBldRgstYn', pk: item.mgmBldrgstPk });
      }

      return {
        pk: item.mgmBldrgstPk,
        name: item.bldNm || item.dongNm || '건물명 없음',
        address: item.newPlatPlc || item.platPlc,
        violation: item.vlrtBldRgstYn === 'Y' || item.vlrtBldRgstYn === '1',
        platArea: parseFloat(item.platArea || '0'),
        totArea: parseFloat(item.totArea || '0'),
        bcRat: parseFloat(item.bcRat || '0'), // 건폐율
        vlRat: parseFloat(item.vlRat || '0'), // 용적률
        mainPurps: item.mainPurpsCdNm,
        structure: item.strctCdNm,
        parking: {
          indoor: parseInt(item.indrMechUtcnt || '0') + parseInt(item.indrAutoUtcnt || '0'),
          outdoor: parseInt(item.oudrMechUtcnt || '0') + parseInt(item.oudrAutoUtcnt || '0'),
        },
        raw: item // Keep raw for detail view
      };
    });

    const summary = {
      totalBuildings: reportItems.length,
      violationCount: reportItems.filter((i: any) => i.violation).length,
      avgAge: 0 // Placeholder for now
    };

    return NextResponse.json({
      meta: {
        request: { sigunguCd, bjdongCd, bun, ji },
        timestamp: new Date().toISOString()
      },
      summary,
      items: reportItems
    });

  } catch (error: any) {
    logger.error({
      event: 'building_report.fatal_error',
      message: error.message
    });
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.', message: error.message }, { status: 500 });
  }
}
