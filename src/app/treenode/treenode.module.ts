import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TreenodeComponent } from './treenode.component';
import { TreeModule } from 'angular-tree-component';

import { TreenodeRoutingModule } from './treenode.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    TreenodeRoutingModule
  ],
  declarations: [
    TreenodeComponent
  ],
  providers: [

  ]
})

export class TreenodeModule {}

