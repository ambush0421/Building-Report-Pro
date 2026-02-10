'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// 한글 폰트 등록 (Pretendard-like CDN 폰트 또는 시스템 폰트 활용)
// 실제 환경에서는 로컬 폰트 파일을 사용하는 것이 안전함
Font.register({
  family: 'NanumGothic',
  src: 'https://fonts.gstatic.com/s/nanumgothic/v17/PN_oRbmGL072gcIdZk083_m7H_mPsOfubPk.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NanumGothic',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  coverSub: {
    fontSize: 14,
    color: '#94A3B8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
    borderBottom: '2 solid #2563EB',
    paddingBottom: 5,
  },
  summaryCard: {
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  recommendationLabel: {
    fontSize: 10,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bestBuildingName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#475569',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F8FAFC',
  },
  tableCellLabel: {
    width: '25%',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#64748B',
  },
  tableCellData: {
    width: '25%',
    fontSize: 10,
    paddingLeft: 10,
    color: '#1E293B',
  },
  bestCell: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#94A3B8',
    borderTop: '1 solid #E2E8F0',
    paddingTop: 10,
  }
});

interface PDFReportProps {
  data: any;
}

export const PDFReport = ({ data }: PDFReportProps) => {
  const { buildings, recommendation, meta } = data;
  const bestIdx = recommendation.bestBuildingIndex;

  const toPyung = (m2: number) => (m2 * 0.3025).toFixed(1);

  return (
    <Document>
      {/* 1. 표지 */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>기업 이전 의사결정 보고서</Text>
        <Text style={styles.coverSub}>Building Relocation Decision Report</Text>
        <View style={{ marginTop: 100 }}>
          <Text style={{ fontSize: 12 }}>생성 일시: {new Date(meta.timestamp).toLocaleString('ko-KR')}</Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>분석 유형: {meta.type === 'LEASE' ? '임차 비교' : '매매/투자 비교'}</Text>
        </View>
      </Page>

      {/* 2. 요약 및 비교 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>1. 분석 결과 요약</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.recommendationLabel}>AI 추천 최적 대안</Text>
          <Text style={styles.bestBuildingName}>{buildings[bestIdx].name}</Text>
          <Text style={styles.reasonText}>{recommendation.reason}</Text>
        </View>

        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>핵심 비교표</Text>
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellLabel}>비교 항목</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={styles.tableCellData}>후보 {i + 1}</Text>
            ))}
          </View>
          {/* Data Rows */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>건물명</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={[styles.tableCellData, i === bestIdx ? { fontWeight: 'bold' } : {}]}>{b.name}</Text>
            ))}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>월 고정비</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={styles.tableCellData}>{b.metrics.cost.toLocaleString()}만</Text>
            ))}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>전용면적</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={styles.tableCellData}>{toPyung(b.metrics.area)}평</Text>
            ))}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>인근 시세</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={styles.tableCellData}>{b.metrics.marketAvgPyung?.toLocaleString() || '-'}만</Text>
            ))}
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>3년 누적이익</Text>
            {buildings.map((b: any, i: number) => (
              <Text key={i} style={[styles.tableCellData, i === bestIdx ? styles.bestCell : {}]}>
                {Math.round(b.analysis.cumulativeEffect3Y / 10000)}억
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>© 2026 Building Report Pro - All Rights Reserved</Text>
      </Page>

      {/* 3. 개별 물건 상세 (간소화) */}
      {buildings.map((b: any, idx: number) => (
        <Page key={idx} size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>후보 {idx + 1}. {b.name} 상세 정보</Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 11, color: '#64748B' }}>주소: {b.address}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 15, borderRadius: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>물건 제요</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 준공연도: {b.metrics.year}년</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 연면적: {b.metrics.area.toLocaleString()}㎡</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 주차대수: {b.metrics.parking}대</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 리스크: {b.tags.riskLevel}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 15, borderRadius: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>재무 분석</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 월 임대료: {b.metrics.cost.toLocaleString()}만원</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 월 절감액: {b.analysis.monthlySaving.toLocaleString()}만원</Text>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>- 평당 단가: {(b.metrics.cost / (b.metrics.area * 0.3025)).toFixed(1)}만</Text>
            </View>
          </View>

          <Text style={styles.footer}>Page {idx + 3} | {b.name}</Text>
        </Page>
      ))}
    </Document>
  );
};
