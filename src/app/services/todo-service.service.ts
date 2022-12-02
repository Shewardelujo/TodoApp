import { Injectable } from '@angular/core';
import { TodoList } from '../components/todo-list/todo';
import { TryBehaviorSubjectService } from './try-behavior-subject-service.service';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  todoArray!: TodoList[];
  singleTodo!: TodoList;

  constructor(private TryBehaviorSubject: TryBehaviorSubjectService) {}
  getTodo(id: any) {
    this.TryBehaviorSubject.getTodoList.subscribe(
      (res) => (this.todoArray = res)
    );
    this.singleTodo = this.todoArray.filter((todo) => todo.id == id)[0];
    console.log(this.singleTodo);
    return this.singleTodo;
  }

  getCompleted(id: any) {
    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (this.todoArray = res)
    );
    this.singleTodo = this.todoArray.filter((todo) => todo.id == id)[0];
    console.log(this.singleTodo);
    return this.singleTodo;
  }
}
