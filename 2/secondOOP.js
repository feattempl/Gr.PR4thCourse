
//1

class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get title() {
    return this.#title
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Название должно быть непустой строкой');
    }
    this.#title = value;
  }

  get author() { return this.#author; }
  set author(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Автор должен быть непустой строкой');
    }
    this.#author = value;
  }

  get year() { return this.#year; }
  set year(value) {
    const now = new Date().getFullYear();
    if (typeof value !== 'number' || value < 1000 || value > now) {
      throw new Error('недопустимый год');
    }
    this.#year = value;
  }

  get age() {
    return new Date().getFullYear() - this.#year;
  }
}



//2

class BookFactory {
  static create(genre, title, author, year) {
    let finalTitle = title;

    switch (genre) {
      case 'fiction':
        finalTitle = `[Худ. лит.] ${title}`;
        break;
      case 'science':
        finalTitle = `[Науч.] ${title}`;
        break;
      case 'children':
        if (year < 1900) {
          throw new Error('Детская книга не может быть старше 1900 года');
        }
        finalTitle = `[Дет.] ${title}`;
        break;
      default:
        throw new Error(`Неизвестный жанр: ${genre}`);
    }

    const book = new Book(finalTitle, author, year);
    book.genre = genre;
    return book;
  }
}



//3

const Logger = {
  log(message) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${message}`);
  },
};

class Library {
  #books = [];

  addBook(book) {
    this.#books.push(book);
    this.log(`Добавлена книга: ${book.title}`);
  }

  findByAuthor(author) {
    return this.#books.filter((b) => b.author === author);
  }

  findByGenre(genre) {
    return this.#books.filter((b) => b.genre === genre);
  }

  get books() { return this.#books; }
}

Object.assign(Library.prototype, Logger);



//4

const EventEmitter = {
  _events: {},

  on(event, handler) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(handler);
  },

  emit(event, payload) {
    if (!this._events[event]) return;
    for (const handler of this._events[event]) handler(payload);
  },
};

// Миксин EventEmitter в Library
Object.assign(Library.prototype, EventEmitter);

// Добавляем методы для выдачи/возврата
Library.prototype.borrowBook = function (book, reader) {
  this.emit('bookBorrowed', { book, reader });
};

Library.prototype.returnBook = function (book, reader) {
  this.emit('bookReturned', { book, reader });
};

//Подписчики
const logSubscriber = {
  init(library) {
    library.on('bookBorrowed', ({ book, reader }) =>
      console.log(`[Событие] Книга "${book.title}" выдана читателю ${reader}`)
    );
    library.on('bookReturned', ({ book, reader }) =>
      console.log(`[Событие] Книга "${book.title}" возвращена читателем ${reader}`)
    );
  },
};

const statsSubscriber = {
  counts: new Map(),
  init(library) {
    library.on('bookBorrowed', ({ book }) => {
      this.counts.set(book.title, (this.counts.get(book.title) || 0) + 1);
    });
  },
  report() {
    console.log('Статистика выдач');
    for (const [title, count] of this.counts.entries()) {
      console.log(`"${title}": ${count} раз(а)`);
    }
  },
};



//Демо


console.log("Проверка 1");
const book1 = new Book('мастер и маргарита', 'Булгаков', 1967);
console.log("Название (геттер):", book1.title);
console.log("Возраст (геттер):", book1.age);



console.log("\nПроверка 2");
const scienceBook = BookFactory.create('science', 'Краткая история времени', 'Хокинг', 1988);
console.log("Создана книга (science):", scienceBook.title);

const fictionBook = BookFactory.create('fiction', 'война и мир', 'Толстой', 1869);
console.log("Создана книга (fiction):", fictionBook.title);



console.log("\nПроверка 3");
const myLibrary = new Library();
myLibrary.addBook(scienceBook);
myLibrary.addBook(fictionBook);

const tolstoyBooks = myLibrary.findByAuthor('Толстой');
console.log(`Найдено книг Толстого: ${tolstoyBooks.length}`);

const scienceBooks = myLibrary.findByGenre('science');
console.log(`Найдено научных книг: ${scienceBooks.length}`);


console.log("\nПроверка 4");
logSubscriber.init(myLibrary);
statsSubscriber.init(myLibrary);

// Выдаем и возвращаем книги
myLibrary.borrowBook(scienceBook, 'Иван');
myLibrary.borrowBook(fictionBook, 'Мария');
myLibrary.borrowBook(scienceBook, 'Петр');
myLibrary.returnBook(fictionBook, 'Мария');

//Cтатистика второго подписчика
statsSubscriber.report();