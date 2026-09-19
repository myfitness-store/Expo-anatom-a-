import React from 'react';
import { Activity, Bone, BookOpen, Brain, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  activeTab: 'bones' | 'muscles' | 'flashcards' | 'quiz';
  setActiveTab: (tab: 'bones' | 'muscles' | 'flashcards' | 'quiz') => void;
  onOpenQuickGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenQuickGuide }) => {
  const tabs = [
    {
      id: 'bones' as const,
      name: '1. Explorador Óseo',
      shortName: 'Huesos',
      icon: Bone,
      badge: '3 Huesos'
    },
    {
      id: 'muscles' as const,
      name: '2. Tabla de Músculos',
      shortName: 'Músculos',
      icon: Activity,
      badge: '8 Clave'
    },
    {
      id: 'flashcards' as const,
      name: '3. Tarjetas de Estudio',
      shortName: 'Flashcards',
      icon: BookOpen,
      badge: 'Modo Repaso'
    },
    {
      id: 'quiz' as const,
      name: '4. Cuestionario Exprés',
      shortName: 'Quiz',
      icon: Brain,
      badge: '5 Preguntas'
    }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/80">
                  Morfología & Biomecánica
                </span>
                <span className="hidden sm:inline-flex text-xs font-medium text-slate-500">
                  Cintura Escapular
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Anatomía del Hombro
              </h1>
            </div>
          </div>

          {/* Quick clinical summary action */}
          <div className="flex items-center gap-2">
            {onOpenQuickGuide && (
              <button
                id="btn-quick-guide"
                onClick={onOpenQuickGuide}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
                title="Ver resumen nemotécnico de alta utilidad para presentación"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Perlas de Exposición</span>
              </button>
            )}
            <div className="hidden lg:flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Modo Presentación Listo
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-sky-700/80 text-sky-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
