import { Component, OnInit } from '@angular/core';
import { TodoList } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  form: TodoList = {
    id: 0,
    title: '',
    body: '',
    dateAdded: new Date(),
    dueDate: new Date(),
    status: false,
  };
  todoList: TodoList[] = [];

  constructor() {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      this.todoList = JSON.parse(storedData);
      console.log(this.todoList);
    }
  }
  onSubmit() {
    this.form = { ...this.form, id: this.todoList.length + 1 };
    this.todoList.push(this.form);
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));

    this.form = {
      id: 0,
      title: '',
      body: '',
      dateAdded: new Date(),
      dueDate: new Date(),
      status: false,
    };

    console.log(this.todoList);
  }
}
