import { BuildingInfo } from './building';
import { LocationInfo } from './location';
import { Room } from './room';
import { TotalFinancials, LoanSimulation, InvestmentAnalysis } from './financial';
import { NearbyTransaction } from './transaction';

export interface ReportData {
  buildingInfo: BuildingInfo;
  locationInfo: LocationInfo;
  selectedRooms: Room[];
  totalFinancials: TotalFinancials;
  loanSimulation: LoanSimulation | null;
  investmentAnalysis: InvestmentAnalysis;
  nearbyTransactions: NearbyTransaction[];
  generatedAt: string; // 보고서 생성일시
}
