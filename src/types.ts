export interface BonePart {
  id: string;
  name: string;
  latinName?: string;
  description: string;
  clinicalNote?: string;
  associatedMuscles?: string[];
  hotspot?: { x: number; y: number }; // percentage coordinates on SVG
}

export interface Bone {
  id: 'clavicle' | 'scapula' | 'humerus';
  name: string;
  subtitle: string;
  type: string;
  description: string;
  articulations: string[];
  clinicalSignificance: string;
  parts: BonePart[];
}

export interface Muscle {
  id: string;
  name: string;
  latinName: string;
  category: 'rotator-cuff' | 'superficial';
  categoryLabel: string;
  origin: string;
  insertion: string;
  innervation: {
    nerve: string;
    roots: string;
  };
  action: string;
  clinicalTest: string;
  functionalRole: string;
  keyMnemonic?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedMuscleOrBone?: string;
}
