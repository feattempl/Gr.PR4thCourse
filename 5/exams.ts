import type { ExamResult, Subject } from './types';

export function isPassed(result: ExamResult): boolean {
  return result.grade >= 3;
}

export function formatResult(result: ExamResult): string {
  return `${result.student.name} | ${result.subject} | ${result.grade} | ${result.status}`;
}

export function filterBySubject(results: ExamResult[], subject: Subject): ExamResult[] {
  return results.filter((r) => r.subject === subject);
}

export function getMinMax(grades: number[]): [number, number] {
  if (grades.length === 0) {
    throw new Error('Массив оценок пуст');
  }
  const min = Math.min(...grades);
  const max = Math.max(...grades);
  return [min, max];
}