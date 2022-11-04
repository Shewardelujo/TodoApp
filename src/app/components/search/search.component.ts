import { Component, OnInit } from '@angular/core';
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

  searchedTodoItems: TodoList[] = [];
  searchedCompletedItems: TodoList[] = [];

  noCompletedResult: TodoList[] = [];
  noTodoResult: TodoList[] = [];
  noResult: TodoList[] = [];

  constructor() {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      this.todoList = JSON.parse(storedData);
    }
    const completedData = localStorage.getItem('completedItems');
    if (completedData != null) {
      this.completedList = JSON.parse(completedData);
    }
  }

  todoSearch(event: any) {
    this.form.searchInput = event.target.value;
    const storedTodoData = localStorage.getItem('todoItems');
    if (storedTodoData != null) {
      const List = JSON.parse(storedTodoData);
      this.searchedTodoItems = List.filter((eachTodo: TodoList) =>
        eachTodo.title.includes(this.form.searchInput)
      );
      this.noTodoResult = List.filter(
        (eachTodo: TodoList) => !eachTodo.title.includes(this.form.searchInput)
      );
    }
    const storedCompletedData = localStorage.getItem('completedItems');
    if (storedCompletedData != null) {
      const List = JSON.parse(storedCompletedData);
      this.searchedCompletedItems = List.filter((eachTodo: TodoList) =>
        eachTodo.title.includes(this.form.searchInput)
      );
      this.noCompletedResult = List.filter(
        (eachTodo: TodoList) => !eachTodo.title.includes(this.form.searchInput)
      );
    }
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
    const updatedTodo = { ...todo, status: !todo.status };
    const storedData = localStorage.getItem('todoItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      this.todoList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.completedList.push(updatedTodo);
    }
    localStorage.setItem('completedItems', JSON.stringify(this.completedList));
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));

    this.searchedCompletedItems.push(updatedTodo);
    this.searchedTodoItems = this.searchedTodoItems.filter(
      (todo) => todo.id !== updatedTodo.id
    );
  }
  onStatusUnchecked(todo: TodoList) {
    const updatedTodo = { ...todo, status: !todo.status };
    const storedData = localStorage.getItem('completedItems');
    if (storedData != null) {
      const List = JSON.parse(storedData);
      this.completedList = List.filter(
        (eachTodo: TodoList) => eachTodo.id !== updatedTodo.id
      );
      this.todoList.push(updatedTodo);
    }
    localStorage.setItem('completedItems', JSON.stringify(this.completedList));
    localStorage.setItem('todoItems', JSON.stringify(this.todoList));

    this.searchedTodoItems.push(updatedTodo);
    this.searchedCompletedItems = this.searchedCompletedItems.filter(
      (todo) => todo.id !== updatedTodo.id
    );
  }
}
