import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TryBehaviorSubjectService } from 'src/app/services/try-behavior-subject-service.service';
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
  totalTodo: any = [];
  currentDate: Date = new Date();
  timeUp!: Date;

  constructor(
    private TryBehaviorSubject: TryBehaviorSubjectService,
    private TodoServiceservice: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.TryBehaviorSubject.getTodoList.subscribe(
      (res) => (this.todoList = res)
    );
    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (this.completedList = res)
    );

    this.timeUp = new Date();
  }

  dueAlarm(date: Date) {
    return new Date(date);
  }

  onSubmit(myForm: NgForm) {
    this.totalTodo = [...this.todoList, ...this.completedList];
    this.form = { ...this.form, id: this.totalTodo.length + 1 };
    console.log(this.form);

    this.todoList = [...this.todoList, this.form];
    console.log(this.todoList);

    //store the updated TodoList into the behavior subject
    this.TryBehaviorSubject.setTodoList(this.todoList);

    // Update the form

    this.form = {
      id: 0,
      title: '',
      body: '',
      dateAdded: new Date(),
      dueDate: new Date(),
      status: false,
    };
    myForm.reset();
  }

  onStatusChecked(todo: TodoList) {
    this.TodoServiceservice.onStatusChecked(todo);
  }

  onStatusUnchecked(todo: TodoList) {
    this.TodoServiceservice.onStatusUnChecked(todo);
  }
}
