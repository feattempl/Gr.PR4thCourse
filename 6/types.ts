//1


export type CourseStatus = 'planned' | 'active' | 'completed' | 'cancelled';

export interface Teacher {
  readonly id: number;
  name: string;
  subject: string;
  email?: string;
}

export interface Course {
  readonly id: number;
  title: string;
  teacher: Teacher;
  hoursTotal: number;
  isActive: boolean;
}

export interface Group {
  name: string;
  courses: Course[];
  studentCount: number;
}

//2

//Создаём базовый интерфейс
export interface HasTimestamps {
  createdAt: string;
  updatedAt: string;
}

//Расширяем Teacher и Course через HasTimestamps
export interface Teacher extends HasTimestamps {
  readonly id: number;
  name: string;
  subject: string;
  email?: string;
}

export interface Course extends HasTimestamps {
  readonly id: number;
  title: string;
  teacher: Teacher;
  hoursTotal: number;
  isActive: boolean;
}