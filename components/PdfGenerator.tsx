
import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Report from './Report';
import { ReportData } from '../types';
import { Loader } from 'lucide-react';

interface PdfGeneratorProps {
  reportData: ReportData;
  onFinish: () => void;
}

// The report has a fixed number of 11 pages.
const TOTAL_PAGES = 11;

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ reportData, onFinish }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [canvases, setCanvases] = useState<HTMLCanvasElement[]>([]);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect drives the PDF generation process, page by page.
    const generate = async () => {
      // Step 3: All pages are captured, assemble the PDF.
      if (currentPage > TOTAL_PAGES) {
        if (canvases.length > 0) {
          try {
            const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();

            canvases.forEach((canvas, index) => {
              if (index > 0) pdf.addPage();
              const imgHeight = (canvas.height * pdfWidth) / canvas.width;
              const imgData = canvas.toDataURL('image/png');
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            });
            pdf.save('market-report.pdf');
          } catch (error) {
             console.error('Failed to save the PDF:', error);
             alert('Could not save the PDF. Please try again.');
          }
        }
        onFinish();
        return;
      }

      // Step 2: Capture the currently rendered page.
      const pageElementToCapture = pageContainerRef.current?.firstElementChild;
      if (!pageElementToCapture) {
        // This can happen on the first render before the page is in the DOM.
        // The effect will re-run after render, so we can just wait.
        return;
      }

      try {
        // Wait for all necessary assets to be loaded to prevent blank captures.
        await document.fonts.ready;
        const images = Array.from(pageElementToCapture.querySelectorAll('img'));
        await Promise.all(images.map(img => {
            if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
            return new Promise(resolve => { img.onload = img.onerror = resolve; });
        }));
        
        // A small, final delay for complex chart animations/transitions to settle.
        await new Promise(r => setTimeout(r, 300));

        const canvas = await html2canvas(pageElementToCapture as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FDF6E9',
        });

        setCanvases(prev => [...prev, canvas]);
        setCurrentPage(prev => prev + 1);
      } catch (error) {
        console.error(`Failed to capture page ${currentPage}:`, error);
        alert(`An error occurred while generating page ${currentPage}. PDF generation has been cancelled.`);
        onFinish();
      }
    };

    // A timeout gives React time to render the new page before we try to capture it.
    const timerId = setTimeout(generate, 100);
    
    return () => clearTimeout(timerId);

  }, [currentPage, canvases.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 text-white">
      <div className="text-center p-8 bg-brand-black rounded-lg shadow-xl">
        <Loader className="animate-spin mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold font-heading">Generating PDF...</h2>
        <p className="text-lg mt-2">
          {currentPage <= TOTAL_PAGES ? `Processing page ${currentPage} of ${TOTAL_PAGES}` : 'Finalizing document...'}
        </p>
        <p className="text-sm mt-1 text-slate-400">Please wait, this may take a moment.</p>
      </div>

      {/* Hidden container for rendering one page at a time for html2canvas */}
      <div className="absolute top-0 -left-[9999px] w-[800px]">
        <div ref={pageContainerRef}>
          {/* Step 1: Render the current page. */}
          {currentPage <= TOTAL_PAGES && (
            <Report data={reportData} pageToShow={currentPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
