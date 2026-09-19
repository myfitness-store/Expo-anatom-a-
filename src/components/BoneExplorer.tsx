import React, { useState } from 'react';
import { Bone, BonePart } from '../types';
import { BONES_DATA } from '../data/anatomyData';
import { 
  Bone as BoneIcon, 
  ChevronRight, 
  Sparkles, 
  Stethoscope, 
  Info, 
  Layers, 
  Activity, 
  Maximize2 
} from 'lucide-react';

interface BoneExplorerProps {
  onSelectMuscle?: (muscleName: string) => void;
}

export const BoneExplorer: React.FC<BoneExplorerProps> = ({ onSelectMuscle }) => {
  const [selectedBoneId, setSelectedBoneId] = useState<'clavicle' | 'scapula' | 'humerus'>('scapula');
  const [selectedPartId, setSelectedPartId] = useState<string>('scap-acromion');

  const currentBone = BONES_DATA.find((b) => b.id === selectedBoneId) || BONES_DATA[1];
  const currentPart = currentBone.parts.find((p) => p.id === selectedPartId) || currentBone.parts[0];

  const handleSelectBone = (boneId: 'clavicle' | 'scapula' | 'humerus') => {
    setSelectedBoneId(boneId);
    const newBone = BONES_DATA.find((b) => b.id === boneId);
    if (newBone && newBone.parts.length > 0) {
      setSelectedPartId(newBone.parts[0].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Intro Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-1.5">
              <BoneIcon className="w-3.5 h-3.5" />
              <span>Osteología del Complejo Articular del Hombro</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Explorador Óseo Interactivo
            </h2>
            <p className="text-sm text-slate-600 mt-0.5 max-w-3xl">
              Selecciona uno de los tres componentes óseos de la cintura escapular para inspeccionar sus accidentes anatómicos, carillas articulares, inserciones tendinosas y relevancia clínico-quirúrgica.
            </p>
          </div>

          {/* Bone selector pills */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80">
            {BONES_DATA.map((bone) => {
              const isSelected = selectedBoneId === bone.id;
              return (
                <button
                  key={bone.id}
                  id={`btn-bone-${bone.id}`}
                  onClick={() => handleSelectBone(bone.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-sky-500'}`} />
                  {bone.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Schematic / Hotspot Map & Part Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Anatomic Vector Visualization Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Esquema Morfológico: {currentBone.name}
                </h3>
              </div>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Haz clic en los puntos anatómicos
              </span>
            </div>

            {/* SVG Anatomic Graphic with Interactive Hotspots */}
            <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-slate-50 to-sky-50/40 rounded-xl border border-slate-200/90 flex items-center justify-center overflow-hidden select-none">
              {/* Background Medical Grid lines */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(#0284c7 0.75px, transparent 0.75px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Render Bone Schematic SVG */}
              {selectedBoneId === 'scapula' && (
                <svg viewBox="0 0 500 350" className="w-full h-full max-h-68 p-4">
                  <defs>
                    <linearGradient id="scapulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.15" />
                    </filter>
                  </defs>

                  {/* Escápula body: Triangular spine, acromion, coracoid, glenoid */}
                  {/* Scapular Body Base Triangle */}
                  <path
                    d="M 180 100 Q 300 70 410 75 Q 360 210 270 310 Q 210 230 180 170 Z"
                    fill="url(#scapulaGrad)"
                    stroke="#475569"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* Spine of scapula */}
                  <path
                    d="M 400 90 Q 300 120 190 125 L 140 95 Q 120 85 100 100 L 95 110"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Acromion Process */}
                  <path
                    d="M 100 100 Q 80 85 95 65 Q 130 55 155 75 L 145 95 Z"
                    fill="#cbd5e1"
                    stroke="#334155"
                    strokeWidth="3.5"
                  />
                  {/* Coracoid Process */}
                  <path
                    d="M 195 105 C 195 80 180 60 165 65 C 150 70 160 90 170 105 Z"
                    fill="#cbd5e1"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Glenoid Cavity */}
                  <ellipse
                    cx="155"
                    cy="145"
                    rx="18"
                    ry="28"
                    transform="rotate(-15 155 145)"
                    fill="#bae6fd"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  {/* Supraspinous fossa outline subtle */}
                  <path
                    d="M 220 95 Q 310 80 380 80"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    fill="none"
                  />
                  {/* Infraspinous fossa outline subtle */}
                  <path
                    d="M 220 145 Q 300 190 320 230"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    fill="none"
                  />
                </svg>
              )}

              {selectedBoneId === 'clavicle' && (
                <svg viewBox="0 0 500 300" className="w-full h-full max-h-68 p-4">
                  <defs>
                    <linearGradient id="clavicleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="40%" stopColor="#e2e8f0" />
                      <stop offset="70%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>
                  {/* Clavicle classic S-shape body */}
                  <path
                    d="M 90 140 C 130 110 210 95 280 130 C 350 165 410 160 440 140 C 430 170 380 180 300 155 C 220 130 140 145 90 175 Z"
                    fill="url(#clavicleGrad)"
                    stroke="#334155"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* Sternal end bulbous */}
                  <ellipse cx="430" cy="150" rx="20" ry="24" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
                  {/* Acromial flattened end */}
                  <path d="M 90 138 C 75 145 75 165 92 174 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" />
                  {/* Conoid tubercle bump */}
                  <circle cx="165" cy="152" r="6" fill="#0284c7" />
                </svg>
              )}

              {selectedBoneId === 'humerus' && (
                <svg viewBox="0 0 500 350" className="w-full h-full max-h-68 p-4">
                  <defs>
                    <linearGradient id="humerusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="35%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>
                  {/* Humerus Proximal Epiphysis and Diaphysis */}
                  {/* Head of humerus (hemisphere) */}
                  <path
                    d="M 235 70 C 300 70 330 115 310 160 C 290 180 250 175 235 150 Z"
                    fill="#bae6fd"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  {/* Greater Tubercle (Troquíter) */}
                  <path
                    d="M 175 110 C 170 85 200 80 230 85 L 235 150 L 195 160 Z"
                    fill="#cbd5e1"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Lesser Tubercle (Troquín) */}
                  <ellipse cx="232" cy="130" rx="14" ry="18" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
                  {/* Intertubercular groove line */}
                  <path d="M 210 115 L 212 175" stroke="#475569" strokeWidth="3" strokeDasharray="3 2" />
                  {/* Shaft (Diáfisis) with deltoid tuberosity */}
                  <path
                    d="M 195 160 C 185 200 175 240 180 280 C 182 300 240 300 240 280 C 242 230 255 190 255 165 Z"
                    fill="url(#humerusGrad)"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Deltoid tuberosity ridge */}
                  <path d="M 178 245 L 188 260 L 180 270" stroke="#0284c7" strokeWidth="3" fill="none" />
                </svg>
              )}

              {/* Hotspot buttons anchored by percentage */}
              {currentBone.parts.map((part) => {
                if (!part.hotspot) return null;
                const isSelected = selectedPartId === part.id;
                return (
                  <button
                    key={part.id}
                    id={`hotspot-${part.id}`}
                    onClick={() => setSelectedPartId(part.id)}
                    style={{
                      left: `${part.hotspot.x}%`,
                      top: `${part.hotspot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute group z-10 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      isSelected ? 'scale-125' : 'hover:scale-115'
                    }`}
                    title={part.name}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 shadow-md transition-colors ${
                        isSelected
                          ? 'bg-sky-600 border-white text-white ring-4 ring-sky-300/60'
                          : 'bg-white border-sky-600 text-sky-700 hover:bg-sky-50'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </span>

                    {/* Tooltip on hover */}
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-20">
                      {part.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Note on Selected Part */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Punto activo: <strong className="text-slate-800">{currentPart.name}</strong></span>
              </span>
              <span>{currentBone.parts.length} puntos anatómicos identificados</span>
            </div>
          </div>

          {/* List of Anatomical Features requested */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Lista de Partes Fisonómicas Clave ({currentBone.parts.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentBone.parts.map((part) => {
                const isSelected = selectedPartId === part.id;
                return (
                  <button
                    key={part.id}
                    id={`part-item-${part.id}`}
                    onClick={() => setSelectedPartId(part.id)}
                    className={`flex items-start text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50/80 border-sky-300 text-sky-950 shadow-xs ring-1 ring-sky-300'
                        : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/70 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mr-2.5 text-xs font-bold transition-colors ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {part.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {part.name}
                      </div>
                      {part.latinName && (
                        <div className="text-[11px] text-slate-500 italic truncate">
                          {part.latinName}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-sky-600 translate-x-0.5' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Anatomical & Clinical Dossier */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Part Detail Card */}
          <div className="bg-white rounded-2xl p-5 border border-sky-200 shadow-xs ring-1 ring-sky-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                Ficha Anatómica Seleccionada
              </span>
              <span className="text-xs font-mono text-slate-500">
                Ref: {currentPart.id}
              </span>
            </div>

            <div className="mt-3">
              <h4 className="text-lg font-bold text-slate-900">
                {currentPart.name}
              </h4>
              {currentPart.latinName && (
                <p className="text-xs text-sky-700 font-medium italic mt-0.5">
                  Nomina Anatomica: {currentPart.latinName}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-4">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Descripción Morfológica
              </h5>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                {currentPart.description}
              </p>
            </div>

            {/* Associated Muscles & Tendons */}
            {currentPart.associatedMuscles && currentPart.associatedMuscles.length > 0 && (
              <div className="mt-4">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-sky-600" />
                  <span>Inserciones Musculares y Ligamentosas</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentPart.associatedMuscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      onClick={() => onSelectMuscle && onSelectMuscle(muscle)}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium bg-sky-50 text-sky-800 border border-sky-200/70 hover:bg-sky-100 cursor-pointer transition-colors"
                      title="Explorar en tabla muscular"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Correlation */}
            {currentPart.clinicalNote && (
              <div className="mt-4 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                  <Stethoscope className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Importancia Clínica y Quirúrgica</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {currentPart.clinicalNote}
                </p>
              </div>
            )}
          </div>

          {/* Bone Overview Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-600" />
              <span>Generalidades de: {currentBone.name}</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Tipo Óseo</div>
                <div className="text-slate-800 font-medium mt-0.5">{currentBone.type}</div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">Articulaciones que Forma</div>
                <ul className="space-y-1">
                  {currentBone.articulations.map((art, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                      <span>{art}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">Relevancia Patológica Principal</div>
                <p className="text-slate-700 leading-relaxed text-[11px] bg-sky-50/50 p-2.5 rounded-lg border border-sky-100">
                  {currentBone.clinicalSignificance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
