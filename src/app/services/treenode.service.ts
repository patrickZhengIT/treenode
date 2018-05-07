import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class TreenodeService {

  prepare(array) {
// It appears that after reading, the last element is not valid, so here deletes the last element of the array
    array = _.dropRight(array);
// Clean the data, change the type of the data from string to number
    _.each(array, data => {
      data.amount = _.toNumber(_.get(data, 'amount'));
      data.id = _.toNumber(_.get(data, 'id'));
      data.parent_id = _.toNumber(_.get(data, 'parent_id'));
    });
    return array;
  }

  calculate(nodes) {
    _.each(nodes, node => node = this.calculatenode(node));
    return nodes;
  }

  calculatenode(node) {
    let k = 0;

    if (_.get(node, 'children.length') !== 0) {
      _.each(node.children, data => {
        data = this.calculatenode(data);
        k = k + _.get(data, 'amount');
      })
      node.amount = k;
// Use toFixed() so that the screen does not display strange number
      node.display = _.get(node, 'name') + ' ' + _.get(node, 'amount').toFixed(2);
    } else {
      node.display = _.get(node, 'name') + ' ' + _.get(node, 'amount').toFixed(2);
    }

    return node;
  }

  list_to_tree(list) {
    let map = {}, node, roots = [];

    _.each(list, (data, index) => {
      map[_.get(data, 'id')] = index; // initialize the map
      data.children = []; // initialize the children
    });

    _.each(list, data => {
      node = data;
      if (_.get(node, 'parent_id') !== _.get(node, 'id')) {
        // Push the node according to the map
        list[map[_.get(node, 'parent_id')]].children.push(node);
      } else {
          roots.push(node);
      }
    });
    return roots;
  }
}
