export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type LessonType = 'lecture' | 'practice' | 'lab';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

export interface Lesson {
  id: number;
  title: string;
  type: LessonType;
  teacher: Teacher;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  room?: string;
}

export interface Schedule {
  groupName: string;
  lessons: Lesson[];
}