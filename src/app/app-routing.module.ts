import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/todoList', pathMatch: 'full' },
  { path: 'todoList', component: TodoListComponent },
  { path: 'todoList/viewPage/:id', component: TodoDetailComponent },
  { path: 'todoList/editPage/:id', component: TodoEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
