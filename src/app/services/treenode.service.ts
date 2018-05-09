import { Injectable } from '@angular/core';
import { TreenodeApiService } from './treenodeApi.service';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';

declare var Papa: any;
@Injectable()
export class TreenodeService {

  constructor(private apiService: TreenodeApiService) {}

  getData() {
    // Read from local csv file, clean the data and calculate the amount
    return this.apiService.getData()
    .pipe(
      map( data => Papa.parse(data, {header: true})),
      map( data => this.prepare(data.data)),
      map( data => this.list_to_tree(data)),
      map( data => this.calculate(data))
    );
  }

  prepare(array) {
// It appears that after reading, the last element is not valid, so here deletes the last element of the array
    array = _.dropRight(array);
// Clean the data, change the type of the data from string to number
    _.each(array, data => {
      _.forOwn(data, (value, key) => {
        if (key !== 'name') {
          data[key] = _.toNumber(value);
        }
      })
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
    }

    node.display = _.get(node, 'name') + ' ' + _.get(node, 'amount').toFixed(2);

    return node;
  }

  list_to_tree(list) {
    let localMap = {}, node, roots = [];

    _.each(list, (data, index) => {
      localMap[_.get(data, 'id')] = index; // initialize the map
      data.children = []; // initialize the children
    });

    _.each(list, data => {
      node = data;
      if (_.get(node, 'parent_id') !== _.get(node, 'id')) {
        // Push the node according to the map
        list[localMap[_.get(node, 'parent_id')]].children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}
