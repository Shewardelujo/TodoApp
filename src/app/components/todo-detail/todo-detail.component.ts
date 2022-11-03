import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todoArray!: TodoList[];
  singleTodo!: TodoList;
  todoList: TodoList[] = [];

  id!: any;
  // id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(
    private router: ActivatedRoute,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    // console.log(this.id$);
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);
  }
  getTodoById(id: any) {
    this.singleTodo = this.todoService.getTodo(id);
  }
  deleteActiveTodo(todo: TodoList) {
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      console.log(List);
      this.todoList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== todo.id
      );
    }
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));
    // location.reload();
    window.location.replace('/todos');
  }
}
