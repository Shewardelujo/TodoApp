import { Injectable } from '@angular/core';
import { TodoList } from '../components/todo-list/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  todoArray!: TodoList[];
  singleTodo!: TodoList;

  constructor() {}
  getTodo(id: any) {
    const localData = localStorage.getItem('todoItems');
    console.log('localData', localData);
    if (localData !== null) {
      this.todoArray = JSON.parse(localData);
      console.log('todoArray', this.todoArray);
      this.singleTodo = this.todoArray.filter((todo) => todo.id == id)[0];
      console.log(this.singleTodo);
    }
    return this.singleTodo;
  }
  getCompleted(id: any) {
    const localData = localStorage.getItem('completedItems');
    console.log('localData', localData);
    if (localData !== null) {
      this.todoArray = JSON.parse(localData);
      console.log('todoArray', this.todoArray);
      this.singleTodo = this.todoArray.filter((todo) => todo.id == id)[0];
      console.log(this.singleTodo);
    }
    return this.singleTodo;
  }
}
