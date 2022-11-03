import { SearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CompleteEditComponent } from './components/complete-edit/complete-edit.component';
import { CompleteDetailComponent } from './components/complete-detail/complete-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/view-todo/:id', component: TodoDetailComponent },
  { path: 'todos/edit-todo/:id', component: TodoEditComponent },
  { path: 'todos/edit-completed/:id', component: CompleteEditComponent },
  { path: 'todos/view-completed/:id', component: CompleteDetailComponent },
  { path: 'search-todo', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
