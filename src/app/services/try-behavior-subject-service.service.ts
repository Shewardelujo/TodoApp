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

  constructor() {
    localStorage.getItem('todoList');
    // Create a new BehaviorSubject with an initial todo list

    this.todoList = new BehaviorSubject<TodoList[]>([]);
    this.completedList = new BehaviorSubject<TodoList[]>([]);
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
