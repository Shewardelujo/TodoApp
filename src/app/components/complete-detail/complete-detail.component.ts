import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-complete-detail',
  templateUrl: './complete-detail.component.html',
  styleUrls: ['./complete-detail.component.css'],
})
export class CompleteDetailComponent implements OnInit {
  todoArray!: TodoList[];
  singleTodo!: TodoList;
  id!: any;
  completedList: TodoList[] = [];

  // id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(
    private router: ActivatedRoute,
    private todoService: TodoServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.id$);
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);
  }
  getTodoById(id: any) {
    this.singleTodo = this.todoService.getCompleted(id);
  }
  deleteCompletedTodo(todo: TodoList) {
    const storedData = localStorage.getItem('completedItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      console.log(List);
      this.completedList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== todo.id
      );
    }
    localStorage.setItem('completedItems', JSON.stringify(this.completedList));
    // location.reload();
    // window.location.replace('/todos');
    this.route.navigateByUrl('/todos');
  }
}
