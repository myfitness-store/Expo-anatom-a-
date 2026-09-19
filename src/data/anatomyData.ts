import { Bone, Muscle, QuizQuestion } from '../types';

export const BONES_DATA: Bone[] = [
  {
    id: 'clavicle',
    name: 'Clavícula',
    subtitle: 'Puntal óseo móvil de la cintura escapular',
    type: 'Hueso largo con forma de "S" itálica horizontal',
    description:
      'Hueso subcutáneo situado transversalmente entre el manubrio del esternón y el acromion de la escápula. Actúa como un puntal mecánico que mantiene la extremidad superior alejada del tronco, permitiendo la máxima amplitud de movimiento.',
    articulations: [
      'Articulación Esternoclavicular (medial, de tipo encaje recíproco o silla de montar con disco articular)',
      'Articulación Acromioclavicular (lateral, de tipo plana/artrodia)'
    ],
    clinicalSignificance:
      'Es uno de los huesos más comúnmente fracturados en el cuerpo humano (80% en el tercio medio) por caída directa sobre el hombro o el brazo en extensión. El fragmento medial suele elevarse por tracción del músculo esternocleidomastoideo.',
    parts: [
      {
        id: 'clav-sternal',
        name: 'Extremidad esternal (medial)',
        latinName: 'Extremitas sternalis',
        description:
          'Extremo medial cuadrangular, voluminoso y convexo verticalmente. Se articula con la escotadura clavicular del manubrio esternal y con el primer cartílago costal.',
        associatedMuscles: ['Pectoral mayor', 'Esternocleidomastoideo', 'Esternohioideo'],
        clinicalNote: 'La luxación esternoclavicular posterior es una urgencia médica por riesgo de compresión de grandes vasos mediastínicos y tráquea.',
        hotspot: { x: 78, y: 46 }
      },
      {
        id: 'clav-shaft',
        name: 'Diáfisis o cuerpo clavicular',
        latinName: 'Corpus claviculae',
        description:
          'Porción intermedia con doble curvatura: dos tercios mediales convexos hacia adelante y un tercio lateral cóncavo hacia adelante. Su cara inferior aloja el surco para el músculo subclavio.',
        associatedMuscles: ['Pectoral mayor (anterior)', 'Deltoides (borde anterior)', 'Trapecio (borde posterior)', 'Subclavio (cara inferior)'],
        clinicalNote: 'La transición entre las dos curvaturas en el tercio medio representa el punto biomecánico de mayor debilidad estructural ante impactos.',
        hotspot: { x: 50, y: 38 }
      },
      {
        id: 'clav-acromial',
        name: 'Extremidad acromial (lateral)',
        latinName: 'Extremitas acromialis',
        description:
          'Extremo lateral aplanado en sentido craneocaudal con una carilla articular ovalada que se orienta hacia afuera y abajo para articular con el borde medial del acromion.',
        associatedMuscles: ['Deltoides', 'Trapecio'],
        clinicalNote: 'Sede frecuente de esguinces y luxaciones acromioclaviculares ("signo de la tecla de piano").',
        hotspot: { x: 22, y: 40 }
      },
      {
        id: 'clav-conoid',
        name: 'Tubérculo conoideo',
        latinName: 'Tuberculum conoideum',
        description:
          'Prominencia ósea rugosa en la cara inferior cerca del borde posterior del extremo acromial. Sirve de anclaje para el ligamento conoideo (fascículo medial del ligamento coracoclavicular).',
        associatedMuscles: ['Ligamento conoideo coracoclavicular'],
        clinicalNote: 'Punto de fijación clave para la estabilidad suspensoria vertical de la clavícula sobre la escápula.',
        hotspot: { x: 32, y: 48 }
      },
      {
        id: 'clav-trapezoid',
        name: 'Línea trapezoidea',
        latinName: 'Linea trapezoidea',
        description:
          'Cresta rugosa oblicua que se proyecta anterolateralmente desde el tubérculo conoideo en la cara inferior. Brinda inserción al ligamento trapezoide (fascículo lateral del ligamento coracoclavicular).',
        associatedMuscles: ['Ligamento trapezoideo coracoclavicular'],
        clinicalNote: 'La rotura combinada de los ligamentos conoideo y trapezoide genera luxación acromioclavicular grado III de Rockwood.',
        hotspot: { x: 27, y: 44 }
      }
    ]
  },
  {
    id: 'scapula',
    name: 'Escápula (Omóplato)',
    subtitle: 'Eje dinámico y plataforma de anclaje muscular del hombro',
    type: 'Hueso plano, triangular, ubicado en la cara posterolateral del tórax',
    description:
      'Se apoya sobre la pared torácica posterior entre las costillas 2ª y 7ª. No tiene fijación ósea directa con la caja torácica, sino una articulación fisiológica (sinsarcosis escapulotorácica) que permite movimientos de elevación, depresión, protracción, retracción y rotación en campana.',
    articulations: [
      'Articulación Glenohumeral (con la cabeza humeral)',
      'Articulación Acromioclavicular (con el extremo acromial de la clavícula)',
      'Sinsarcosis Escapulotorácica (articulación fisiológica por deslizamiento entre serrato anterior y subescapular)'
    ],
    clinicalSignificance:
      'La alteración de su movilidad (discinesia escapular) altera el ritmo escapulohumeral (relación normal 2:1) y predispone a pinzamiento subacromial y tendinopatías del manguito rotador.',
    parts: [
      {
        id: 'scap-acromion',
        name: 'Acromion',
        latinName: 'Acromion',
        description:
          'Gran apófisis ósea aplanada que continúa lateralmente la espina de la escápula. Forma la cumbre superior ósea del hombro y se articula por medial con la clavícula.',
        associatedMuscles: ['Deltoides (fascículo medio)', 'Trapecio (fibras medias)'],
        clinicalNote: 'La morfología acromial (clasificación de Bigliani: Tipo I plano, Tipo II curvo, Tipo III ganchoso) se correlaciona con la incidencia de roce y rotura del tendón supraespinoso.',
        hotspot: { x: 24, y: 22 }
      },
      {
        id: 'scap-coracoid',
        name: 'Apófisis coracoides',
        latinName: 'Processus coracoideus',
        description:
          'Proyección ósea anterior en forma de dedo flexionado o pico de cuervo, ubicada por encima del borde superior de la cavidad glenoidea. Es el punto de convergencia muscular y ligamentoso anterior.',
        associatedMuscles: ['Pectoral menor', 'Músculo coracobraquial', 'Cabeza corta del bíceps braquial'],
        clinicalNote: 'Palpable clínicamente en el fondo del surco deltopectoral. También fija los ligamentos coracoclaviculares, coracoacromial y coracohumeral.',
        hotspot: { x: 38, y: 28 }
      },
      {
        id: 'scap-glenoid',
        name: 'Cavidad glenoidea',
        latinName: 'Cavitas glenoidalis',
        description:
          'Fosa articular poco profunda y piriforme orientada lateral y ligeramente hacia anterior. Alberga sólo un tercio de la cabeza humeral; es ampliada periféricamente por el rodete o labrum glenoideo fibrocartilaginoso.',
        associatedMuscles: ['Rodete glenoideo (labrum)', 'Cápsula articular glenohumeral'],
        clinicalNote: 'La avulsión anteroinferior del labrum por luxación anterior se denomina lesión de Bankart; la desinserción superior con afectación del bíceps es la lesión de SLAP.',
        hotspot: { x: 32, y: 42 }
      },
      {
        id: 'scap-spine',
        name: 'Espina de la escápula',
        latinName: 'Spina scapulae',
        description:
          'Robusta cresta ósea triangular transversal que divide la cara posterior de la escápula en una fosa supraespinosa (menor) y una fosa infraespinosa (mayor). Termina lateralmente en el acromion.',
        associatedMuscles: ['Trapecio (labio superior)', 'Deltoides posterior (labio inferior)'],
        clinicalNote: 'Completamente subcutánea y palpable en toda su longitud anatómica dorsal.',
        hotspot: { x: 55, y: 32 }
      },
      {
        id: 'scap-supraspinous',
        name: 'Fosa supraespinosa',
        latinName: 'Fossa supraspinata',
        description:
          'Concavidad ósea lisa situada por encima de la espina escapular, más estrecha medialmente y más amplia hacia afuera.',
        associatedMuscles: ['Músculo supraespinoso'],
        clinicalNote: 'Por ella discurren los vasos y el nervio supraescapular antes de franquear la escotadura espinoglenoidea.',
        hotspot: { x: 52, y: 20 }
      },
      {
        id: 'scap-infraspinous',
        name: 'Fosa infraespinosa',
        latinName: 'Fossa infraspinata',
        description:
          'Gran área ósea cóncava inferior a la espina de la escápula que ocupa los tres cuartos de la cara dorsal.',
        associatedMuscles: ['Músculo infraespinoso'],
        clinicalNote: 'La atrofia visible de esta fosa es un signo diagnóstico de atrapamiento del nervio supraescapular o rotura crónica del tendón.',
        hotspot: { x: 55, y: 55 }
      },
      {
        id: 'scap-subscapular',
        name: 'Fosa subescapular',
        latinName: 'Fossa subscapularis',
        description:
          'Amplia superficie cóncava de la cara costal (anterior) de la escápula, surcada por crestas oblicuas para la inserción muscular.',
        associatedMuscles: ['Músculo subescapular', 'Serrato anterior (en el borde medial costal)'],
        clinicalNote: 'Se desliza sobre la pared torácica separada por el músculo subescapular, tejido conectivo laxo y serrato anterior.',
        hotspot: { x: 45, y: 65 }
      },
      {
        id: 'scap-tubercles',
        name: 'Tubérculos supra e infraglenoideos',
        latinName: 'Tuberculum supraglenoidale / infraglenoidale',
        description:
          'Pequeñas rugosidades óseas situadas inmediatamente craneal y caudal al margen articular de la fosa glenoidea.',
        associatedMuscles: [
          'Tubérculo supraglenoideo: Cabeza larga del bíceps braquial',
          'Tubérculo infraglenoideo: Cabeza larga del tríceps braquial'
        ],
        clinicalNote: 'El tendón de la cabeza larga del bíceps penetra la cavidad articular directamente desde el tubérculo supraglenoideo.',
        hotspot: { x: 28, y: 36 }
      }
    ]
  },
  {
    id: 'humerus',
    name: 'Húmero (Epífisis Proximal)',
    subtitle: 'Palanca motora braquial y hemisferio móvil de la articulación',
    type: 'Epífisis proximal del hueso largo del brazo',
    description:
      'Presenta una cabeza esferoide orientada hacia arriba, adentro y atrás que se articula con la cavidad glenoidea. Posee dos eminencias rugosas (tubérculos mayor y menor) que reciben los tendones terminales del manguito de los rotadores.',
    articulations: [
      'Articulación Glenohumeral (enartrosis o articulación esferoidea de 3 grados de libertad)'
    ],
    clinicalSignificance:
      'La desproporción de tamaño entre la voluminosa cabeza humeral y la pequeña fosa glenoidea confiere gran movilidad pero elevada vulnerabilidad a luxaciones (95% de dirección anteroinferior).',
    parts: [
      {
        id: 'hum-troquiter',
        name: 'Troquíter (Tubérculo mayor)',
        latinName: 'Tuberculum majus',
        description:
          'Prominencia ósea lateral y superior al cuello anatómico. Exhibe tres carillas o facetas lisas sucesivas orientadas de arriba hacia abajo.',
        associatedMuscles: [
          'Carilla superior: Músculo Supraespinoso',
          'Carilla media: Músculo Infraespinoso',
          'Carilla inferior: Músculo Redondo menor'
        ],
        clinicalNote: 'Punto anatómico crítico de inserción del manguito posterosuperior. Frecuente sede de arrancamientos óseos por tracción en traumatismos.',
        hotspot: { x: 28, y: 35 }
      },
      {
        id: 'hum-troquin',
        name: 'Troquín (Tubérculo menor)',
        latinName: 'Tuberculum minus',
        description:
          'Eminencia ósea anterior y más pequeña que el troquíter, separada de este por el surco intertubercular.',
        associatedMuscles: ['Músculo subescapular (en toda su superficie anterior)'],
        clinicalNote: 'Inserción del único músculo rotador interno del manguito. Palpable en la cara anterior del hombro durante la rotación pasiva.',
        hotspot: { x: 44, y: 40 }
      },
      {
        id: 'hum-head',
        name: 'Cabeza del húmero',
        latinName: 'Caput humeri',
        description:
          'Superficie articular lisa hemisférica recubierta por cartílago hialino (más grueso en el centro). Se orienta hacia medial, posterior (retroversión fisiológica de 20-30°) y craneal (ángulo cervicodiafisario de 130-140°).',
        associatedMuscles: ['Cartílago articular hialino', 'Rodeada por la membrana sinovial'],
        clinicalNote: 'En la luxación anterior repetida, el impacto contra el reborde glenoideo produce la fractura por compresión posterolateral conocida como defecto de Hill-Sachs.',
        hotspot: { x: 55, y: 26 }
      },
      {
        id: 'hum-anatomical-neck',
        name: 'Cuello anatómico',
        latinName: 'Collum anatomicum',
        description:
          'Surco circular estrecho que delimita el borde periférico del cartílago articular de la cabeza humeral, separándola de los tubérculos mayor y menor.',
        associatedMuscles: ['Cápsula fibrosa de la articulación glenohumeral'],
        clinicalNote: 'Marca la inserción de la membrana capsular articular glenohumeral.',
        hotspot: { x: 45, y: 28 }
      },
      {
        id: 'hum-surgical-neck',
        name: 'Cuello quirúrgico',
        latinName: 'Collum chirurgicum',
        description:
          'Zona de estrechamiento distal a los tubérculos mayor y menor, donde la epífisis proximal se continúa con la diáfisis cilíndrica del húmero.',
        associatedMuscles: ['En íntima relación posterior con el nervio axilar y la arteria circunfleja humeral posterior'],
        clinicalNote: 'Denominado "quirúrgico" por su altísima frecuencia de fracturas en ancianos con osteoporosis. Su compromiso puede lesionar el nervio axilar (parálisis del deltoides y anestesia del muñón).',
        hotspot: { x: 38, y: 55 }
      },
      {
        id: 'hum-bicipital-groove',
        name: 'Corredera bicipital (Surco intertubercular)',
        latinName: 'Sulcus intertubercularis',
        description:
          'Canal vertical entre el troquíter y el troquín que continúa hacia la diáfisis. Posee dos labios: lateral (cresta del tubérculo mayor) y medial (cresta del tubérculo menor).',
        associatedMuscles: [
          'Contenido: Tendón de la cabeza larga del bíceps con su vaina sinovial',
          'Labio lateral: Pectoral mayor',
          'Fondo del surco: Dorsal ancho ("un sándwich: el dorsal entre dos mayores")',
          'Labio medial: Redondo mayor'
        ],
        clinicalNote: 'Sitio de tendinopatía e inestabilidad del tendón del bíceps; el ligamento humeral transverso de Brodie lo mantiene en su canal.',
        hotspot: { x: 36, y: 44 }
      },
      {
        id: 'hum-deltoid-tuberosity',
        name: 'Tuberosidad deltoidea ("V" deltoidea)',
        latinName: 'Tuberositas deltoidea',
        description:
          'Elevación triangular rugosa situada en la cara lateral de la mitad de la diáfisis humeral.',
        associatedMuscles: ['Músculo Deltoides (inserción distal del tendón común)'],
        clinicalNote: 'Representa la potente zona de palanca para la abducción del brazo ejercida por el deltoides.',
        hotspot: { x: 32, y: 78 }
      }
    ]
  }
];

export const MUSCLES_DATA: Muscle[] = [
  {
    id: 'supraspinatus',
    name: 'Supraespinoso',
    latinName: 'Musculus supraspinatus',
    category: 'rotator-cuff',
    categoryLabel: 'Manguito Rotador',
    origin: 'Fosa supraespinosa de la escápula y fascia que la cubre.',
    insertion: 'Carilla superior del troquíter (tubérculo mayor) del húmero y cápsula articular.',
    innervation: {
      nerve: 'Nervio supraescapular',
      roots: 'C5, C6 (tronco superior del plexo braquial)'
    },
    action:
      'Inicia la abducción del brazo (primeros 0° a 15°) y asiste al deltoides. Centra y deprime la cabeza humeral contra la cavidad glenoidea durante la elevación.',
    clinicalTest: 'Test de Jobe ("Empty Can Test" o prueba de la lata vacía). Se evalúa a 90° de abducción y 30° de anteversión con pulgares hacia el suelo.',
    functionalRole: 'Iniciador de la abducción y estabilizador posterosuperior activo.',
    keyMnemonic: 'Es el músculo del manguito más frecuentemente desgarrado por roce bajo el arco coracoacromial.'
  },
  {
    id: 'infraspinatus',
    name: 'Infraespinoso',
    latinName: 'Musculus infraspinatus',
    category: 'rotator-cuff',
    categoryLabel: 'Manguito Rotador',
    origin: 'Fosa infraespinosa de la escápula (dos tercios mediales) y fascia infraespinosa.',
    insertion: 'Carilla media del troquíter (tubérculo mayor) del húmero.',
    innervation: {
      nerve: 'Nervio supraescapular',
      roots: 'C5, C6 (al pasar por la escotadura espinoglenoidea)'
    },
    action:
      'Principal rotador externo del húmero en articulación glenohumeral. Tracciona la cabeza humeral hacia atrás y abajo manteniendo la congruencia articular.',
    clinicalTest: 'Test de Patte: Rotación externa activa contra resistencia con el brazo en 90° de abducción y codo a 90°.',
    functionalRole: 'Rotación externa esencial para actividades de alcance y aseo personal.',
    keyMnemonic: 'Junto al redondo menor genera el par de torsión para equilibrar la potente rotación interna de los músculos anteriores.'
  },
  {
    id: 'teres-minor',
    name: 'Redondo Menor',
    latinName: 'Musculus teres minor',
    category: 'rotator-cuff',
    categoryLabel: 'Manguito Rotador',
    origin: 'Dos tercios superiores del borde lateral (axilar) de la cara dorsal de la escápula.',
    insertion: 'Carilla inferior del troquíter (tubérculo mayor) del húmero.',
    innervation: {
      nerve: 'Nervio axilar (circunflejo)',
      roots: 'C5, C6 (ramo posterior)'
    },
    action:
      'Rotación externa del brazo y débil aducción. Estabilizador posteroinferior dinámico de la cabeza humeral.',
    clinicalTest: 'Signo del claxon (Hornblower\'s sign): Incapacidad para mantener la rotación externa con el brazo en abducción a 90°.',
    functionalRole: 'Sinergista directo del infraespinoso en la rotación externa.',
    keyMnemonic: '¡Ojo con la inervación!: A diferencia del supra e infraespinoso (nervio supraescapular), el redondo menor está inervado por el NERVIO AXILAR.'
  },
  {
    id: 'subscapularis',
    name: 'Subescapular',
    latinName: 'Musculus subscapularis',
    category: 'rotator-cuff',
    categoryLabel: 'Manguito Rotador',
    origin: 'Fosa subescapular en la cara costal anterior de la escápula.',
    insertion: 'Troquín (tubérculo menor) del húmero y labio medial de la corredera bicipital.',
    innervation: {
      nerve: 'Nervios subescapulares superior e inferior',
      roots: 'C5, C6 (del fascículo posterior del plexo braquial)'
    },
    action:
      'Potente rotador interno del húmero y coaptador anterior de la articulación glenohumeral. Evita la luxación anterior de la cabeza humeral.',
    clinicalTest: 'Lift-Off Test de Gerber (separar la mano del dorso lumbar) y Belly-Press Test (presionar el abdomen con la palma sin flexionar muñeca).',
    functionalRole: 'El músculo más grande, fuerte y el único anterior del manguito rotador.',
    keyMnemonic: 'Es el único del manguito que se inserta en el TROQUÍN (tubérculo menor), los otros tres van al TROQUÍTER.'
  },
  {
    id: 'deltoid',
    name: 'Deltoides',
    latinName: 'Musculus deltoideus',
    category: 'superficial',
    categoryLabel: 'Músculo Superficial',
    origin:
      'Tercio lateral de la clavícula (porción clavicular anterior), acromion (porción acromial media) y espina de la escápula (porción espinal posterior).',
    insertion: 'Tuberosidad deltoidea ("V" deltoidea) en la cara lateral de la diáfisis humeral.',
    innervation: {
      nerve: 'Nervio axilar (circunflejo)',
      roots: 'C5, C6'
    },
    action:
      'Porción media: Potente abductor del brazo de 15° hasta los 90°. Porción anterior: Flexor y rotador interno. Porción posterior: Extensor y rotador externo.',
    clinicalTest: 'Abducción del brazo contra resistencia a partir de 15° con el codo flexionado; palpación del muñón del hombro.',
    functionalRole: 'Motor primario de la abducción braquial; confiere la silueta redondeada al hombro.',
    keyMnemonic: 'Su contorno se aplana en luxaciones glenohumerales anteriores ("signo de la charretera militar") o lesión del nervio axilar.'
  },
  {
    id: 'pectoralis-major',
    name: 'Pectoral Mayor',
    latinName: 'Musculus pectoralis major',
    category: 'superficial',
    categoryLabel: 'Músculo Superficial',
    origin:
      'Mitad medial de la clavícula (cabeza clavicular), cara anterior del esternón y seis primeros cartílagos costales (cabeza esternocostal), y aponeurosis del oblicuo externo (cabeza abdominal).',
    insertion: 'Labio lateral de la corredera bicipital (cresta del tubérculo mayor) del húmero.',
    innervation: {
      nerve: 'Nervios pectorales lateral y medial',
      roots: 'C5, C6, C7, C8, T1'
    },
    action:
      'Potente aducción y rotación interna del brazo en la articulación glenohumeral. La cabeza clavicular flexiona el húmero; la esternocostal lo extiende desde la flexión.',
    clinicalTest: 'Aducción horizontal del brazo contra resistencia con codo en 90°, palpando los bordes clavicular y esternocostal.',
    functionalRole: 'Aductor principal de fuerza ("músculo del abrazo"), conforma la pared anterior del hueco axilar.',
    keyMnemonic: 'Se inserta en el labio LATERAL de la corredera bicipital del húmero.'
  },
  {
    id: 'latissimus-dorsi',
    name: 'Dorsal Ancho',
    latinName: 'Musculus latissimus dorsi',
    category: 'superficial',
    categoryLabel: 'Músculo Superficial',
    origin:
      'Apófisis espinosas de T7 a T12, fascia toracolumbar, cresta ilíaca, tres o cuatro últimas costillas y frecuentemente el ángulo inferior de la escápula.',
    insertion: 'Fondo de la corredera bicipital (surco intertubercular) del húmero.',
    innervation: {
      nerve: 'Nervio toracodorsal',
      roots: 'C6, C7, C8'
    },
    action:
      'Extensión, aducción y rotación interna vigorosa del húmero. Desciende el cíngulo escapular. Esencial al nadar en estilo crol o trepar.',
    clinicalTest: 'Pedir al paciente que tosa (se palpa el pliegue axilar posterior) o que efectúe aducción del brazo contra resistencia.',
    functionalRole: 'El músculo más ancho del cuerpo; forma la pared posterior del hueco axilar junto al redondo mayor.',
    keyMnemonic: 'Regla nemotécnica de la corredera: "Un dorsal entre dos mayores" (Pectoral mayor en labio lateral, Redondo mayor en labio medial, Dorsal ancho en el fondo).'
  },
  {
    id: 'trapezius',
    name: 'Trapecio',
    latinName: 'Musculus trapezius',
    category: 'superficial',
    categoryLabel: 'Músculo Superficial',
    origin:
      'Línea nucal superior, protuberancia occipital externa, ligamento nucal y apófisis espinosas de vértebras C7 a T12.',
    insertion:
      'Tercio lateral de la clavícula (fibras descendentes), acromion y labio superior de la espina de la escápula (fibras transversas y ascendentes).',
    innervation: {
      nerve: 'Nervio accesorio (XI par craneal para motricidad) y ramos ventrales de C3-C4 (propiocepción y dolor)',
      roots: 'Par craneal XI, C3, C4'
    },
    action:
      'Fibras superiores: Elevan la escápula y hombro. Fibras medias: Retraen (aproximan a la línea media) la escápula. Fibras inferiores: Descienden la escápula. Fibras superior e inferior rotan la escápula hacia arriba para abducción >90°.',
    clinicalTest: 'Encogimiento de hombros contra resistencia aplicada hacia abajo por el explorador.',
    functionalRole: 'Fijador y estabilizador axial-escapular principal; postural para la cintura escapular.',
    keyMnemonic: 'Inervado primordialmente por un nervio CRANEAL (el accesorio / espinal XI), lo que lo diferencia de los músculos inervados por el plexo braquial.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Qué nervio se encarga de inervar tanto al músculo supraespinoso como al infraespinoso?',
    options: [
      'Nervio axilar (circunflejo)',
      'Nervio supraescapular',
      'Nervio músculocutáneo',
      'Nervio toracodorsal'
    ],
    correctAnswer: 1,
    explanation:
      'El nervio supraescapular (raíces C5-C6 procedentes del tronco superior del plexo braquial) inerva primero al supraespinoso en la fosa supraespinosa y luego rodea la escotadura espinoglenoidea para inervar al infraespinoso.',
    relatedMuscleOrBone: 'Supraespinoso e Infraespinoso'
  },
  {
    id: 2,
    question: 'De los cuatro músculos del manguito rotador, ¿cuál es el ÚNICO que se inserta en el troquín (tubérculo menor) del húmero?',
    options: [
      'Supraespinoso',
      'Infraespinoso',
      'Subescapular',
      'Redondo menor'
    ],
    correctAnswer: 2,
    explanation:
      'El músculo subescapular es el único músculo del manguito de los rotadores ubicado en la cara anterior de la escápula y se inserta en el troquín (tubérculo menor). Los otros tres (supraespinoso, infraespinoso y redondo menor) se insertan en el troquíter (tubérculo mayor).',
    relatedMuscleOrBone: 'Subescapular'
  },
  {
    id: 3,
    question: '¿Cuál es el nervio que inerva al músculo redondo menor (Teres minor)?',
    options: [
      'Nervio supraescapular',
      'Nervio subescapular inferior',
      'Nervio axilar (circunflejo)',
      'Nervio radial'
    ],
    correctAnswer: 2,
    explanation:
      'A diferencia del supraespinoso e infraespinoso, el redondo menor está inervado por el nervio axilar o circunflejo (raíces C5-C6), el cual también inerva al músculo deltoides tras atravesar el espacio cuadrangular (de Velpeau).',
    relatedMuscleOrBone: 'Redondo Menor y Deltoides'
  },
  {
    id: 4,
    question: '¿Qué músculo se encarga primordialmente de iniciar los primeros 0° a 15° de la abducción del brazo antes de que el deltoides tome el relevo principal?',
    options: [
      'Infraespinoso',
      'Pectoral mayor',
      'Supraespinoso',
      'Subescapular'
    ],
    correctAnswer: 2,
    explanation:
      'El supraespinoso es el iniciador biomecánico de la abducción (0°-15°). Además, tracciona la cabeza humeral hacia la cavidad glenoidea previniendo el ascenso indebido por la fuerza del deltoides.',
    relatedMuscleOrBone: 'Supraespinoso'
  },
  {
    id: 5,
    question: '¿Cuál es la inervación motora principal del músculo Trapecio?',
    options: [
      'Nervio dorsal de la escápula',
      'Nervio accesorio (XI par craneal)',
      'Nervio torácico largo',
      'Nervios pectorales mediales'
    ],
    correctAnswer: 1,
    explanation:
      'El trapecio recibe su inervación motora del XI par craneal (Nervio accesorio o espinal). Los ramos de C3 y C4 que recibe transmiten principalmente información sensitiva y propioceptiva.',
    relatedMuscleOrBone: 'Trapecio'
  },
  {
    id: 6,
    question: 'En la corredera bicipital del húmero, ¿qué músculo se inserta exactamente en el fondo del surco intertubercular?',
    options: [
      'Pectoral mayor',
      'Redondo mayor',
      'Dorsal ancho',
      'Coracobraquial'
    ],
    correctAnswer: 2,
    explanation:
      'Regla mnemotécnica clásica: "Un dorsal entre dos mayores". El pectoral mayor se inserta en el labio lateral, el redondo mayor en el labio medial, y el dorsal ancho en el fondo de la corredera bicipital.',
    relatedMuscleOrBone: 'Dorsal Ancho'
  },
  {
    id: 7,
    question: '¿Qué prueba clínica se utiliza comúnmente para evaluar específicamente la integridad del tendón supraespinoso mediante abducción y rotación interna con pulgares hacia abajo?',
    options: [
      'Test de Jobe (Empty Can Test)',
      'Test de Gerber (Lift-Off)',
      'Signo del claxon',
      'Test de Yergason'
    ],
    correctAnswer: 0,
    explanation:
      'El Test de Jobe o prueba de la lata vacía aísla selectivamente el músculo supraespinoso en el plano escapular (30° de anteversión) a 90° de abducción con rotación interna.',
    relatedMuscleOrBone: 'Supraespinoso'
  },
  {
    id: 8,
    question: 'Una fractura desplazada del cuello quirúrgico del húmero pone en riesgo inminente a cuál de las siguientes estructuras nerviosas:',
    options: [
      'Nervio musculocutáneo',
      'Nervio axilar (circunflejo)',
      'Nervio mediano',
      'Nervio supraescapular'
    ],
    correctAnswer: 1,
    explanation:
      'El nervio axilar (circunflejo) y la arteria circunfleja humeral posterior rodean íntimamente la cara posterior del cuello quirúrgico del húmero al cruzar el espacio cuadrilátero, por lo que las fracturas en esta zona causan frecuentemente neuropraxia o sección de este nervio.',
    relatedMuscleOrBone: 'Húmero'
  }
];
