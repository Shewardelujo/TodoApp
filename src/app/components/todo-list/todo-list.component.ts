import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
  todoList: any = [];
  completedList: any = [];
  currentDate: Date = new Date();
  timeUp!: Date;

  constructor() {}

  ngOnInit(): void {
    // Get items from local storage
    // const storedData = JSON.parse(localStorage.getItem('todoItems') || '[]');
    // const completedData = JSON.parse(
    //   localStorage.getItem('completedItems') || '[]'
    // );

    // // Create a new BehaviorSubject with an initial todo list
    // const todoListSubject = new BehaviorSubject<TodoList[]>(storedData);
    // // Create an observable from the subject
    // const todoListObservable = todoListSubject.asObservable();
    // // Subscribe to the observable
    // todoListObservable.subscribe((todoList) => {
    //   this.todoList = todoList;
    // });

    // Create a new BehaviorSubject with an initial completed list
    // const completedListSubject = new BehaviorSubject<TodoList[]>(completedData);
    // // Create an observable from the subject
    // const completedListObservable = completedListSubject.asObservable();
    // // Subscribe to the observable
    // completedListObservable.subscribe((completedList) => {
    //   this.completedList = completedList;
    // });

    this.timeUp = new Date();
  }

  dueAlarm(date: Date) {
    return new Date(date);
  }

  onSubmit(myForm: NgForm) {
    this.form = { ...this.form, id: this.todoList.length + 1 };
    console.log(this.form);

    this.todoList = [...this.todoList, this.form];
    console.log(this.todoList);
    myForm.reset({
      id: 0,
      title: '',
      body: '',
      dateAdded: new Date(),
      dueDate: new Date(),
      status: false,
    });

    // localStorage.setItem('todoItems', JSON.stringify(this.todoList));
    // console.log(this.todoList);
    // myForm.reset({
    //   id: 0,
    //   title: '',
    //   body: '',
    //   dateAdded: new Date(),
    //   dueDate: new Date(),
    //   status: false,
    // });
    // location.reload();
  }

  // onStatusChecked(todo: TodoList) {
  //   const updatedTodo = { ...todo, status: !todo.status };
  //   const storedData = localStorage.getItem('todoItems');
  //   if (storedData != null) {
  //     const List = JSON.parse(storedData);
  //     this.todoList = List.filter(
  //       (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
  //     );
  //     this.completedList.push(updatedTodo);
  //   }
  //   localStorage.setItem('completedItems', JSON.stringify(this.completedList));
  //   localStorage.setItem('todoItems', JSON.stringify(this.todoList));
  // }

  // onStatusUnchecked(todo: TodoList) {
  //   const updatedTodo = { ...todo, status: !todo.status };
  //   const storedData = localStorage.getItem('completedItems');
  //   if (storedData != null) {
  //     const List = JSON.parse(storedData);
  //     this.completedList = List.filter(
  //       (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
  //     );
  //     this.todoList.push(updatedTodo);
  //   }
  //   localStorage.setItem('completedItems', JSON.stringify(this.completedList));
  //   localStorage.setItem('todoItems', JSON.stringify(this.todoList));
  // }
}
