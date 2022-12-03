import { Injectable } from '@angular/core';
import { TodoList } from '../components/todo-list/todo';
import { TryBehaviorSubjectService } from './try-behavior-subject-service.service';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  todoArray!: TodoList[];
  singleTodo!: TodoList;

  todoList: any = [];
  completedList: any = [];

  constructor(private TryBehaviorSubject: TryBehaviorSubjectService) {
    this.TryBehaviorSubject.getTodoList.subscribe(
      (res) => (this.todoList = res)
    );
    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (this.completedList = res)
    );
  }
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

  onStatusChecked(todo: TodoList) {
    const updatedTodo = { ...todo, status: !todo.status };

    if (this.todoList.length != 0) {
      this.todoList = this.todoList.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.completedList.push(updatedTodo);
    }

    //store the updated TodoList and completed List into the behavior subject
    this.TryBehaviorSubject.setTodoList(this.todoList);
    this.TryBehaviorSubject.setCompletedList(this.completedList);
  }

  onStatusUnChecked(todo: TodoList) {
    const updatedTodo = { ...todo, status: !todo.status };

    if (this.completedList.length != 0) {
      this.completedList = this.completedList.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.todoList.push(updatedTodo);
    }

    //store the updated TodoList and completed List into the behavior subject
    this.TryBehaviorSubject.setTodoList(this.todoList);
    this.TryBehaviorSubject.setCompletedList(this.completedList);
  }
}
