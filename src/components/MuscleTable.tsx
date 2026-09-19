import React, { useState, useMemo } from 'react';
import { Muscle } from '../types';
import { MUSCLES_DATA } from '../data/anatomyData';
import { 
  Search, 
  Filter, 
  Activity, 
  Stethoscope, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Check, 
  Copy,
  Info
} from 'lucide-react';

interface MuscleTableProps {
  initialFilter?: string;
}

export const MuscleTable: React.FC<MuscleTableProps> = ({ initialFilter = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilter);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'rotator-cuff' | 'superficial' | 'external-rotators' | 'abductors'>('all');
  const [expandedMuscleId, setExpandedMuscleId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMuscles = useMemo(() => {
    return MUSCLES_DATA.filter((m) => {
      // Category filter
      if (categoryFilter === 'rotator-cuff' && m.category !== 'rotator-cuff') return false;
      if (categoryFilter === 'superficial' && m.category !== 'superficial') return false;
      if (categoryFilter === 'external-rotators' && !['infraspinatus', 'teres-minor'].includes(m.id)) return false;
      if (categoryFilter === 'abductors' && !['supraspinatus', 'deltoid'].includes(m.id)) return false;

      // Text search
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(term) ||
        m.latinName.toLowerCase().includes(term) ||
        m.origin.toLowerCase().includes(term) ||
        m.insertion.toLowerCase().includes(term) ||
        m.innervation.nerve.toLowerCase().includes(term) ||
        m.innervation.roots.toLowerCase().includes(term) ||
        m.action.toLowerCase().includes(term) ||
        (m.keyMnemonic && m.keyMnemonic.toLowerCase().includes(term))
      );
    });
  }, [categoryFilter, searchTerm]);

  const toggleExpand = (id: string) => {
    setExpandedMuscleId(expandedMuscleId === id ? null : id);
  };

  const handleCopySummary = (muscle: Muscle) => {
    const text = `${muscle.name} (${muscle.latinName})
Origen: ${muscle.origin}
Inserción: ${muscle.insertion}
Inervación: ${muscle.innervation.nerve} (${muscle.innervation.roots})
Acción: ${muscle.action}
Test clínico: ${muscle.clinicalTest}`;
    navigator.clipboard.writeText(text);
    setCopiedId(muscle.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Miología Funcional del Hombro</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tabla Dinámica de Músculos
            </h2>
            <p className="text-sm text-slate-600 mt-0.5 max-w-3xl">
              Datos anatómicos completos de los 8 músculos cardinales: los 4 componentes del manguito de los rotadores y los 4 músculos superficiales/motores mayores.
            </p>
          </div>

          <div className="text-xs font-semibold text-sky-800 bg-sky-50/80 px-3.5 py-2 rounded-xl border border-sky-200/70 flex items-center gap-2 self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Mostrando {filteredMuscles.length} de {MUSCLES_DATA.length} músculos</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col lg:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-muscle-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por músculo, origen, inserción, inervación (ej. supraescapular, C5)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="filter-all"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({MUSCLES_DATA.length})
            </button>
            <button
              id="filter-rotator-cuff"
              onClick={() => setCategoryFilter('rotator-cuff')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                categoryFilter === 'rotator-cuff'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Manguito Rotador (4)</span>
            </button>
            <button
              id="filter-superficial"
              onClick={() => setCategoryFilter('superficial')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'superficial'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Superficiales (4)
            </button>
            <button
              id="filter-rotators"
              onClick={() => setCategoryFilter('external-rotators')}
              className={`hidden sm:inline-flex px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'external-rotators'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Rotadores Externos
            </button>
            <button
              id="filter-abductors"
              onClick={() => setCategoryFilter('abductors')}
              className={`hidden sm:inline-flex px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'abductors'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Abductores
            </button>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Músculo</th>
                <th className="py-3.5 px-4 min-w-[190px]">Origen</th>
                <th className="py-3.5 px-4 min-w-[190px]">Inserción</th>
                <th className="py-3.5 px-4 min-w-[170px]">Inervación</th>
                <th className="py-3.5 px-4 min-w-[210px]">Acción Principal</th>
                <th className="py-3.5 px-4 text-center w-24">Clínica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
              {filteredMuscles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No se encontraron músculos con el criterio de búsqueda "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredMuscles.map((muscle) => {
                  const isExpanded = expandedMuscleId === muscle.id;
                  const isRotatorCuff = muscle.category === 'rotator-cuff';
                  return (
                    <React.Fragment key={muscle.id}>
                      <tr 
                        className={`transition-colors hover:bg-sky-50/40 ${
                          isExpanded ? 'bg-sky-50/30' : ''
                        }`}
                      >
                        {/* Muscle Name & Category */}
                        <td className="py-4 px-4 sm:px-6 align-top">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{muscle.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 italic font-mono mt-0.5">
                            {muscle.latinName}
                          </div>
                          <span
                            className={`inline-block mt-2 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                              isRotatorCuff
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {muscle.categoryLabel}
                          </span>
                        </td>

                        {/* Origin */}
                        <td className="py-4 px-4 align-top text-xs leading-relaxed text-slate-600">
                          {muscle.origin}
                        </td>

                        {/* Insertion */}
                        <td className="py-4 px-4 align-top text-xs leading-relaxed font-medium text-slate-800">
                          {muscle.insertion}
                        </td>

                        {/* Innervation */}
                        <td className="py-4 px-4 align-top text-xs leading-relaxed">
                          <div className="font-semibold text-sky-900 bg-sky-50/70 p-1.5 rounded border border-sky-200/60 inline-block">
                            {muscle.innervation.nerve}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 font-mono">
                            Raíces: {muscle.innervation.roots}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 align-top text-xs leading-relaxed text-slate-700">
                          {muscle.action}
                        </td>

                        {/* Clinical / Expand Actions */}
                        <td className="py-4 px-4 align-top text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              id={`btn-expand-${muscle.id}`}
                              onClick={() => toggleExpand(muscle.id)}
                              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                                isExpanded
                                  ? 'bg-sky-600 text-white border-sky-600'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                              title={isExpanded ? 'Ocultar test clínico' : 'Ver test clínico y perla mnemotécnica'}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <button
                              id={`btn-copy-${muscle.id}`}
                              onClick={() => handleCopySummary(muscle)}
                              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                              title="Copiar resumen del músculo"
                            >
                              {copiedId === muscle.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Clinical Dossier Row */}
                      {isExpanded && (
                        <tr className="bg-sky-50/30 border-b border-sky-100">
                          <td colSpan={6} className="p-4 sm:px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-sky-200 shadow-xs">
                              {/* Clinical Test */}
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                                  <Stethoscope className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                    Prueba Clínica de Exploración
                                  </h5>
                                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                    {muscle.clinicalTest}
                                  </p>
                                </div>
                              </div>

                              {/* Mnemonic / High-Yield Presentation Tip */}
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                                  <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                                    Perla de Exposición / Mnemotecnia
                                  </h5>
                                  <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                                    {muscle.keyMnemonic || muscle.functionalRole}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* High-Yield Rotator Cuff Quick Summary Note */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50/50 rounded-2xl p-5 border border-sky-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-sky-950">
              Mnemotecnia Clásica del Manguito Rotador: S.I.T.S.
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              <strong>S</strong>upraespinoso (inicia abducción) • <strong>I</strong>nfraespinoso (rotación externa) • <strong>T</strong>eres minor / Redondo menor (rotación externa) • <strong>S</strong>ubescapular (rotación interna). Recuerda: ¡los tres primeros van al troquíter y solo el subescapular va al troquín!
            </p>
          </div>
        </div>
        <button
          onClick={() => setCategoryFilter('rotator-cuff')}
          className="shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold text-sky-700 bg-white border border-sky-300 hover:bg-sky-50 transition-colors cursor-pointer"
        >
          Ver sólo Manguito
        </button>
      </div>
    </div>
  );
};
