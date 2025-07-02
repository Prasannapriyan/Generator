import { ReportData } from './types';

// The 'goldData', 'silverData', 'globalIndices', 'globalCurrencies', and 'fiiDiiActivity' properties have been removed.
// This data is now fetched and parsed dynamically from their respective .txt files.
// This object provides the static base for the report.
export const initialReportData: Omit<ReportData, 'goldData' | 'silverData' | 'globalIndices' | 'globalCurrencies' | 'fiiDiiActivity'> = {
  date: "Tue, 10 June 2025",
  marketMood: {
    value: 63,
    change: 4,
  },
  breakoutPulseStocks: [
    { name: "COROMANDEL", value: 2411, change: "+4.9%" },
    { name: "HAPPSTMNDS", value: 615, change: "+4.5%" },
    { name: "ABREL", value: 2460, change: "+4.4%" },
    { name: "OFSS", value: 9161, change: "+4.2%" },
    { name: "UTIAMC", value: 1273, change: "+4.0%" },
  ],
  sectorAnalysis: [
    { name: "NIFTY REALTY", change: "+9.35%" },
    { name: "NIFTY MIDCAP SELECT", change: "+4.64%" },
    { name: "NIFTY INDIA DIGITAL", change: "+3.35%" },
    { name: "NIFTY PSU BANK", change: "+3.33%" },
    { name: "NIFTY METAL", change: "+3.09%" },
  ],
  volumeShockers: [
    { name: "POWER FINANCE", cmp: 431 },
    { name: "JSW ENERGY", cmp: 534 },
    { name: "ADANI POWER", cmp: 563 },
    { name: "ADANI GREEN ENERGY", cmp: 1034 },
    { name: "AMBUJA CEMENTS", cmp: 560 },
  ],
  marketBulletin: [
    "The GIFT Nifty is trading higher, indicating a positive start for the day.",
    "Benchmark equity indices closed higher for the fourth consecutive session on Monday.",
    "Gains were supported by positive global cues, including strong US jobs data.",
    "Asian markets traded higher on Tuesday as investors awaited updates on US-China trade talks.",
    "Japan's Nikkei 225 rose 0.51%, Topix gained 0.3%, South Korea's Kospi increased 0.32%, and Kosdaq added 0.28%.",
    "The S&P 500 closed slightly higher on Monday, boosted by gains in Amazon and Alphabet.",
    "Investors focused on U.S.-China talks aimed at resolving the ongoing trade dispute and reviving the preliminary agreement from last month.",
    "Yields on 10-year and 2-year Treasuries rose slightly in early Tuesday trading.",
    "Oil prices rose Tuesday ahead of U.S.-China trade talks that may boost fuel demand.",
  ],
  niftyTechAnalysis: {
    daily: "Nifty is currently trading around 25,100, near a key resistance zone. The index has formed strong bullish candles over the past few sessions and is trading well above the 50-day SMA, indicating underlying strength.",
    hourly: "In the previous session, price action showed buyers aggressively pushing higher with strong momentum candles. Currently, there is a tight consolidation just below the 25,140 level, suggesting a potential bullish flag or continuation pattern.",
    resistance: ["25,140 – currently faced selling pressure in Intraday", "25,200 – Next resistance zone"],
    support: ["25,080 – Currently found intraday support zone", "25,000 – Next strong support zone"],
  },
  niftyOiAnalysis: {
    data: [
        { strike: 24800, putOI: 50, putIncrease: true, callOI: 10, callIncrease: false },
        { strike: 24900, putOI: 75, putIncrease: true, callOI: 20, callIncrease: true },
        { strike: 25000, putOI: 85, putIncrease: true, callOI: 45, callIncrease: false },
        { strike: 25100, putOI: 40, putIncrease: false, callOI: 70, callIncrease: true },
        { strike: 25200, putOI: 25, putIncrease: false, callOI: 95, callIncrease: true },
        { strike: 25300, putOI: 15, putIncrease: false, callOI: 60, callIncrease: true },
    ],
    summary: [
        "25200 CE is recorded the highest immediate Call OI additions, indicating strong resistance building in the 25200 zone.",
        "On the Put side, 25000 PE, 24900 PE, and 24800 PE saw significant writing, suggesting a firm support base around 24800-25000.",
        "With Nifty closing at 25103, it is trading near resistance. Sustained buying above 25200 could lead to upside momentum, else consolidation is likely."
    ]
  },
   bankNiftyTechAnalysis: {
    daily: "Bank Nifty displayed bullish strength as it opened above the previous all-time high (ATH) of 56,695 and marked a new ATH around 57,049. However, it couldn't sustain the gains and faced selling pressure.",
    hourly: "It witnessed a gap-up and, consolidating in a tight range near the highs, the price is also comfortably above the 50 SMA, reinforcing short-term bullish strength. However, some profit booking is visible at the top.",
    resistance: ["56,900 – Immediate resistance zone", "57,000 – Psychological resistance area"],
    support: ["56,800 – Immediate Intraday support zone", "56,600 – Next support zone"],
  },
  bankNiftyOiAnalysis: {
     data: [
        { strike: 56200, putOI: 18, putIncrease: true, callOI: 2, callIncrease: false },
        { strike: 56500, putOI: 8, putIncrease: true, callOI: 4, callIncrease: true },
        { strike: 56800, putOI: 2, putIncrease: false, callOI: 9, callIncrease: true },
        { strike: 57000, putOI: 1, putIncrease: false, callOI: 13, callIncrease: true },
     ],
     summary: [
        "57000 CE saw the highest Call OI addition, followed by 57500 CE, indicating strong resistance developing between 57000-57500.",
        "On the Put side, 56500 PE and 56000 PE witnessed significant OI build-up, forming a solid support zone around 56000-56500.",
        "With Bank Nifty closing at 56839, it remains trapped between 56500 support and 57000 resistance."
     ]
  },
  keyStocksToWatch: [
    { name: "Capri Global Capital", description: "Launched a QIP to raise ₹2,000 cr at a 19% discount, aiming to expand operations and repay part of its debt." },
    { name: "Apollo Pipes", description: "The company acquired an additional 1.01% stake in its subsidiary Kisan Mouldings through a secondary purchase." },
    { name: "Protean eGov", description: "The company secured a Rs 100 crore order from Bima Sugam India." },
    { name: "Tata Power", description: "TP Solar's Tamil Nadu plant has surpassed 4 GW of solar module production as of May 31, 2025." },
    { name: "HCLTech", description: "Opened a second delivery center in Thiruvananthapuram to support AI, GenAI, Cloud, and emerging tech projects."},
    { name: "Oberoi Realty", description: "Pankaj Gupta has resigned as CEO of the Commercial Real Estate division." },
    { name: "VPRPL", description: "CARE Ratings downgraded VPRPL's Rs 200 crore long-term bank facilities to BBB with a negative outlook." },
  ],
  stocksInFnoBan: ["Aditya Birla Fashion and Retail", "Chambal Fertilisers and Chemicals", "Hindustan Copper", "Titagarh Rail Systems"],
  stocksRemovedFromFnoBan: ["Manappuram Finance"],
  niftyWeeklyPcr: [
    { date: "Jun 05", value: 0.79 },
    { date: "Jun 06", value: 0.98 },
    { date: "Jun 09", value: 0.94 },
  ],
  longBuildUp: [
    { name: "PPLPHARMA", change: "+49.20%" },
    { name: "TITAGARH", change: "+32.30%" },
    { name: "RVNL", change: "+19.40%" },
    { name: "IEX", change: "+18.00%" },
    { name: "MGL", change: "+17.90%" },
  ],
  shortBuildUp: [
    { name: "KAYNES", change: "+25.40%" },
    { name: "BLUESTARCO", change: "+25.30%" },
    { name: "KALYANKJIL", change: "+16.50%" },
    { name: "MAZDOCK", change: "+6.70%" },
    { name: "POLICYBZR", change: "+5.90%" },
  ],
};