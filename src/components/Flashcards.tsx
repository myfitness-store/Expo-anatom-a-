import React, { useState, useEffect } from 'react';
import { Muscle } from '../types';
import { MUSCLES_DATA } from '../data/anatomyData';
import { 
  RotateCw, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';

export const Flashcards: React.FC = () => {
  const [deck, setDeck] = useState<Muscle[]>(() => [...MUSCLES_DATA]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<'standard' | 'reverse'>('standard'); // standard: name->details, reverse: action/origin->guess name
  const [category, setCategory] = useState<'all' | 'rotator-cuff' | 'superficial'>('all');

  // Filter deck by category
  useEffect(() => {
    let list = [...MUSCLES_DATA];
    if (category === 'rotator-cuff') {
      list = list.filter((m) => m.category === 'rotator-cuff');
    } else if (category === 'superficial') {
      list = list.filter((m) => m.category === 'superficial');
    }
    setDeck(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [category]);

  const currentCard = deck[currentIndex] || deck[0];
  const isMastered = masteredIds.has(currentCard.id);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    setMasteredIds(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const masteredCount = deck.filter((m) => masteredIds.has(m.id)).length;
  const progressPercent = Math.round((masteredCount / deck.length) * 100) || 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Entrenamiento de Memoria Rápida</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tarjetas de Estudio Interactivas (Flashcards)
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Haz clic sobre la tarjeta o en "Girar Tarjeta" para repasar el origen, inserción, inervación y acción. Ideal para afianzar conceptos antes de tu exposición.
            </p>
          </div>

          {/* Quick Category Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                category === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({MUSCLES_DATA.length})
            </button>
            <button
              onClick={() => setCategory('rotator-cuff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                category === 'rotator-cuff'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Manguito Rotador (4)
            </button>
            <button
              onClick={() => setCategory('superficial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                category === 'superficial'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Superficiales (4)
            </button>
          </div>
        </div>

        {/* Progress Bar & Mode Selector */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">
              Dominio: {masteredCount} de {deck.length} ({progressPercent}%)
            </span>
            <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-mode-toggle"
              onClick={() => {
                setMode(mode === 'standard' ? 'reverse' : 'standard');
                setIsFlipped(false);
              }}
              className="text-slate-600 hover:text-sky-700 font-medium flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Modo: {mode === 'standard' ? 'Músculo → Detalles' : 'Acción → Adivinar Músculo'}</span>
            </button>
            {masteredCount > 0 && (
              <button
                onClick={handleResetProgress}
                className="text-slate-400 hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
                title="Reiniciar tarjetas marcadas"
              >
                Reiniciar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="relative perspective-1000 min-h-[380px] sm:min-h-[420px]">
        <div
          id="flashcard-interactive"
          onClick={handleFlip}
          className={`w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl cursor-pointer transition-all duration-500 transform-style-3d select-none relative shadow-md hover:shadow-lg ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* FRONT OF THE CARD */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 flex flex-col justify-between backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  currentCard.category === 'rotator-cuff'
                    ? 'bg-sky-100 text-sky-800 border border-sky-200'
                    : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                }`}
              >
                {currentCard.categoryLabel}
              </span>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="font-mono">
                  {currentIndex + 1} / {deck.length}
                </span>
                {isMastered && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Dominado
                  </span>
                )}
              </div>
            </div>

            {/* Front Content (based on mode) */}
            {mode === 'standard' ? (
              <div className="text-center my-auto py-6">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center mb-4 border border-sky-100 shadow-xs">
                  <Activity className="w-8 h-8 stroke-[2]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {currentCard.name}
                </h3>
                <p className="text-sm text-slate-500 font-mono italic mt-1">
                  {currentCard.latinName}
                </p>
                <p className="text-xs text-sky-800 font-medium bg-sky-50/70 py-1 px-3 rounded-full inline-block mt-3 border border-sky-100">
                  {currentCard.functionalRole}
                </p>
              </div>
            ) : (
              <div className="text-center my-auto py-6 max-w-xl mx-auto">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 mb-3 inline-block">
                  ¿A qué músculo corresponde?
                </span>
                <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mt-2">
                  "{currentCard.action}"
                </p>
                <div className="mt-4 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 inline-block">
                  Inervación: <span className="font-semibold text-slate-800">{currentCard.innervation.nerve}</span> ({currentCard.innervation.roots})
                </div>
              </div>
            )}

            {/* Front Footer / Hint to flip */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-600 font-semibold">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                Haz clic en cualquier lugar para girar
              </span>
              <span className="hidden sm:inline text-slate-400">
                O presiona el botón inferior "Girar Tarjeta"
              </span>
            </div>
          </div>

          {/* BACK OF THE CARD */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-sky-50/30 rounded-3xl p-6 sm:p-8 border-2 border-sky-200 flex flex-col justify-between backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Back Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                  {currentCard.name}
                </h4>
                <p className="text-xs text-sky-700 italic font-mono">
                  {currentCard.latinName}
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-slate-500">
                {currentIndex + 1} / {deck.length}
              </span>
            </div>

            {/* Back Grid of Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto py-2 text-xs">
              {/* Origin */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-0.5">
                  1. Origen
                </span>
                <p className="text-slate-800 leading-snug font-medium">
                  {currentCard.origin}
                </p>
              </div>

              {/* Insertion */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-0.5">
                  2. Inserción
                </span>
                <p className="text-sky-950 leading-snug font-semibold">
                  {currentCard.insertion}
                </p>
              </div>

              {/* Innervation */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-0.5">
                  3. Inervación
                </span>
                <p className="text-slate-800 font-semibold">
                  {currentCard.innervation.nerve}
                </p>
                <span className="text-[11px] text-slate-500 font-mono">
                  Raíces: {currentCard.innervation.roots}
                </span>
              </div>

              {/* Action */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-0.5">
                  4. Acción Biomecánica
                </span>
                <p className="text-slate-800 leading-snug">
                  {currentCard.action}
                </p>
              </div>
            </div>

            {/* Back Clinical Mnemonic / Footer */}
            <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
              <div className="text-[11px] text-sky-900 truncate max-w-sm sm:max-w-md">
                <strong>Clave:</strong> {currentCard.keyMnemonic || currentCard.clinicalTest}
              </div>
              <span className="text-sky-600 font-semibold shrink-0">
                Girar de vuelta ↻
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Navigation & Study Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Previous / Next */}
        <div className="flex items-center gap-2">
          <button
            id="btn-flashcard-prev"
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Tarjeta anterior"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            id="btn-flashcard-shuffle"
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Mezclar tarjetas en orden aleatorio"
          >
            <Shuffle className="w-3.5 h-3.5 text-sky-600" />
            <span>Aleatorio</span>
          </button>
        </div>

        {/* Center Primary Action: Flip Card */}
        <button
          id="btn-flashcard-flip"
          onClick={handleFlip}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'Ver Anverso' : 'Girar Tarjeta'}</span>
        </button>

        {/* Mastery Toggle & Next */}
        <div className="flex items-center gap-2">
          <button
            id="btn-flashcard-mastery"
            onClick={() => toggleMastered(currentCard.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMastered ? '¡Dominada!' : 'Marcar Dominada'}</span>
          </button>

          <button
            id="btn-flashcard-next"
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Siguiente tarjeta"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
