import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';

import { TreenodeService } from '../services/treenode.service'

import * as _ from 'lodash';
@Component({
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.scss'],
})
export class TreenodeComponent implements OnInit {
  @ViewChild('tree') tree: TreeComponent
  readonly treenodeOptions = {
    displayField: 'display'
  };
  nodes = [];
  treemodel;
  options;

  constructor(
    private service: TreenodeService
  ) {}

  ngOnInit() {
    this.treemodel = this.tree.treeModel;
    this.options = this.treenodeOptions;
    this.service.getData().subscribe( data => {
      this.nodes = data;
      this.treemodel.update();
    });
  }

  delete() {
    let node = this.treemodel.getActiveNode();

    if (node !== undefined) {
      let Children = _.get(node, 'parent').getField('children');
      Children.splice(_.get(node, 'index'), 1);
      this.nodes = this.service.calculate(this.nodes);
      this.treemodel.update();
   } else {
      alert('Please select a node first!');
   }
  }

  add(data) {
    let node = this.treemodel.getActiveNode();
    let addroot = _.get(data, 'addroot');

    if (addroot === true) {
      node = _.get(this.treemodel, 'virtualRoot');
    }

    if (node === undefined) {
      alert('Please select a node first or add it as root node!');
      return;
    }

    if (!node.getField('children')) {
      node.setField('children', []);
    }

    node.getField('children').push({
      name: _.get(data, 'name'),
      amount: _.get(data, 'amount'),
      children: []
    })

   this.nodes = this.service.calculate(this.nodes);
   this.treemodel.update();
  }
}
