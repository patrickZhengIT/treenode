import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-node-manage',
  templateUrl: './treenodeManage.component.html',
  styleUrls: ['./treenodeManage.component.scss'],
})
export class TreenodeManageComponent {
  @Output() onDelete = new EventEmitter();
  @Output() onAdd = new EventEmitter<any>();
  addroot = false;
  name;
  amount = 0;

  constructor() {}

  addtoRoot() {
    this.addroot = true;
  }

  add() {
    this.onAdd.emit({
      name: this.name,
      amount: Number(this.amount),
      addroot: this.addroot
    });
    this.addroot = false;
  }

  delete() {
    this.onDelete.emit();
  }

}
