import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { TryBehaviorSubjectService } from 'src/app/services/try-behavior-subject-service.service';
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
    this.singleTodo = this.todoService.getCompleted(id);
  }
  deleteCompletedTodo(todo: TodoList) {
    let storedData!: TodoList[];

    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (storedData = res)
    );

    this.completedList = storedData.filter(
      (eachTodo: TodoList) => eachTodo.id !== todo.id
    );
    this.TryBehaviorSubject.setCompletedList(this.completedList);
    // location.reload();
    this.route.navigateByUrl('/todos');
  }
}
