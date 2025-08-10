
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Player, SessionStats } from '../types.ts';

interface CertificateModalProps {
  player: Player;
  stats: SessionStats;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ player, stats, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { 
        useCORS: true,
        backgroundColor: null // Use transparent background
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `SFMC_Certificate_${player.name.replace(' ', '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const getOrdinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  
  const today = new Date();
  const dateString = `${today.toLocaleString('default', { month: 'long' })} ${getOrdinalSuffix(today.getDate())}, ${today.getFullYear()}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in-up">
      <div className="relative bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 w-full max-w-3xl transform transition-all">
        
        {/* Certificate Content */}
        <div ref={certificateRef} className="bg-white text-gray-800 p-8 rounded-lg shadow-inner" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')"}}>
          <div className="border-4 border-yellow-600 p-4 rounded-md text-center">
            <div className="flex justify-between items-center">
                <i className="fa-solid fa-medal text-5xl text-yellow-500"></i>
                <h1 className="text-3xl font-bold text-gray-700">Certificate of Achievement</h1>
                <i className="fa-solid fa-trophy text-5xl text-yellow-500"></i>
            </div>

            <p className="text-lg mt-8">This certificate is proudly presented to</p>
            
            <p className="font-certificate text-7xl text-blue-800 my-4">{player.name}</p>

            <p className="text-lg">for successfully completing the</p>
            <p className="text-3xl font-bold text-blue-600 my-2">{stats.categoryName} Quiz</p>

            <p className="mt-4">and demonstrating outstanding knowledge in Salesforce Marketing Cloud.</p>
            <p className="text-sm">Awarded on this {dateString}.</p>

             <div className="mt-8 flex justify-between items-end">
                <div className="text-left">
                    <p className="font-certificate text-3xl text-gray-700">Quiz Master</p>
                    <hr className="border-gray-600"/>
                    <p className="text-sm text-gray-600">MarketingCloud Quizzer</p>
                </div>
                <i className="fa-solid fa-stamp text-8xl text-red-700 opacity-80 -rotate-12"></i>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-6 rounded-md shadow-lg hover:scale-105 transform transition-transform"
          >
            <i className="fa-solid fa-download mr-2"></i>Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;