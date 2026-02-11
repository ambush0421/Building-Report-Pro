import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

const API_URL = 'https://apis.data.go.kr/1613000/IndvdlPannPrcService/getIndvdlPannPrcInfo';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sigunguCd = searchParams.get('sigunguCd');
  const bjdongCd = searchParams.get('bjdongCd');
  const bun = searchParams.get('bun');
  const ji = searchParams.get('ji');

  const apiKey = process.env.BUILDING_API_KEY || process.env.DATA_API_KEY || 'OjpqanOc0ZOlfUfzfWWFeZle0K%2FsCsE6VZm8C%2FKn0DeZShHh%2FvddaJwRAzj0MMYSuYUA%3D%3D';

  try {
    const queryParams = new URLSearchParams({
      serviceKey: decodeURIComponent(apiKey),
      sigunguCd: sigunguCd || '',
      bjdongCd: bjdongCd || '',
      bun: (bun || '0').padStart(4, '0'),
      ji: (ji || '0').padStart(4, '0'),
      _type: 'json',
      numOfRows: '10',
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`);
    const rawData = await response.text();

    if (rawData.includes('<CM700001>')) {
      return NextResponse.json({ success: false, error: '공시지가 API 인증 오류' }, { status: 401 });
    }

    const data = JSON.parse(rawData);
    const items = data.response?.body?.items?.item;
    if (!items) return NextResponse.json({ success: false, error: '공시지가 정보를 찾을 수 없습니다.' }, { status: 404 });

    const list = Array.isArray(items) ? items : [items];
    const result = list.map((item: any) => ({
      year: item.pblntfYear,
      price: Number(item.pannPrc || 0),
    })).sort((a, b) => Number(a.year) - Number(b.year));

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    logger.error({ event: 'api.price.error', message: error.message });
    return NextResponse.json({ success: false, error: '공시지가 API 호출 오류' }, { status: 500 });
  }
}