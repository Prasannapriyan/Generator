
export interface StockInfo {
  name: string;
  value: number | string;
  change: string;
}

export interface SectorInfo {
  name: string;
  change: string;
}

export interface VolumeShocker {
  name: string;
  cmp: number;
}

export interface IndexData {
  name: string;
  country?: string;
  ltp: string;
  change: string;
  changePercent: string;
}

export interface CurrencyData {
  code: string;
  name: string;
  countryName: string;
  countryFlag: string;
  value: number;
}

export interface OpenInterestData {
  strike: number;
  putOI: number;
  putIncrease: boolean;
  callOI: number;
  callIncrease: boolean;
}

export interface FiiDiiData {
  period: string;
  fii: number;
  dii: number;
}

export interface BuildUpData {
  name: string;
  change: string;
}

export interface KeyStock {
  name: string;
  description: string;
}

export interface GoldPrice {
  price: number;
  change: number;
}

export interface GoldHistoryEntry {
  date: string;
  price24k: number;
  change24k: number;
  price22k: number;
  change22k: number;
}

export interface GoldData {
  today24k: GoldPrice;
  today22k: GoldPrice;
  history: GoldHistoryEntry[];
}

export interface SilverPrice {
  price: number;
  change: number;
}

export interface SilverHistoryEntry {
  date: string;
  price1g: number;
  change1g: number;
  price100g: number;
  price1kg: number;
}

export interface SilverData {
  todayGram: SilverPrice;
  todayKg: SilverPrice;
  history: SilverHistoryEntry[];
}

export interface ReportData {
  date: string;
  marketMood: {
    value: number;
    change: number;
  };
  breakoutPulseStocks: StockInfo[];
  sectorAnalysis: SectorInfo[];
  volumeShockers: VolumeShocker[];
  globalIndices: IndexData[];
  globalCurrencies: CurrencyData[];
  marketBulletin: string[];
  niftyTechAnalysis: {
    daily: string;
    hourly: string;
    resistance: string[];
    support: string[];
  };
  niftyOiAnalysis: {
    data: OpenInterestData[];
    summary: string[];
  };
  bankNiftyTechAnalysis: {
    daily: string;
    hourly: string;
    resistance: string[];
    support: string[];
  };
  bankNiftyOiAnalysis: {
     data: OpenInterestData[];
     summary: string[];
  };
  keyStocksToWatch: KeyStock[];
  stocksInFnoBan: string[];
  stocksRemovedFromFnoBan: string[];
  fiiDiiActivity: FiiDiiData[];
  niftyWeeklyPcr: { date: string; value: number }[];
  longBuildUp: BuildUpData[];
  shortBuildUp: BuildUpData[];
  goldData: GoldData;
  silverData: SilverData;
}