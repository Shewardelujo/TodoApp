import { Injectable } from '@angular/core';
import { TodoList } from '../components/todo-list/todo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TryBehaviorSubjectService {
  //declared the variable and gave it a type behaviorSubject
  public todoList!: BehaviorSubject<TodoList[]>;
  public completedList!: BehaviorSubject<TodoList[]>;
  todoItem!: TodoList[];
  completedItem!: TodoList[];

  constructor() {
    //getting item from localStorage for persistence
    const storedTodoData = localStorage.getItem('todoItem');
    if (storedTodoData != null) {
      const list = JSON.parse(storedTodoData);
      console.log(list);
      this.completedItem = list;
    }

    const storedCompletedItem = localStorage.getItem('completedItem');
    if (storedCompletedItem != null) {
      const list = JSON.parse(storedCompletedItem);
      console.log(list);
      this.todoItem = list;
    }

    // CREATE A NEW BEHAVIOR SUBJECT WITH AN INITIAL TODO LIST

    this.todoList = new BehaviorSubject<TodoList[]>(this.todoItem || []);
    this.completedList = new BehaviorSubject<TodoList[]>(
      this.completedItem || []
    );

    // CREATE A NEW BEHAVIOR SUBJECT WITH AN INITIAL TODO LIST

    // this.todoList = new BehaviorSubject<TodoList[]>([]);
    // this.completedList = new BehaviorSubject<TodoList[]>([]);
  }

  get getTodoList(): Observable<TodoList[]> {
    return this.todoList.asObservable();
  }

  setTodoList(todoList: TodoList[]) {
    this.todoList.next(todoList);
    localStorage.setItem('todoItem', JSON.stringify(todoList));
  }
  get getCompletedList(): Observable<TodoList[]> {
    return this.completedList.asObservable();
    // return this.completedList$;
  }

  setCompletedList(todoList: TodoList[]) {
    this.completedList.next(todoList);
    localStorage.setItem('completedItem', JSON.stringify(todoList));
  }
}
