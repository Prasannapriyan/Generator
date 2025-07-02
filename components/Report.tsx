


import React, { ReactNode } from 'react';
import { ReportData, GoldPrice, GoldHistoryEntry, SilverPrice, SilverHistoryEntry } from '../types';
import MMIGauge from './MMIGauge';
import OpenInterestChart from './OpenInterestChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from 'recharts';
import { CheckCircle2, TrendingUp, Zap, ChevronsRight, Target, Shield, DollarSign, List, BarChart2, Briefcase, Award, Gem } from 'lucide-react';


interface ReportProps {
  data: ReportData;
  pageToShow?: number;
}

// Internal components for styling
const Page: React.FC<{ title: string; children: ReactNode; pageNumber: number; date: string; }> = ({ title, children, pageNumber, date }) => (
  <div className="a4-page-container w-[800px] min-h-[1131px] bg-brand-beige p-8 flex flex-col shadow-lg font-sans text-brand-black">
    <header className="flex justify-between items-center pb-4 border-b-2 border-brand-black">
      <h1 className="text-2xl font-bold font-heading">{title}</h1>
      <p className="font-semibold font-heading">{date}</p>
    </header>
    <main className="flex-grow pt-6">
      {children}
    </main>
    <footer className="text-center text-sm font-semibold pt-4 border-t-2 border-brand-black">
      <p>www.themarketmood.com | Page {pageNumber}</p>
    </footer>
  </div>
);

const Section: React.FC<{ title: string; icon?: ReactNode; children: ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-3">
        {icon}
        <h2 className="text-2xl font-bold font-heading">{title}</h2>
    </div>
    <div className="border-2 border-brand-black rounded-lg p-4 bg-white/30">
        {children}
    </div>
  </div>
);

const Report: React.FC<ReportProps> = ({ data, pageToShow }) => {

  const FiiDiiTable: React.FC = () => (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b-2 border-brand-black">
          <th className="p-2 font-bold font-heading text-brand-black">Period</th>
          <th className="p-2 font-bold font-heading text-right text-brand-black">FII (Cr)</th>
          <th className="p-2 font-bold font-heading text-right text-brand-black">DII (Cr)</th>
        </tr>
      </thead>
      <tbody>
        {data.fiiDiiActivity.map((item, index) => (
          <tr key={index} className="border-b border-brand-black/20">
            <td className="p-2 font-semibold text-brand-black">{item.period}</td>
            <td className={`p-2 font-mono text-right ${item.fii > 0 ? 'text-brand-green' : 'text-brand-red'}`}>{item.fii.toLocaleString()}</td>
            <td className={`p-2 font-mono text-right ${item.dii > 0 ? 'text-brand-green' : 'text-brand-red'}`}>{item.dii.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const InfoTable: React.FC<{ headers: string[], rows: (string | number)[][], highlightLast?: boolean, highlightChanges?: boolean }> = ({ headers, rows, highlightLast = false, highlightChanges = false }) => {
    const getTextColor = (cell: string | number) => {
      const s = cell.toString();
      if (s.startsWith('+')) return 'text-brand-green';
      if (s.startsWith('-')) return 'text-brand-red';
      return 'text-brand-black';
    };

    return (
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-2 border-brand-black">
            {headers.map((h, i) => <th key={h} className={`p-2 font-bold font-heading text-brand-black ${i > 0 ? 'text-left' : ''}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-brand-black/20">
              {row.map((cell, cellIndex) => {
                 let textColor = 'text-brand-black';
                 // Apply coloring logic based on props
                 if (highlightChanges && cellIndex > 0) {
                   textColor = getTextColor(cell);
                 } else if (highlightLast && cellIndex === row.length - 1) {
                   textColor = getTextColor(cell);
                 }

                return (
                  <td key={cellIndex} className={`p-2 ${cellIndex === 0 ? 'font-semibold' : 'font-mono'} ${textColor}`}>
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  const GoldPage: React.FC = () => {
    if (!data.goldData) return null;

    const GoldChangeCard: React.FC<{ karat: '24K' | '22K'; data: GoldPrice }> = ({ karat, data }) => {
      const isPositive = data.change >= 0;
      return (
        <div className="bg-emerald-50 rounded-lg p-4 border-2 border-brand-black flex flex-col justify-center items-center gap-2">
          <p className="font-bold font-heading text-2xl text-brand-black">{karat} Gold <span className="text-lg text-slate-500">/g</span></p>
          <p className="text-3xl font-bold font-mono text-brand-black">₹{data.price.toLocaleString()}</p>
          <p className={`text-lg font-semibold ${isPositive ? 'text-brand-green' : 'text-brand-red'}`}>
            {isPositive ? '+' : ''} ₹{Math.abs(data.change).toLocaleString()} {isPositive ? '▲' : '▼'}
          </p>
        </div>
      );
    };

    const GoldHistoryTable: React.FC<{ history: GoldHistoryEntry[] }> = ({ history }) => {
        const getChangeColor = (change: number) => {
            if (change > 0) return 'text-brand-green';
            if (change < 0) return 'text-brand-red';
            return 'text-brand-black';
        };
        const reversedHistory = [...history].reverse();

        return (
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b-2 border-brand-black">
                        <th className="p-2 font-bold font-heading text-brand-black">Date</th>
                        <th className="p-2 font-bold font-heading text-brand-black text-left">24K Price (₹)</th>
                        <th className="p-2 font-bold font-heading text-brand-black text-left">22K Price (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedHistory.map((item, index) => (
                        <tr key={index} className="border-b border-brand-black/20">
                            <td className="p-2 font-semibold text-brand-black">{item.date}</td>
                            <td className="p-2 font-mono text-brand-black">
                                {item.price24k.toLocaleString()}
                                <span className={`ml-2 ${getChangeColor(item.change24k)}`}>
                                    ({item.change24k >= 0 ? '+' : ''}{item.change24k})
                                </span>
                            </td>
                            <td className="p-2 font-mono text-brand-black">
                                {item.price22k.toLocaleString()}
                                <span className={`ml-2 ${getChangeColor(item.change22k)}`}>
                                    ({item.change22k >= 0 ? '+' : ''}{item.change22k})
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const goldHistory = data.goldData.history;
    const prices24k = goldHistory.map(d => d.price24k);
    const min24k = Math.min(...prices24k);
    const max24k = Math.max(...prices24k);
    const domain24k = [Math.floor(min24k / 100) * 100, Math.ceil(max24k / 100) * 100];
    
    const prices22k = goldHistory.map(d => d.price22k);
    const min22k = Math.min(...prices22k);
    const max22k = Math.max(...prices22k);
    const domain22k = [Math.floor(min22k / 100) * 100, Math.ceil(max22k / 100) * 100];

    const formatChartDate = (date: string) => date.split(',')[0];

    return (
      <Page title="GOLD" pageNumber={10} date={data.date}>
        <Section title="Gold Rate Today (Chennai)" icon={<Award className="text-amber-500"/>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoldChangeCard karat="24K" data={data.goldData.today24k} />
            <GoldChangeCard karat="22K" data={data.goldData.today22k} />
          </div>
        </Section>
        <Section title="Gold Rate Last 10 Days" icon={<List />}>
            <GoldHistoryTable history={data.goldData.history} />
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Section title="24K Gold Trend" icon={<BarChart2 />}>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.goldData.history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" strokeOpacity={0.2} />
                      <XAxis dataKey="date" stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} tickFormatter={formatChartDate}/>
                      <YAxis stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} domain={domain24k} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#FDF6E9', border: '2px solid #1E293B', borderRadius: '0.5rem', color: '#1E293B' }} />
                      <Legend wrapperStyle={{ color: '#1E293B' }} />
                      <Line isAnimationActive={false} type="monotone" dataKey="price24k" name="24K Price" stroke="#FBBF24" strokeWidth={3} dot={false}/>
                  </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>
          <Section title="22K Gold Trend" icon={<BarChart2 />}>
             <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.goldData.history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" strokeOpacity={0.2} />
                        <XAxis dataKey="date" stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} tickFormatter={formatChartDate}/>
                        <YAxis stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} domain={domain22k} allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#FDF6E9', border: '2px solid #1E293B', borderRadius: '0.5rem', color: '#1E293B' }} />
                        <Legend wrapperStyle={{ color: '#1E293B' }} />
                        <Line isAnimationActive={false} type="monotone" dataKey="price22k" name="22K Price" stroke="#F87171" strokeWidth={3} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
              </div>
          </Section>
        </div>
      </Page>
    );
  };
  
  const SilverPage: React.FC = () => {
    if (!data.silverData) return null;

    const SilverChangeCard: React.FC<{ type: 'gram' | 'kg'; data: SilverPrice }> = ({ type, data }) => {
      const isPositive = data.change >= 0;
      const changeOptions = type === 'gram' 
        ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } 
        : {};
      return (
        <div className="bg-emerald-50 rounded-lg p-4 border-2 border-brand-black flex flex-col justify-center items-center gap-2">
          <p className="font-bold font-heading text-2xl text-brand-black">Silver <span className="text-lg text-slate-500">/{type === 'gram' ? 'g' : 'kg'}</span></p>
          <p className="text-3xl font-bold font-mono text-brand-black">₹{data.price.toLocaleString('en-IN')}</p>
          <p className={`text-lg font-semibold ${isPositive ? 'text-brand-green' : 'text-brand-red'}`}>
            {isPositive ? '+' : ''} ₹{Math.abs(data.change).toLocaleString('en-IN', changeOptions)} {isPositive ? '▲' : '▼'}
          </p>
        </div>
      );
    };

    const SilverHistoryTable: React.FC<{ history: SilverHistoryEntry[] }> = ({ history }) => {
        const getChangeColor = (change: number) => {
            if (change >= 0) return 'text-brand-green';
            return 'text-brand-red';
        };
        const reversedHistory = [...history].reverse();
        const numberFormat = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

        return (
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b-2 border-brand-black">
                        <th className="p-2 font-bold font-heading text-brand-black">Date</th>
                        <th className="p-2 font-bold font-heading text-brand-black text-left">1 gram</th>
                        <th className="p-2 font-bold font-heading text-brand-black text-left">100 gram</th>
                        <th className="p-2 font-bold font-heading text-brand-black text-left">1 Kg</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedHistory.map((item, index) => (
                        <tr key={index} className="border-b border-brand-black/20">
                            <td className="p-2 font-semibold text-brand-black">{item.date}</td>
                            <td className="p-2 font-mono text-brand-black">
                                ₹{item.price1g.toLocaleString('en-IN', numberFormat)}
                                <span className={`ml-2 ${getChangeColor(item.change1g)}`}>
                                    ({item.change1g >= 0 ? '+' : ''}{item.change1g.toLocaleString('en-IN', numberFormat)})
                                </span>
                            </td>
                            <td className="p-2 font-mono text-brand-black">₹{item.price100g.toLocaleString('en-IN')}</td>
                            <td className="p-2 font-mono text-brand-black">₹{item.price1kg.toLocaleString('en-IN')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const chartData = data.silverData.history.map(entry => ({
        date: entry.date,
        pricePerGram: entry.price1g
    }));

    const domain = [114, 124];
    const ticks = [114, 116, 118, 120, 122, 124];
    const formatChartDate = (date: string) => date.split(',')[0];

    return (
      <Page title="SILVER" pageNumber={11} date={data.date}>
        <Section title="Silver Rate Today (Chennai)" icon={<Gem className="text-slate-500"/>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SilverChangeCard type="gram" data={data.silverData.todayGram} />
            <SilverChangeCard type="kg" data={data.silverData.todayKg} />
          </div>
        </Section>
        <Section title="Silver Rate Last 10 Days" icon={<List />}>
            <SilverHistoryTable history={data.silverData.history} />
        </Section>
        <div className="grid grid-cols-1 mt-6">
          <Section title="Silver Rate Per Gram Trend" icon={<BarChart2 />}>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" strokeOpacity={0.2} />
                      <XAxis dataKey="date" stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} tickFormatter={formatChartDate}/>
                      <YAxis 
                        stroke="#1E293B" 
                        tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#1E293B' }} 
                        domain={domain} 
                        ticks={ticks}
                        allowDecimals={false} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FDF6E9', border: '2px solid #1E293B', borderRadius: '0.5rem', color: '#1E293B' }}
                        formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price/g']}
                      />
                      <Legend wrapperStyle={{ color: '#1E293B' }} />
                      <Line isAnimationActive={false} type="monotone" dataKey="pricePerGram" name="Silver Price /g" stroke="#94A3B8" strokeWidth={3} dot={false}/>
                  </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      </Page>
    );
  };
  
  const allPages = [
    <Page key="page-1" title="The Market Mood" pageNumber={1} date={data.date}>
      <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
              <Section title="Market Mood Index (MMI)" icon={<BarChart2 className="text-brand-black" />}>
                <div className="flex justify-center items-center">
                  <MMIGauge value={data.marketMood.value} />
                </div>
              </Section>
          </div>
          <Section title="Breakout Pulse Stocks" icon={<TrendingUp className="text-brand-black"/>}>
            <InfoTable 
              headers={['Name', 'Price', 'Change %']} 
              rows={data.breakoutPulseStocks.map(s => [s.name, s.value, s.change])}
              highlightLast={true}
            />
          </Section>
          <Section title="Volume Shockers" icon={<Zap className="text-brand-black"/>}>
            <InfoTable 
              headers={['Name', 'CMP']} 
              rows={data.volumeShockers.map(s => [s.name, s.cmp])}
            />
          </Section>
           <div className="col-span-2">
              <Section title="Sector Analysis" icon={<ChevronsRight className="text-brand-black"/>}>
              <InfoTable 
                  headers={['Name', 'Week Change %']} 
                  rows={data.sectorAnalysis.map(s => [s.name, s.change])}
                  highlightLast={true}
              />
              </Section>
          </div>
      </div>
    </Page>,
    <Page key="page-2" title="The Market Mood" pageNumber={2} date={data.date}>
      <Section title="Key Global Indices" icon={<Briefcase className="text-brand-black"/>}>
         <InfoTable 
              headers={['Name', 'LTP', 'Change', 'Change %']} 
              rows={data.globalIndices.map(s => [`${s.country ? s.country + ' ' : ''}${s.name}`, s.ltp, s.change, s.changePercent])}
              highlightChanges={true}
          />
      </Section>
      <Section title="Global Currency Data" icon={<DollarSign className="text-brand-black"/>}>
         <InfoTable 
              headers={['Currency', 'Name', 'Country', 'Value (in INR)']} 
              rows={data.globalCurrencies.map(c => [
                  `${c.countryFlag} ${c.code}`,
                  c.name,
                  c.countryName,
                  `₹${c.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              ])}
          />
      </Section>
    </Page>,
    <Page key="page-3" title="The Market Mood" pageNumber={3} date={data.date}>
      <Section title="Market Bulletin" icon={<List className="text-brand-black"/>}>
          <ul className="space-y-3">
              {data.marketBulletin.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-green mt-1 flex-shrink-0" size={20} />
                      <span className="text-brand-black">{item}</span>
                  </li>
              ))}
          </ul>
      </Section>
    </Page>,
    <Page key="page-4" title="The Market Mood" pageNumber={4} date={data.date}>
       <Section title="Nifty Technical Analysis" icon={<BarChart2 className="text-brand-black"/>}>
            <img src="https://picsum.photos/700/300?random=1" alt="Nifty Chart" className="w-full rounded-lg border-2 border-brand-black mb-4" />
            <div className="space-y-4 text-sm text-brand-black">
                <p><strong className="font-bold">Daily Chart Analysis:</strong> {data.niftyTechAnalysis.daily}</p>
                <p><strong className="font-bold">1-Hour Chart Analysis:</strong> {data.niftyTechAnalysis.hourly}</p>
                <div>
                    <h4 className="font-bold font-heading text-lg mb-2 text-brand-red">Resistance</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {data.niftyTechAnalysis.resistance.map(r => <li key={r}>{r}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold font-heading text-lg mb-2 text-brand-green">Support</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {data.niftyTechAnalysis.support.map(s => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            </div>
       </Section>
    </Page>,
    <Page key="page-5" title="The Market Mood" pageNumber={5} date={data.date}>
       <Section title="Bank Nifty Technical Analysis" icon={<BarChart2 className="text-brand-black"/>}>
            <img src="https://picsum.photos/700/300?random=2" alt="Bank Nifty Chart" className="w-full rounded-lg border-2 border-brand-black mb-4" />
            <div className="space-y-4 text-sm text-brand-black">
                <p><strong className="font-bold">Daily Chart Analysis:</strong> {data.bankNiftyTechAnalysis.daily}</p>
                <p><strong className="font-bold">1-Hour Chart Analysis:</strong> {data.bankNiftyTechAnalysis.hourly}</p>
                <div>
                    <h4 className="font-bold font-heading text-lg mb-2 text-brand-red">Resistance</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {data.bankNiftyTechAnalysis.resistance.map(r => <li key={r}>{r}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold font-heading text-lg mb-2 text-brand-green">Support</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {data.bankNiftyTechAnalysis.support.map(s => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            </div>
       </Section>
    </Page>,
     <Page key="page-6" title="The Market Mood" pageNumber={6} date={data.date}>
        <Section title="Nifty Open Interest Analysis" icon={<Target className="text-brand-black"/>}>
            <OpenInterestChart data={data.niftyOiAnalysis.data} />
            <div className="mt-4 space-y-2 text-sm text-brand-black">
                {data.niftyOiAnalysis.summary.map((item, i) => (
                    <p key={i} className="flex items-start gap-2"><ChevronsRight size={16} className="mt-1 text-slate-500" />{item}</p>
                ))}
            </div>
        </Section>
        <Section title="Bank Nifty Open Interest Analysis" icon={<Target className="text-brand-black"/>}>
            <OpenInterestChart data={data.bankNiftyOiAnalysis.data} />
             <div className="mt-4 space-y-2 text-sm text-brand-black">
                {data.bankNiftyOiAnalysis.summary.map((item, i) => (
                    <p key={i} className="flex items-start gap-2"><ChevronsRight size={16} className="mt-1 text-slate-500" />{item}</p>
                ))}
            </div>
        </Section>
    </Page>,
    <Page key="page-7" title="The Market Mood" pageNumber={7} date={data.date}>
      <Section title="Key Stocks to Watch" icon={<Award className="text-brand-black"/>}>
        <ul className="space-y-4">
          {data.keyStocksToWatch.map((stock, index) => (
            <li key={index} className="border-b border-brand-black/10 pb-3 last:border-b-0">
              <p className="font-bold text-lg text-brand-black font-heading">{stock.name}</p>
              <p className="text-brand-black text-sm">{stock.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </Page>,
    <Page key="page-8" title="The Market Mood" pageNumber={8} date={data.date}>
        <Section title="Stocks in F&O Ban" icon={<Shield className="text-brand-black"/>}>
            <div className="flex flex-wrap gap-2">
                {data.stocksInFnoBan.map(stock => (
                    <span key={stock} className="bg-red-100 text-brand-red font-semibold px-3 py-1 rounded-md text-sm border border-brand-red">{stock}</span>
                ))}
            </div>
        </Section>
        <Section title="Stocks Removed from F&O Ban" icon={<CheckCircle2 className="text-brand-black"/>}>
            <div className="flex flex-wrap gap-2">
                {data.stocksRemovedFromFnoBan.map(stock => (
                    <span key={stock} className="bg-green-100 text-brand-green font-semibold px-3 py-1 rounded-md text-sm border border-brand-green">{stock}</span>
                ))}
            </div>
        </Section>
        <Section title="FII/DII Activity (Net Crores)" icon={<Briefcase className="text-brand-black"/>}>
            <FiiDiiTable />
        </Section>
    </Page>,
    <Page key="page-9" title="The Market Mood" pageNumber={9} date={data.date}>
        <div className="grid grid-cols-2 gap-6">
            <Section title="Long Build-Up" icon={<TrendingUp className="text-brand-green"/>}>
                <InfoTable 
                    headers={['Name', 'OI Change %']}
                    rows={data.longBuildUp.map(s => [s.name, s.change])}
                    highlightLast={true}
                />
            </Section>
            <Section title="Short Build-Up" icon={<TrendingUp className="text-brand-red"/>}>
                <InfoTable 
                    headers={['Name', 'OI Change %']}
                    rows={data.shortBuildUp.map(s => [s.name, s.change])}
                    highlightLast={true}
                />
            </Section>
            <div className="col-span-2">
                <Section title="Nifty Weekly PCR Trend" icon={<BarChart2 />}>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.niftyWeeklyPcr}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" strokeOpacity={0.2} />
                                <XAxis dataKey="date" stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12 }} />
                                <YAxis stroke="#1E293B" tick={{ fontFamily: 'Inter', fontSize: 12 }} domain={[0.6, 1.2]}/>
                                <Tooltip contentStyle={{ backgroundColor: '#FDF6E9', border: '2px solid #1E293B', borderRadius: '0.5rem', color: '#1E293B' }} />
                                <Bar isAnimationActive={false} dataKey="value" name="PCR Value" fill="#8884d8">
                                    {data.niftyWeeklyPcr.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.value > 1 ? '#34D399' : '#F87171'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Section>
            </div>
        </div>
    </Page>,
    <GoldPage />,
    <SilverPage />,
  ];

  if (pageToShow) {
    // This is used by the PDF generator to render one page at a time.
    return allPages[pageToShow - 1] || null;
  }
  
  // This is used for the live preview, rendering all pages.
  return <>{allPages}</>;
};

export default Report;