import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/anatomyData';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Award, 
  AlertCircle,
  HelpCircle,
  Stethoscope
} from 'lucide-react';

export const Quiz: React.FC = () => {
  // Select 5 random questions or first 5 from bank
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const userSelected = selectedAnswers[currentIndex];
  const isCurrentAnswered = userSelected !== null;

  const handleSelectOption = (optionIndex: number) => {
    if (isCurrentAnswered) return; // Prevent changing after immediate feedback

    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    // Pick 5 new questions
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswers([null, null, null, null, null]);
    setQuizFinished(false);
  };

  // Score calculation
  const score = selectedAnswers.reduce<number>((acc, ans, idx) => {
    if (ans !== null && questions[idx] && ans === questions[idx].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Quiz Intro Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span>Evaluación Rápida de Competencias</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Cuestionario Exprés: 5 Preguntas
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Pon a prueba tus conocimientos sobre inervaciones periféricas, acciones musculares e inserciones óseas con retroalimentación inmediata.
            </p>
          </div>

          {!quizFinished && (
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <span>Pregunta {currentIndex + 1} de {questions.length}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!quizFinished && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-sky-600 transition-all duration-300"
                style={{ width: `${((currentIndex + (isCurrentAnswered ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Quiz View: Active Question OR Results Screen */}
      {!quizFinished ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Question Text */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
              <span>Pregunta #{currentIndex + 1}</span>
              {currentQ.relatedMuscleOrBone && (
                <span className="text-slate-500 font-medium normal-case">
                  Tema: {currentQ.relatedMuscleOrBone}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = userSelected === idx;
              const isCorrect = idx === currentQ.correctAnswer;
              
              let btnStyle = 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-800';
              let iconNode = (
                <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
              );

              if (isCurrentAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-300';
                  iconNode = <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />;
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-1 ring-rose-300';
                  iconNode = <XCircle className="w-6 h-6 text-rose-600 shrink-0" />;
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200/70 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isCurrentAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm flex items-start gap-3 transition-all cursor-pointer ${btnStyle}`}
                >
                  {iconNode}
                  <span className="leading-snug pt-0.5">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Box (appears right after answering) */}
          {isCurrentAnswered && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all animate-fadeIn ${
                userSelected === currentQ.correctAnswer
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    userSelected === currentQ.correctAnswer
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {userSelected === currentQ.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold">
                    {userSelected === currentQ.correctAnswer
                      ? '¡Respuesta Correcta!'
                      : 'Respuesta Incorrecta'}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Action to proceed */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-400">
              {isCurrentAnswered
                ? 'Retroalimentación registrada'
                : 'Selecciona una opción para ver la respuesta'}
            </div>

            <button
              id="btn-quiz-next"
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isCurrentAnswered
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center border-2 border-sky-100 shadow-xs">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Resultado de la Evaluación
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Obtuviste {score} de {questions.length} correctas ({percentage}%)
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              {percentage === 100
                ? '¡Excelente dominio anatómico! Estás completamente preparado para tu exposición clínica del hombro.'
                : percentage >= 80
                ? '¡Muy buen trabajo! Tienes claros los conceptos medulares de inervación y biomecánica.'
                : percentage >= 60
                ? 'Buen intento. Te recomendamos repasar las inserciones del manguito rotador y las raíces de los nervios axilar y supraescapular.'
                : 'Es aconsejable repasar la tabla de músculos y las tarjetas de estudio antes de la presentación.'}
            </p>
          </div>

          {/* Detailed Question Review List */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Revisión de Preguntas
            </h4>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const wasCorrect = userAns === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    wasCorrect
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {wasCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold">P{idx + 1}: {q.question}</span>
                      <div className="mt-1 text-slate-600">
                        Tu respuesta: <strong className={wasCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                          {userAns !== null ? q.options[userAns] : 'No respondida'}
                        </strong>
                        {!wasCorrect && (
                          <span className="block text-emerald-800 mt-0.5 font-medium">
                            Respuesta correcta: {q.options[q.correctAnswer]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-quiz-retry"
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tomar Otro Test (5 Nuevas Preguntas)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
