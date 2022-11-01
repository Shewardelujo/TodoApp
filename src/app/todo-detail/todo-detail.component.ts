import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todoArray!: TodoList[];
  singleTodo!: TodoList;
  id!: any;
  // id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.id$);
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);
  }
  getTodoById(id: any) {
    const localData = localStorage.getItem('todoItems');
    console.log('localData', localData);
    if (localData !== null) {
      this.todoArray = JSON.parse(localData);
      console.log('todoArray', this.todoArray);
      this.singleTodo = this.todoArray.filter((todo) => todo.id == id)[0];
      console.log(this.singleTodo);
    }
  }
}
