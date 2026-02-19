import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

interface PublicApiResponse {
  OpenAPI_ServiceResponse?: {
    cmmMsgHeader?: unknown;
  };
  response?: {
    header?: {
      resultCode?: string | number;
      resultMsg?: string;
    };
    body?: {
      items?: {
        item?: unknown;
      };
      totalCount?: string | number;
    };
  };
}

function toText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
}

function toNumber(value: unknown): number {
  const parsed = Number.parseFloat(toText(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

function toInteger(value: unknown): number {
  const parsed = Number.parseInt(toText(value), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeServiceKey(rawKey: string): string {
  try {
    return decodeURIComponent(rawKey);
  } catch {
    return rawKey;
  }
}

function isAuthRelatedError(rawText: string): boolean {
  const normalized = rawText.toUpperCase();
  return (
    normalized.includes('SERVICE_KEY') ||
    normalized.includes('SERVICE KEY') ||
    normalized.includes('CM700001') ||
    normalized.includes('AUTH_ERROR')
  );
}

function compactSnippet(rawText: string, maxLength: number = 500): string {
  return rawText.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

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

  const serviceKeyRaw = process.env.BUILDING_API_KEY || process.env.DATA_API_KEY;
  if (!serviceKeyRaw) {
    logger.error({
      event: 'building_report.api_key_missing',
      message: 'BUILDING_API_KEY or DATA_API_KEY is not configured'
    });
    return NextResponse.json({ error: '서버 설정 오류: 공공데이터 API 키가 없습니다.' }, { status: 500 });
  }

  const serviceKey = normalizeServiceKey(serviceKeyRaw);
  // [15134735] 국토교통부_건축HUB_건축물대장정보 서비스
  const url = `https://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo`;

  try {
    const queryParams = new URLSearchParams({
      serviceKey,
      sigunguCd,
      bjdongCd,
      bun: bun.padStart(4, '0'),
      ji: ji.padStart(4, '0'),
      numOfRows: '10',
      pageNo: '1',
      _type: 'json'
    }).toString();

    const finalUrl = `${url}?${queryParams}`;

    logger.debug({
      event: 'building_report.api_call',
      url: url,
      params: { sigunguCd, bjdongCd, bun, ji }
    });

    const response = await fetch(finalUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json, text/plain, */*' }
    });
    const rawData = await response.text();
    const details = compactSnippet(rawData);

    if (!response.ok) {
      const authError = isAuthRelatedError(rawData);
      logger.error({
        event: 'building_report.api_error',
        status: response.status,
        details
      });
      return NextResponse.json(
        {
          error: authError ? '공공데이터 API 인증 오류' : '공공데이터 API 서버 응답 오류',
          upstreamStatus: response.status,
          details
        },
        { status: authError ? 401 : 502 }
      );
    }

    if (rawData.trim().startsWith('<')) {
      const authError = isAuthRelatedError(rawData);
      logger.error({
        event: 'building_report.xml_response',
        details
      });
      return NextResponse.json(
        {
          error: authError ? '공공데이터 API 인증 오류' : '공공데이터 API XML 응답 오류',
          details
        },
        { status: authError ? 401 : 502 }
      );
    }

    let data: PublicApiResponse;
    try {
      data = JSON.parse(rawData) as PublicApiResponse;
    } catch {
      logger.error({
        event: 'building_report.invalid_json',
        details
      });
      return NextResponse.json(
        { error: '공공데이터 API 응답 파싱 오류', details },
        { status: 502 }
      );
    }

    if (data?.OpenAPI_ServiceResponse?.cmmMsgHeader) {
      const header = data.OpenAPI_ServiceResponse.cmmMsgHeader;
      const headerText = JSON.stringify(header);
      const authError = isAuthRelatedError(headerText);
      return NextResponse.json(
        {
          error: authError ? '공공데이터 API 인증 오류' : '공공데이터 API 서버 응답 오류',
          details: compactSnippet(headerText, 300)
        },
        { status: authError ? 401 : 502 }
      );
    }

    const resultCode = String(data?.response?.header?.resultCode || '');
    if (resultCode && resultCode !== '00') {
      const resultMsg = String(data?.response?.header?.resultMsg || 'UNKNOWN_ERROR');
      const detailText = `${resultCode}: ${resultMsg}`;
      const authError = isAuthRelatedError(detailText);
      return NextResponse.json(
        {
          error: authError ? '공공데이터 API 인증 오류' : '공공데이터 API 서버 응답 오류',
          details: detailText
        },
        { status: authError ? 401 : 502 }
      );
    }

    const items = data.response?.body?.items?.item;
    const itemList: Array<Record<string, unknown>> = Array.isArray(items)
      ? items.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
      : items && typeof items === 'object'
        ? [items as Record<string, unknown>]
        : [];

    const totalCount = Number(data.response?.body?.totalCount || itemList.length);

    logger.info({
      event: 'building_report.success',
      itemCount: totalCount,
      fetchedCount: itemList.length
    });

    // Transform Data
    const reportItems = itemList.map((item) => {
      const bldNm = toText(item['bldNm']);
      const dongNm = toText(item['dongNm']);
      const newPlatPlc = toText(item['newPlatPlc']);
      const platPlc = toText(item['platPlc']);
      const violationRaw = toText(item['vlrtBldRgstYn']).toUpperCase();

      // Log missing critical fields
      if (!violationRaw && violationRaw !== '0') {
         // Some APIs omit this if 'N' or empty. We'll treat as clean but log debug.
         // logger.debug({ event: 'building_report.field_missing', field: 'vlrtBldRgstYn', pk: item.mgmBldrgstPk });
      }

      return {
        pk: toText(item['mgmBldrgstPk']),
        name: bldNm || dongNm || '건물명 없음',
        address: newPlatPlc || platPlc,
        violation: violationRaw === 'Y' || violationRaw === '1',
        platArea: toNumber(item['platArea']),
        totArea: toNumber(item['totArea']),
        bcRat: toNumber(item['bcRat']), // 건폐율
        vlRat: toNumber(item['vlRat']), // 용적률
        mainPurps: toText(item['mainPurpsCdNm']),
        structure: toText(item['strctCdNm']),
        parking: {
          indoor: toInteger(item['indrMechUtcnt']) + toInteger(item['indrAutoUtcnt']),
          outdoor: toInteger(item['oudrMechUtcnt']) + toInteger(item['oudrAutoUtcnt']),
        },
        raw: item // Keep raw for detail view
      };
    });

    const summary = {
      totalBuildings: reportItems.length,
      violationCount: reportItems.filter((i) => i.violation).length,
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

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error({
      event: 'building_report.fatal_error',
      message
    });
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.', message }, { status: 500 });
  }
}
