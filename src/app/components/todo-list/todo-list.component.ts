import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  completedList: TodoList[] = [];
  totalTodo: TodoList[] = [];
  currentDate: Date = new Date();
  timeUp!: Date;

  constructor() {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      this.todoList = JSON.parse(storedData);
    }
    const completedData = localStorage.getItem('completedItems');
    if (completedData != null) {
      this.completedList = JSON.parse(completedData);
    }

    this.timeUp = new Date();
  }
  dueAlarm(date: Date) {
    return new Date(date);
  }

  onSubmit(myForm: NgForm) {
    this.totalTodo = [...this.todoList, ...this.completedList];
    this.form = { ...this.form, id: this.totalTodo.length + 1 };

    this.todoList.push(this.form);
    console.log(this.todoList);
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));
    myForm.reset({
      id: 0,
      title: '',
      body: '',
      dateAdded: new Date(),
      dueDate: new Date(),
      status: false,
    });
    location.reload();
  }

  onStatusChecked(todo: TodoList) {
    const updatedTodo = { ...todo, status: !todo.status };
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      this.todoList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.completedList.push(updatedTodo);
    }
    localStorage.setItem('completedItems', JSON.stringify(this.completedList));
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));
  }

  onStatusUnchecked(todo: TodoList) {
    const updatedTodo = { ...todo, status: !todo.status };
    const storedData = localStorage.getItem('completedItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      this.completedList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.todoList.push(updatedTodo);
    }
    localStorage.setItem('completedItems', JSON.stringify(this.completedList));
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));
  }
}
