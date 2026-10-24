import type { Schedule, Teacher } from './types';
import { getLessonsByDay, getLessonsByType, getTeacherLessons, formatLesson, getLast } from './schedule';


//1
const teacher1: Teacher = { id: 1, name: 'Иванов И.И.', subject: 'Математика' };
const teacher2: Teacher = { id: 2, name: 'Петрова А.С.', subject: 'Информатика' };

const schedule: Schedule = {
  groupName: 'ИС-23',
  lessons: [
    {
      id: 101,
      title: 'Алгебра',
      type: 'lecture',
      teacher: teacher1,
      dayOfWeek: 'monday',
      startTime: '09:00',
      endTime: '10:30',
      room: '301'
    },
    {
      id: 102,
      title: 'Программирование',
      type: 'practice',
      teacher: teacher2,
      dayOfWeek: 'monday',
      startTime: '11:00',
      endTime: '12:30',
      room: '202'
    },
    {
      id: 103,
      title: 'Физика',
      type: 'lab',
      teacher: teacher1,
      dayOfWeek: 'tuesday',
      startTime: '09:00',
      endTime: '10:30'
    }
  ]
};

const teachers: Teacher[] = [teacher1, teacher2];

//2
console.log("\nПоиск по дню");
const mondayLessons = getLessonsByDay(schedule, 'monday');
mondayLessons.forEach(l => console.log(formatLesson(l)));

console.log("\nПоиск по типу");
const lectures = getLessonsByType(schedule, 'lecture');
console.log(`Найдено лекций: ${lectures.length}`);

console.log("\nПоиск по преподавателю");
const teacherLessons = getTeacherLessons(schedule, 1);
console.log(`Занятий Иванова: ${teacherLessons.length}`);

//3
console.log("\nGeneric getLast");
const lastLesson = getLast(schedule.lessons);
const lastTeacher = getLast(teachers);

console.log(`Последнее занятие: ${lastLesson?.title}`);
console.log(`Последний преподаватель: ${lastTeacher?.name}`);