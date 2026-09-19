import React from 'react';
import { X, CheckCircle, Stethoscope, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

interface PresentationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationGuideModal: React.FC<PresentationGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Guía Rápida para la Exposición
              </h3>
              <p className="text-xs text-slate-500">
                Puntos de alto rendimiento que no deben faltar en tu presentación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Card 1: SITS mnemonic */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
            <h4 className="font-bold text-sky-950 flex items-center gap-1.5 text-sm mb-1.5">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>1. Manguito Rotador: Regla de los Tubérculos</span>
            </h4>
            <p className="text-xs text-slate-700">
              • <strong>Troquíter (Tubérculo mayor):</strong> Recibe de superior a inferior a <em>Supraespinoso</em> (carilla superior), <em>Infraespinoso</em> (carilla media) y <em>Redondo menor</em> (carilla inferior).
              <br />
              • <strong>Troquín (Tubérculo menor):</strong> Recibe ÚNICAMENTE al <em>Subescapular</em>.
            </p>
          </div>

          {/* Card 2: Bicipital groove sandwich */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm mb-1.5">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>2. Corredera Bicipital: "Un dorsal entre dos mayores"</span>
            </h4>
            <p className="text-xs text-slate-700">
              En el surco intertubercular se disponen:
              <br />• <strong>Labio lateral:</strong> Pectoral mayor.
              <br />• <strong>Fondo del surco:</strong> Dorsal ancho (Latissimus dorsi).
              <br />• <strong>Labio medial:</strong> Redondo mayor (Teres major).
              <br />• <strong>Contenido:</strong> Tendón de la cabeza larga del bíceps braquial.
            </p>
          </div>

          {/* Card 3: Key innervations to remember */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm mb-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3. Inervaciones que siempre preguntan</span>
            </h4>
            <ul className="text-xs space-y-1 text-slate-700">
              <li>• <strong>Supraespinoso e Infraespinoso:</strong> Nervio supraescapular (C5-C6).</li>
              <li>• <strong>Redondo menor y Deltoides:</strong> Nervio axilar / circunflejo (C5-C6).</li>
              <li>• <strong>Subescapular:</strong> Nervios subescapulares superior e inferior (C5-C6).</li>
              <li>• <strong>Trapecio:</strong> Nervio accesorio (XI par craneal motor).</li>
            </ul>
          </div>

          {/* Card 4: Clinical correlations */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>4. Correlaciones Clínicas Frecuentes</span>
            </h4>
            <p className="text-xs text-amber-950">
              • <strong>Fractura de cuello quirúrgico de húmero:</strong> Daño potencial al nervio axilar y arteria circunfleja posterior.
              <br />• <strong>Test de Jobe (Empty can):</strong> Prueba estándar de oro para el supraespinoso.
              <br />• <strong>Luxación glenohumeral:</strong> En el 95% de los casos es anterior (lesión de Bankart y Hill-Sachs).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
