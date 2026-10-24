export type Grade = 1 | 2 | 3 | 4 | 5;

export type Subject = 'Математика' | 'Физика' | 'Информатика' | 'Английский';

export type ExamStatus = 'scheduled' | 'passed' | 'failed' | 'retake';

export interface Student {
  id: number;
  name: string;
  group: string;
}

export interface ExamResult {
  student: Student;
  subject: Subject;
  grade: Grade;
  status: ExamStatus;
  comment?: string;
}