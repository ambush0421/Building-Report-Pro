import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BuildingReportPro",
    short_name: "BuildingReportPro",
    description:
      "AI 기반 부동산 분석 플랫폼: 건축물 데이터 조회, 매입/임차 비교, 리포트 생성 및 공유",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    lang: "ko-KR",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
