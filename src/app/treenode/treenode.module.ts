import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import { TreenodeComponent } from './treenode.component';
import { TreenodeManageComponent } from './treenodeManage.component';

import { TreenodeService } from '../services/treenode.service';
import { TreenodeApiService } from '../services/treenodeApi.service'
import { TreenodeRoutingModule } from './treenode.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    TreenodeRoutingModule
  ],
  declarations: [
    TreenodeComponent,
    TreenodeManageComponent
  ],
  providers: [
    TreenodeService,
    TreenodeApiService
  ]
})

export class TreenodeModule {}

