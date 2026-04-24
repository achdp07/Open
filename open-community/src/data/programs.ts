export interface Program {
  id: string;
  title: string;
  tag: string;
  desc: string;
  duration: string;
  level: string;
  language: string;
  spots: number;
  startDate: string;
  objectives: string[];
  requirements: string[];
}

export const programs: Program[] = [
  {
    id: 'digital-skills-bootcamp',
    title: 'Digital Skills Bootcamp',
    tag: 'Débutant',
    desc: 'Maîtrisez les bases du développement web et du design digital.',
    duration: '8 semaines',
    level: 'Débutant',
    language: 'Français',
    spots: 30,
    startDate: '1 Juin 2026',
    objectives: [
      'Créer des sites web avec HTML, CSS et JavaScript',
      'Comprendre les bases du design UI/UX',
      'Utiliser Git et GitHub pour versionner son code',
      'Déployer un projet en ligne',
    ],
    requirements: [
      'Aucune expérience requise',
      'Un ordinateur avec accès internet',
      'Motivation et régularité',
    ],
  },
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    tag: 'Innovation',
    desc: 'Comprendre et utiliser l\'IA générative pour booster votre productivité.',
    duration: '4 semaines',
    level: 'Intermédiaire',
    language: 'Français',
    spots: 50,
    startDate: '15 Juin 2026',
    objectives: [
      'Comprendre le fonctionnement de l\'IA générative',
      'Utiliser ChatGPT, Claude et Gemini efficacement',
      'Automatiser des tâches avec l\'IA',
      'Créer des prompts avancés',
    ],
    requirements: [
      'Notions de base en informatique',
      'Un compte sur au moins un outil d\'IA',
    ],
  },
  {
    id: 'tech-career-launchpad',
    title: 'Tech Career Launchpad',
    tag: 'Carrière',
    desc: 'Préparez-vous aux entretiens et construisez un portfolio percutant.',
    duration: '6 semaines',
    level: 'Intermédiaire',
    language: 'Français',
    spots: 20,
    startDate: '1 Juillet 2026',
    objectives: [
      'Construire un portfolio professionnel',
      'Préparer et réussir les entretiens techniques',
      'Optimiser son profil LinkedIn',
      'Négocier son salaire',
    ],
    requirements: [
      'Avoir des bases en développement ou design',
      'Être en recherche active d\'emploi ou stage',
    ],
  },
  {
    id: 'innovation-lab',
    title: 'Innovation Lab',
    tag: 'Projet',
    desc: 'Transformez vos idées en prototypes réels avec l\'aide de mentors.',
    duration: '10 semaines',
    level: 'Avancé',
    language: 'Français',
    spots: 15,
    startDate: '15 Juillet 2026',
    objectives: [
      'Valider une idée de projet avec la méthode lean',
      'Construire un MVP fonctionnel',
      'Pitcher devant un jury',
      'Accéder à un réseau de mentors et investisseurs',
    ],
    requirements: [
      'Avoir une idée de projet',
      'Compétences techniques de base',
      'Esprit d\'équipe',
    ],
  },
];