import type { Student, ExamResult } from './types';
import { isPassed, formatResult, filterBySubject, getMinMax } from './exams';


//Создаём тестовые данные
const student1: Student = { id: 1, name: 'Анна Иванова', group: 'ИС-23' };
const student2: Student = { id: 2, name: 'Иван Петров', group: 'ИС-23' };

const result1: ExamResult = { 
  student: student1, 
  subject: 'Математика', 
  grade: 4, 
  status: 'passed' 
};

const result2: ExamResult = { 
  student: student2, 
  subject: 'Физика', 
  grade: 2, 
  status: 'failed' 
};

//1
console.log("\nПроверка isPassed");
console.log(`Анна сдала математику? ${isPassed(result1)}`); // true (оценка 4)
console.log(`Иван сдал физику? ${isPassed(result2)}`);      // false (оценка 2)

//2
console.log("\nПроверка formatResult");
console.log(formatResult(result1)); // Анна Иванова | Математика | 4 | passed
console.log(formatResult(result2)); // Иван Петров | Физика | 2 | failed

//3
console.log("\nПроверка filterBySubject");
const allResults = [result1, result2];
const mathResults = filterBySubject(allResults, 'Математика');
console.log(`Найдено результатов по Математике: ${mathResults.length}`); // 1

//4
console.log("\nПроверка getMinMax");
const [min, max] = getMinMax([4, 5, 3, 5, 4]);
console.log(`Минимум: ${min}, максимум: ${max}`); // Минимум: 3, максимум: 5
