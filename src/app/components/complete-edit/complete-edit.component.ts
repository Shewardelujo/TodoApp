import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TryBehaviorSubjectService } from 'src/app/services/try-behavior-subject-service.service';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-complete-edit',
  templateUrl: './complete-edit.component.html',
  styleUrls: ['./complete-edit.component.css'],
})
export class CompleteEditComponent implements OnInit {
  singleTodo!: TodoList;
  form!: TodoList;

  todoList!: TodoList[];
  id!: any;
  currentDate: any = new Date();

  constructor(
    private router: ActivatedRoute,
    private todoService: TodoServiceService,
    private TryBehaviorSubject: TryBehaviorSubjectService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);

    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (this.todoList = res)
    );
  }

  getTodoById(id: any) {
    this.singleTodo = this.todoService.getCompleted(id);
    this.form = {
      id: this.singleTodo.id,
      title: this.singleTodo.title,
      body: this.singleTodo.body,
      dateAdded: this.singleTodo.dateAdded,
      dueDate: this.singleTodo.dueDate,
      status: this.singleTodo.status,
    };
  }
  onSubmit() {
    const updatedArray = this.todoList.map((todo) => {
      if (todo.id == this.id) {
        return { ...this.form, id: this.id, dateAdded: new Date() };
      }
      console.log(todo);
      return todo;
    });

    this.TryBehaviorSubject.setCompletedList(updatedArray);

    this.route.navigateByUrl('/todos');
  }
}
