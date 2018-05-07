import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';

import { TreenodeService } from '../services/treenode.service'

declare var Papa: any;
@Component({
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.scss'],
})
export class TreenodeComponent implements OnInit {
  @ViewChild('tree') tree: TreeComponent
  nodes = [];
  name;
  amount = 0;
// addroot: determine whether the node is added from the root
  addroot = false;
  options = {
     displayField: 'display'
  };

  constructor(
    private service: TreenodeService
  ) {}

  ngOnInit() {
    let treemodel = this.tree.treeModel;
    let txt = '';
    let xmlhttp = new XMLHttpRequest();
// Read from local csv file, clean the data and calculate the amount
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
        txt = xmlhttp.responseText;
        let result = Papa.parse(txt, {
           header: true
        });
        result = this.service.prepare(result.data);
        let treenode = this.service.list_to_tree(result);
        this.nodes = this.service.calculate(treenode);
        treemodel.update();
      }
    };
    xmlhttp.open('GET', 'sampledata.csv', true);
    xmlhttp.send();
  }

  delete() {

   let treemodel = this.tree.treeModel;
   let node = treemodel.getActiveNode();

   if (node !== undefined) {
     let Index = node.index;
     let Parent = node.parent;
     let Children = Parent.getField('children');
     Children.splice(Index, 1);
     this.nodes = this.service.calculate(this.nodes);
     treemodel.update();
   } else {
     alert('Please select a node first!');
   }

  }

  addtoRoot() {
    this.addroot = true;
  }

  add() {
    let treemodel = this.tree.treeModel;
    let node = treemodel.getActiveNode();

    if (this.addroot === true) {
      node = treemodel.virtualRoot;
      this.addroot = false;
    }

    if (node === undefined) {
      alert('Please select a node first or add it as root node!');
      return;
    }

    if (!node.getField('children')) {
      node.setField('children', []);
    }
    let children = node.getField('children');
    children.push({
      name: this.name,
      amount: Number(this.amount),
      children: []
    })

   this.nodes = this.service.calculate(this.nodes);
   treemodel.update();

  }

}
