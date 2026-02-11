/**
 * 건물관리번호(25자리)를 파싱하여 시군구코드, 법정동코드, 본번, 부번을 추출합니다.
 */
export const parseBuildingCode = (buildingCode: string) => {
  if (!buildingCode || buildingCode.length < 19) {
    return { sigunguCd: "", bjdongCd: "", bun: "", ji: "" };
  }
  
  return {
    sigunguCd: buildingCode.substring(0, 5),
    bjdongCd: buildingCode.substring(5, 10),
    bun: buildingCode.substring(11, 15),
    ji: buildingCode.substring(15, 19),
  };
};

/**
 * PNU(필지고유번호)를 생성합니다 (19자리).
 */
export const generatePNU = (
  bcode: string, 
  isLand: boolean, 
  mainNum: string, 
  subNum: string
): string => {
  const landGubun = isLand ? "2" : "1"; // 일반=1, 산=2
  return bcode + landGubun + mainNum.padStart(4, "0") + subNum.padStart(4, "0");
};

/**
 * 본번과 부번을 한국식 주소 번지 형태로 포맷팅합니다 (예: 12-3).
 */
export const formatBunJi = (bun: string, ji: string): string => {
  const main = parseInt(bun, 10);
  const sub = parseInt(ji, 10);
  
  if (isNaN(main)) return "";
  if (isNaN(sub) || sub === 0) return main.toString();
  
  return `${main}-${sub}`;
};
