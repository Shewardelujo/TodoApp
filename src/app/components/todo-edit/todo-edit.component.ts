import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  singleTodo!: TodoList;
  form!: TodoList;

  todoList!: TodoList[];
  id!: any;
  currentDate: any = new Date();

  constructor(
    private router: ActivatedRoute,
    private todoService: TodoServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      this.todoList = JSON.parse(storedData);
      console.log(this.todoList);
    }
  }
  getTodoById(id: any) {
    this.singleTodo = this.todoService.getTodo(id);
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
      return todo;
    });
    localStorage.setItem('todoItems', JSON.stringify(updatedArray));
    // window.location.replace('/todos');
    this.route.navigateByUrl('/todos');
  }
}
