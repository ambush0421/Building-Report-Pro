import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { AutoLearningOptimizer } from '@/lib/services/auto-learning-optimizer';

export const runtime = 'edge';

/**
 * PDCA-Iterator: 시스템 가중치 자동 최적화 엔드포인트
 * 유저 피드백 데이터를 분석하여 AI의 추천 로직을 데이터 기반으로 진화시킵니다.
 */
export async function POST(request: NextRequest) {
  try {
    const result = await AutoLearningOptimizer.optimize();

    if (!result.success) {
      return NextResponse.json({ 
        status: 'skipped', 
        message: result.message 
      });
    }

    return NextResponse.json({
      status: 'success',
      data: result.data,
      reasoning: '피드백 분석 결과, 사용자들이 선택한 물건의 우위 지표를 반영하여 시스템 가중치가 미세 조정되었습니다.'
    });

  } catch (err: any) {
    logger.error({ event: 'api.admin.optimize.error', message: err.message });
    return NextResponse.json({ error: '최적화 수행 중 오류가 발생했습니다.' }, { status: 500 });
  }
}