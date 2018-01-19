import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('tree') tree:TreeComponent
  nodes = [];


  name;
  amount = 0;

  options = {

     displayField: 'display'

   };

  constructor() {

  }

  ngOnInit() {
    let treemodel = this.tree.treeModel;

    // this.nodes.push({
    //   id: 1,
    //   name: 'p',
    //   amount: 41
    // });

    // treemodel.update();
    let entries = [
        {
            'id': 1,
            'parentId': 1,
            'name': 'Man',
            'amount': 21
        },
         {
            'id': 2,
            'parentId': 1,
            'name': 'Woman',
            'amount': 30 },
        {
           'id': 3,
           'parentId' : 1,
           'name': 'rank',
           'amount': 9
        },
        {
          'id': 4,
          'parentId' : 2,
          'name': 'patrick',
          'amount': 7
        },
        {
          'id': 5,
          'parentId': 2,
          'name': 'stella',
          'amount': 28
        }

    ];

    let treenode = this.list_to_tree(entries);

    this.nodes = this.calculate(treenode);

    treemodel.update();
    //console.log(treemodel);
  }

  delete() {

   let treemodel = this.tree.treeModel;
   let node = treemodel.getActiveNode();
   let Index = node.index;
   let Parent = node.parent;
   let Children = Parent.getField('children');
   Children.splice(Index, 1);

   console.log(this.nodes);
   this.nodes = this.calculate(this.nodes);
   treemodel.update();

   // Parent.treeModel.update();


 //  treemodel.update();
   //console.log(treemodel.getNodeById(1).getField('level'));

  }

  add(){
    let treemodel = this.tree.treeModel;
    let node = treemodel.getActiveNode();
    if (!node.getField('children')) {
      node.setField('children', []);
    }
    let children = node.getField('children');
    children.push({
      name: this.name,
      amount: Number(this.amount),
      children: []
    })


    // console.log(this.nodes);
   this.nodes = this.calculate(this.nodes);
   treemodel.update();
   // node.treeModel.update();



  }

  calculate(nodes){
    let i;

    for (i=0; i < nodes.length; i +=1){
       nodes[i] = this.calculatenode(nodes[i]);
    }

    return nodes;
  }

  calculatenode(node){
    let j,k=0;
    if (node.children.length!==0){

      for (j = 0; j < node.children.length; j++){
        node.children[j] = this.calculatenode(node.children[j])
        k = k + node.children[j].amount;
      }
      node.amount = k;
      node.display = node.name + ' ' + node.amount;
    } else{
      node.display = node.name + ' ' + node.amount;
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
        if (node.parentId !== node.id) {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parentId]].children.push(node);
          } else {
            roots.push(node);
          }
    }
      return roots;
  }


}
