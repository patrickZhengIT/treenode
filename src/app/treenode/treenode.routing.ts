import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TreenodeComponent } from './treenode.component';

const treenodeRoutes: Routes = [
  { path: 'treenode', component: TreenodeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(treenodeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TreenodeRoutingModule { }

