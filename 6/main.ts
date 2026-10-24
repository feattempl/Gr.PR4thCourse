import type { Teacher, Course, Group, CourseStatus, HasTimestamps } from './types';


const teacher1: Teacher = {
  id: 1,
  name: 'Иванов И.И.',
  subject: 'Математика',
  email: 'ivanov@college.ru',
  createdAt: '2023-09-01',
  updatedAt: '2023-09-01'
};

const course1: Course = {
  id: 101,
  title: 'Высшая математика',
  teacher: teacher1,
  hoursTotal: 120,
  isActive: true,
  createdAt: '2023-09-02',
  updatedAt: '2023-09-02'
};

const group1: Group = {
  name: 'ИС-23',
  courses: [course1],
  studentCount: 25
};

const status: CourseStatus = 'active';

console.log("Преподаватель:", teacher1.name);
console.log("Email (опциональный):", teacher1.email);
console.log(`Курс "${course1.title}" ведет ${course1.teacher.name}`);
console.log("Статус курса:", status);
console.log(`Группа ${group1.name} (${group1.studentCount} чел.)`);
console.log(`Дата создания курса: ${course1.createdAt}`);