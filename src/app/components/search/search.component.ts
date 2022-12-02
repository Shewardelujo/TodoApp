import { Component, OnInit } from '@angular/core';
import { TryBehaviorSubjectService } from 'src/app/services/try-behavior-subject-service.service';
import { TodoList } from '../todo-list/todo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  form = { searchInput: '' };
  todoList!: TodoList[];
  completedList!: TodoList[];
  hideList: boolean = false;

  timeUp!: Date;

  searchedTodoItems: TodoList[] = [];
  searchedCompletedItems: TodoList[] = [];

  noCompletedResult: TodoList[] = [];
  noTodoResult: TodoList[] = [];
  noResult: TodoList[] = [];

  constructor(private TryBehaviorSubject: TryBehaviorSubjectService) {}

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

  todoSearch(event: any) {
    let storedTodoData: TodoList[] = [];
    this.form.searchInput = event.target.value;
    this.TryBehaviorSubject.getTodoList.subscribe(
      (res) => (storedTodoData = res)
    );

    this.searchedTodoItems = storedTodoData.filter((eachTodo: TodoList) =>
      eachTodo.title.includes(this.form.searchInput)
    );
    this.noTodoResult = storedTodoData.filter(
      (eachTodo: TodoList) => !eachTodo.title.includes(this.form.searchInput)
    );

    let storedCompletedData: TodoList[] = [];

    this.TryBehaviorSubject.getCompletedList.subscribe(
      (res) => (storedCompletedData = res)
    );

    this.searchedCompletedItems = storedCompletedData.filter(
      (eachTodo: TodoList) => eachTodo.title.includes(this.form.searchInput)
    );
    this.noCompletedResult = storedCompletedData.filter(
      (eachTodo: TodoList) => !eachTodo.title.includes(this.form.searchInput)
    );

    this.noResult = this.noTodoResult.concat(this.noCompletedResult);

    if (
      this.searchedTodoItems.length == 0 &&
      this.searchedCompletedItems.length == 0
    ) {
      this.hideList = !this.hideList;
    }
    if (this.form.searchInput.length == 0) {
      this.searchedTodoItems = [];
      this.searchedCompletedItems = [];
    }
  }

  onStatusChecked(todo: TodoList) {
    let storedData: TodoList[] = [];

    const updatedTodo = { ...todo, status: !todo.status };
    this.TryBehaviorSubject.getTodoList.subscribe((res) => (storedData = res));

    this.todoList = storedData.filter(
      (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
    );
    this.completedList.push(updatedTodo);

    this.TryBehaviorSubject.setTodoList(this.todoList);
    this.TryBehaviorSubject.setTodoList(this.completedList);

    this.searchedCompletedItems.push(updatedTodo);
    this.searchedTodoItems = this.searchedTodoItems.filter(
      (todo) => todo.id !== updatedTodo.id
    );
  }
  onStatusUnchecked(todo: TodoList) {
    let storedData: TodoList[] = [];

    const updatedTodo = { ...todo, status: !todo.status };
    this.TryBehaviorSubject.getTodoList.subscribe((res) => (storedData = res));

    this.completedList = storedData.filter(
      (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
    );
    this.todoList.push(updatedTodo);

    this.TryBehaviorSubject.setTodoList(this.todoList);
    this.TryBehaviorSubject.setTodoList(this.completedList);

    this.searchedTodoItems.push(updatedTodo);
    this.searchedCompletedItems = this.searchedCompletedItems.filter(
      (todo) => todo.id !== updatedTodo.id
    );
  }
}
