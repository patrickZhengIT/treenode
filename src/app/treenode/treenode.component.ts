import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';

declare var Papa: any;
@Component({
  selector: 'my-app', // <my-app></my-app>
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
        result = this.prepare(result.data);
        let treenode = this.list_to_tree(result);
        this.nodes = this.calculate(treenode);
        treemodel.update();
      }
    };
    xmlhttp.open('GET', 'sampledata.csv', true);
    xmlhttp.send();
  }

  prepare(array) {
    let i;
// It appears that after reading, the last element is not valid, so here deletes the last element of the array
    array.splice(array.length - 1, 1);
// Clean the data, change the type of the data from string to number
    for (i = 0; i < array.length; i++) {
      array[i].amount = Number(array[i].amount);
      array[i].id = Number(array[i].id);
      array[i].parent_id = Number(array[i].parent_id);
    }
    return array;
  }

  delete() {

   let treemodel = this.tree.treeModel;
   let node = treemodel.getActiveNode();

   if (node !== undefined) {
     let Index = node.index;
     let Parent = node.parent;
     let Children = Parent.getField('children');
     Children.splice(Index, 1);
     this.nodes = this.calculate(this.nodes);
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

   this.nodes = this.calculate(this.nodes);
   treemodel.update();

  }

  calculate(nodes) {
    let i;

    for (i = 0; i < nodes.length; i += 1 ) {
       nodes[i] = this.calculatenode(nodes[i]);
    }

    return nodes;
  }

  calculatenode(node) {
    let j, k = 0;
    if (node.children.length !== 0) {

      for (j = 0; j < node.children.length; j++) {
        node.children[j] = this.calculatenode(node.children[j])
        k = k + node.children[j].amount ;
      }
      node.amount = k;
// Use toFixed() so that the screen does not display strange number
      node.display = node.name + ' ' + node.amount.toFixed(2);
    } else {
      node.display = node.name + ' ' + node.amount.toFixed(2);
    }

    return node;

  }




  list_to_tree(list) {
    let map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
        if (node.parent_id !== node.id) {
          // Push the node according to the map
          list[map[node.parent_id]].children.push(node);
          } else {
            roots.push(node);
          }
    }
      return roots;
  }


}
