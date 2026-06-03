export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  locked?: boolean;
}

export interface Module {
  id: string;
  programId: string;
  title: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'module-1',
    programId: 'digital-skills-bootcamp',
    title: 'Introduction au Web',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Bienvenue',
        duration: '10 min',
        completed: true,
      },
      {
        id: 'lesson-2',
        title: 'Comment fonctionne Internet',
        duration: '20 min',
        completed: true,
      },
    ],
  },
  {
    id: 'module-2',
    programId: 'digital-skills-bootcamp',
    title: 'HTML Fondamentaux',
    lessons: [
      {
        id: 'lesson-3',
        title: 'Les balises HTML',
        duration: '30 min',
        completed: true,
      },
      {
        id: 'lesson-4',
        title: 'Créer une page web',
        duration: '45 min',
      },
    ],
  },
  {
    id: 'module-3',
    programId: 'ai-for-everyone',
    title: 'Introduction à l’IA',
    lessons: [
      {
        id: 'lesson-5',
        title: 'Qu’est-ce que l’IA ?',
        duration: '20 min',
      },
    ],
  },
];

export const getModulesByProgram = (programId: string): Module[] => {
  return modules.filter((module) => module.programId === programId);
};

export const getModuleById = (moduleId: string): Module | undefined => {
  return modules.find((module) => module.id === moduleId);
};