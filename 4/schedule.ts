import type { Schedule, Lesson, DayOfWeek, LessonType } from './types';

export function getLessonsByDay(schedule: Schedule, day: DayOfWeek): Lesson[] {
  return schedule.lessons.filter((lesson) => lesson.dayOfWeek === day);
}

export function getLessonsByType(schedule: Schedule, type: LessonType): Lesson[] {
  return schedule.lessons.filter((lesson) => lesson.type === type);
}

export function getTeacherLessons(schedule: Schedule, teacherId: number): Lesson[] {
  return schedule.lessons.filter((lesson) => lesson.teacher.id === teacherId);
}

const TYPE_LABELS: Record<LessonType, string> = {
  lecture: 'лекция',
  practice: 'практика',
  lab: 'лабораторная',
};

export function formatLesson(lesson: Lesson): string {
  const base = `${lesson.startTime}–${lesson.endTime} | ${lesson.title} (${TYPE_LABELS[lesson.type]})`;
  return lesson.room ? `${base} | ауд. ${lesson.room}` : base;
}

export function getLast<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[items.length - 1] : undefined;
}