import { Component, OnInit } from '@angular/core';
import { todoList } from 'src/app/todoList';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  form: TodoList = {
    id: 0,
    title: '',
    body: '',
    dateAdded: new Date(),
    dueDate: new Date(),
    status: false,
  };
  // todoList: TodoList[] = todoList;

  constructor() {}

  ngOnInit(): void {}
  onSubmit() {
    this.form = { ...this.form, id: todoList.length + 1 };
    todoList.push(this.form);
    localStorage.setItem('todoItems', JSON.stringify(todoList));

    this.form = {
      id: 0,
      title: '',
      body: '',
      dateAdded: new Date(),
      dueDate: new Date(),
      status: false,
    };

    console.log(todoList);
  }
}
