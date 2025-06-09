//Datos de prueba para hábitos.

export interface Habit {
  id: number;
  title: string;
  time: string;
  description: string;
  days: string[];
}

export const habits: Habit[] = [
  { 
    id: 1,
    title: 'Cepillarse los dientes', 
    time: '06:30 am',
    description: 'Cepillado matutino después de desayunar',
    days: ['Diariamente']
  },
  { 
    id: 2,
    title: 'Hacer tarea', 
    time: '10:00 am',
    description: 'Tareas escolares y trabajos universitarios',
    days: ['Lunes', 'Miércoles', 'Viernes']
  },
  { 
    id: 3,
    title: 'Comer fruta', 
    time: '11:00 am',
    description: 'Refrigerio saludable de media mañana',
    days: ['Diariamente']
  },
  { 
    id: 4,
    title: 'Tomar agua', 
    time: '12:00 pm',
    description: 'Vaso de agua antes del almuerzo',
    days: ['Diariamente']
  },
  { 
    id: 5,
    title: 'Descansar', 
    time: '04:00 pm',
    description: 'Pausa activa de 15 minutos',
    days: ['Lunes', 'Martes', 'Jueves', 'Viernes']
  },
  { 
    id: 6,
    title: 'Cepillarse los dientes', 
    time: '08:30 pm',
    description: 'Cepillado nocturno antes de dormir',
    days: ['Diariamente']
  },
  { 
    id: 7,
    title: 'Leer libro', 
    time: '09:00 pm',
    description: 'Lectura recreativa antes de dormir',
    days: ['Martes', 'Jueves', 'Sábado']
  },
  { 
    id: 8,
    title: 'Meditar', 
    time: '07:00 am',
    description: 'Meditación matutina de 10 minutos',
    days: ['Domingo']
  },
  { 
    id: 9,
    title: 'Ejercicio', 
    time: '06:00 am',
    description: 'Rutina de ejercicio de 30 minutos',
    days: ['Lunes', 'Miércoles', 'Viernes']
  },
  { 
    id: 10,
    title: 'Revisar correos', 
    time: '08:00 am',
    description: 'Revisión y organización de correo electrónico',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  },
  { 
    id: 11,
    title: 'Comer papa', 
    time: '08:00 am',
    description: 'Revisión y organización de correo electrónico',
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  }
];

export const days:string[] = [
  'Diariamente',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

