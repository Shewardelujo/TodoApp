import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TryBehaviorSubjectService } from 'src/app/services/try-behavior-subject-service.service';
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
    private todoService: TodoServiceService,
    private route: Router,
    private TryBehaviorSubject: TryBehaviorSubjectService
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
    let storedData!: TodoList[];

    this.TryBehaviorSubject.getTodoList.subscribe((res) => (storedData = res));

    this.todoList = storedData.filter(
      (eachTodo: TodoList) => eachTodo.id !== todo.id
    );
    this.TryBehaviorSubject.setTodoList(this.todoList);

    // location.reload();
    this.route.navigateByUrl('/todos');
  }
}
