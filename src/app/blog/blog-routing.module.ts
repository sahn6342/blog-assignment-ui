import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { UpsertComponent } from './components/upsert/upsert.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    {
        path: '', component: ListComponent,
    },
    {
        path: 'create', component: UpsertComponent,
    },
    {
        path: 'edit/:id', component: UpsertComponent,
    },
    {
        path: ':id', component: DetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
