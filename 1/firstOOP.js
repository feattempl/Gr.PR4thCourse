
//1

class Person {
  constructor(name, age) {
    if (new.target === Person) {
      throw new Error('Нельзя создать экземпляр абстрактного класса Person');
    }
    this.name = name;
    this.age = age;
  }

  getRole() {
    throw new Error('Метод getRole() должен быть переопределён в подклассе');
  }
}

class Student extends Person {
  constructor(name, age, group) {
    super(name, age);
    this.group = group;
  }

  getRole() {
    return `Студент группы ${this.group}`;
  }

  study() {
    console.log(`${this.name} учится в группе ${this.group}`);
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getRole() {
    return `Преподаватель ${this.subject}`;
  }

  teach() {
    console.log(`${this.name} ведёт занятие по предмету ${this.subject}`);
  }
}



//2

class Gradebook {
  #grades = new Map();

  addGrade(studentName, subject, grade) {
    if (typeof grade !== 'number' || grade < 1 || grade > 5) {
      throw new Error('Оценка должна быть числом от 1 до 5');
    }
    if (!this.#grades.has(studentName)) {
      this.#grades.set(studentName, new Map());
    }
    const subjects = this.#grades.get(studentName);
    if (!subjects.has(subject)) {
      subjects.set(subject, []);
    }
    subjects.get(subject).push(grade);
  }

  getAverage(studentName) {
    const subjects = this.#grades.get(studentName);
    if (!subjects) return 0;
    let sum = 0;
    let count = 0;
    for (const grades of subjects.values()) {
      for (const g of grades) {
        sum += g;
        count++;
      }
    }
    return count === 0 ? 0 : sum / count;
  }

  getTopStudent() {
    let topName = null;
    let topAvg = -Infinity;
    for (const name of this.#grades.keys()) {
      const avg = this.getAverage(name);
      if (avg > topAvg) {
        topAvg = avg;
        topName = name;
      }
    }
    return topName;
  }
}



//3

class Lesson {
  constructor(subject, teacher, room, time) {
    this.subject = subject;
    this.teacher = teacher;
    this.room = room;
    this.time = time;
  }

  describe() {
    console.log(`${this.time} | ${this.subject} | ${this.teacher} | ауд. ${this.room}`);
  }
}

class Schedule {
  #lessons = [];

  addLesson(lesson) {
    this.#lessons.push(lesson);
  }

  getLessonsByTeacher(teacherName) {
    return this.#lessons.filter((l) => l.teacher === teacherName);
  }

  getLessonsByRoom(room) {
    return this.#lessons.filter((l) => l.room === room);
  }

  printAll() {
    for (const lesson of this.#lessons) {
      lesson.describe();
    }
  }
}



//Демо

console.log("\nПроверка 1");

const people = [
  new Student('Иван', 19, 'ИС-23'),
  new Student('Мария', 20, 'ИС-24'),
  new Teacher('Пётр', 45, 'JavaScript'),
  new Teacher('Анна', 38, 'Базы данных')
];

//Полиморфизм
for (const person of people) {
  console.log(person.getRole());
}


console.log("\nПроверка 2");
const gb = new Gradebook();

//Добав оценки
gb.addGrade('Иван', 'JS', 5);
gb.addGrade('Иван', 'JS', 4);
gb.addGrade('Иван', 'Базы данных', 5);
gb.addGrade('Мария', 'JS', 3);
gb.addGrade('Мария', 'JS', 3);

//Средние баллы
console.log(`Средний балл Ивана: ${gb.getAverage('Иван')}`); // (5+4+5)/3 = 4.66...
console.log(`Средний балл Марии: ${gb.getAverage('Мария')}`); // 3

//Лучший студент
console.log(`Лучший студент: ${gb.getTopStudent()}`); // Иван



console.log("\nПроверка 3");
const sch = new Schedule();

//Занятия
sch.addLesson(new Lesson('JavaScript', 'Пётр', '101', '09:00'));
sch.addLesson(new Lesson('Базы данных', 'Анна', '202', '11:00'));
sch.addLesson(new Lesson('JS-практика', 'Пётр', '305', '13:00'));

// Выводим все занятия
console.log("Все занятия:");
sch.printAll();

//Поиск по преподавателю
const petrLessons = sch.getLessonsByTeacher('Пётр');
console.log(`\nЗанятия Петра (${petrLessons.length}):`);
petrLessons.forEach(l => l.describe());

//Поиск по аудитории
const room202 = sch.getLessonsByRoom('202');
console.log(`\nЗанятия в аудитории 202 (${room202.length}):`);
room202.forEach(l => l.describe());