import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET() {
  const start = Date.now();
  
  try {
    // 1. DB 연결성 확인 (간단한 쿼리)
    const { error } = await supabase.from('reports').select('id').limit(1);
    const dbStatus = error ? 'unhealthy' : 'healthy';

    // 2. 환경 변수 체크
    const envStatus = process.env.BUILDING_API_KEY ? 'configured' : 'missing';

    const latency = Date.now() - start;

    return NextResponse.json({
      status: dbStatus === 'healthy' ? 'UP' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      latency: `${latency}ms`,
      checks: {
        database: dbStatus,
        api_config: envStatus
      }
    }, {
      status: dbStatus === 'healthy' ? 200 : 503
    });

  } catch (err) {
    return NextResponse.json({
      status: 'DOWN',
      reason: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
