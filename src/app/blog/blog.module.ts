import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { UpsertComponent } from './components/upsert/upsert.component';
import { DetailComponent } from './components/detail/detail.component';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    UpsertComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BlogModule { }
