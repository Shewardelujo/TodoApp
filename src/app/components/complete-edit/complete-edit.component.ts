import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';
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
  constructor(
    private router: ActivatedRoute,
    private todoService: TodoServiceService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTodoById(this.id);
    const storedData = localStorage.getItem('completedItems');
    if (storedData != null) {
      this.todoList = JSON.parse(storedData);
      console.log(this.todoList);
    }
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
        return { ...this.form, id: this.id };
      }
      return todo;
    });

    localStorage.setItem('completedItems', JSON.stringify(updatedArray));
    window.location.replace('/todos');
  }
}
