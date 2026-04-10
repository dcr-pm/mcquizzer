import React from 'react';
import { Certification } from '../types.ts';

interface CertSelectionScreenProps {
  certifications: Certification[];
  onSelectCert: (cert: Certification) => void;
  onBack: () => void;
}

const CertSelectionScreen: React.FC<CertSelectionScreenProps> = ({ certifications, onSelectCert, onBack }) => {
  return (
    <div className="py-6 sm:py-8 animate-fade-in-up max-w-3xl mx-auto">
      <button onClick={onBack} className="text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <i className="fa-solid fa-arrow-left mr-2"></i>Back to Home
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-certificate text-2xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cert Prep Pro</h1>
        <p className="text-gray-400 text-sm">Choose a certification to start studying</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map(cert => (
          <button
            key={cert.id}
            onClick={() => onSelectCert(cert)}
            className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-left hover:border-white/25 hover:scale-[1.02] transition-all group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${cert.gradient} flex items-center justify-center mb-4`}>
              <i className={`fa-solid ${cert.icon} text-2xl text-white`}></i>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">{cert.name}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">{cert.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span><i className="fa-solid fa-list-check mr-1"></i>{cert.examQuestionCount} questions</span>
              <span><i className="fa-solid fa-clock mr-1"></i>{cert.examTimeLimitMinutes} min</span>
              <span><i className="fa-solid fa-bullseye mr-1"></i>{cert.passingScore}% to pass</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertSelectionScreen;
