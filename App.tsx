import React, { useState, useEffect } from 'react';
import Report from './components/Report';
import { initialReportData } from './mockData';
import { fetchAndParseGoldData } from './services/goldService';
import { fetchAndParseSilverData } from './services/silverService';
import { fetchAndParseGlobalIndicesData } from './services/globalIndicesService';
import { fetchAndParseCurrencyData } from './services/currencyService';
import { fetchAndParseFiiDiiData } from './services/fiiDiiService';
import { ReportData } from './types';
import { Download, Eye, Loader, FileText, AlertTriangle } from 'lucide-react';
import PdfGenerator from './components/PdfGenerator';

const App: React.FC = () => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const [goldData, silverData, globalIndices, globalCurrencies, fiiDiiActivity] = await Promise.all([
          fetchAndParseGoldData(),
          fetchAndParseSilverData(),
          fetchAndParseGlobalIndicesData(),
          fetchAndParseCurrencyData(),
          fetchAndParseFiiDiiData(),
        ]);
        setReportData({ ...initialReportData, goldData, silverData, globalIndices, globalCurrencies, fiiDiiActivity } as ReportData);
      } catch (e: any) {
        console.error('Failed to load report data:', e);
        setError(`Could not load and parse dynamic data. ${e.message}`);
      }
    };
    loadData();
  }, []);


  const handleGeneratePdf = () => {
    if (!reportData) return;
    setIsGeneratingPdf(true);
  };
  
  return (
    <div className="min-h-screen bg-brand-beige font-sans text-brand-black flex flex-col items-center p-4 sm:p-8">
      {isGeneratingPdf && reportData && (
        <PdfGenerator 
          reportData={reportData}
          onFinish={() => setIsGeneratingPdf(false)}
        />
      )}

      <div className="w-full max-w-4xl text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <FileText size={40} className="text-brand-black"/>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading">Market Report Generator</h1>
        </div>
        <p className="text-lg mb-8 text-slate-600">
          Create a beautiful, multi-page financial report PDF. Click the button to download.
        </p>

        <div className="bg-white/50 p-6 rounded-lg border-2 border-brand-black shadow-md flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf || !reportData}
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-brand-green text-brand-black font-bold font-heading rounded-lg border-2 border-brand-black text-xl hover:bg-emerald-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? (
              <>
                <Loader className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
               <>
                <Download />
                <span>Generate PDF Report</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowPreview(!showPreview)}
            disabled={isGeneratingPdf}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-brand-yellow text-brand-black font-bold font-heading rounded-lg border-2 border-brand-black text-lg hover:bg-amber-400 transition-all duration-300 disabled:bg-slate-400"
          >
            <Eye />
            <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
        </div>
      </div>

      {/* Report Content Area */}
      <div className="w-full">
        {error && (
          <div className="mt-8 flex flex-col items-center justify-center text-center text-brand-red p-6 bg-red-100 border-2 border-brand-red rounded-lg">
            <AlertTriangle size={48} className="mb-4" />
            <h2 className="text-2xl font-bold font-heading mb-2">Error Loading Data</h2>
            <p>{error}</p>
          </div>
        )}

        {!reportData && !error && (
          <div className="mt-8 flex flex-col items-center justify-center text-slate-700 font-semibold p-8">
              <Loader className="animate-spin" size={48} />
              <p className="mt-4 text-lg">Loading dynamic report data...</p>
          </div>
        )}

        {reportData && (
          <div className={`transition-opacity duration-500 w-full ${showPreview ? 'opacity-100 mt-8' : 'opacity-0 h-0 overflow-hidden'}`}>
             <div className="border-4 border-dashed border-slate-400 p-2 rounded-lg">
                 <Report data={reportData} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;