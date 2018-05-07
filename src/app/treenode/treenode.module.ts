import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { TreenodeComponent } from './treenode.component';

import { TreenodeService } from '../services/treenode.service'

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
    TreenodeService
  ]
})

export class TreenodeModule {}

