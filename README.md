# tree-node

The project is to demonstrate my coding style, as well as my understanding of programming.

The application would load data from local csv file, display the data with tree component, and it also allows user to add/remove the node with strict form validation.

The application is built with Angular5. And 'angular-tree-component' (https://github.com/500tech/angular-tree-component) is used for displaying the tree. 

# Table of Contents

* [Requirement of the project](#requirement)
* [Description of the project](#description)
  * [Node Display](#node-display)
  * [Node Management](#node-management)
* [Assumptions](#assumptions)
* [Install instruction](#install-instruction)
 
#Requirement:
1. The csv file contains 1000 row of a tree structure data.
2. The application should read and display the data using a tree component. 
3. Each row contains a `amount` value. Display the information on screen. Parent tree node should show the sum of all children. (PLEASE NOTE:`amount` value for parent node is incorrect in the csv file, the application will need to recalculate it.)
4. The application should also allow user to add or remove a tree node.

# Description

After running the application, the html will show two areas. The top is related to node management functions, and the below is related to node displaying functions.

## Node Display

All the nodes are displayed in a tree component. You can click on a root node to see its childen. The screen will show the name of the code along with the amount of it. The amount shows two digits after the decimal point.

## Node Management

### Add node

The screen will tell you to enter the name and the amount of the new node. There are two ways of adding the node. First, you could first select a node in the node displaying area below, enter the name and amount, then add it as a child note to the selected node. Note that if you have not selected any node, there will be an alert to tell you to select a node. Second, you could add the node as a root node. In this way, you do not need to select a node first.

After adding the node, the amounts of the all nodes will be recalculated instantly. 

### Delete node

Once you select a node in the node displaying area, you could use the button to delete the node. If no node is currently selected, there will be an alert to tell you to select a node. 

After deleting the node, the amounts of all nodes will be recalculated spontaneously. 

### Form validation

The name and amount field have strict validations.

The name should not be empty. The label will show green if the requirement is met. If not, the label will remain red. After editing the name, if the name is empty, there will be alerts showing in the below.

The amount field is 0 by default. Only postive numbers and 0 are allowed in this field. 

For example, '84', '8.4', '034' are all acceptable. ('034' is equal to 34)

Whereas 'g84', 'good', '8.', '-8' are not acceptable, and there will be an alert showing below.

# Assumptions

Here I assume the application is used by people to view the amount and the value of the node, and may add/remove a node to see how it affects the whole nodes. So the system is designed that people could select the node intuitively from the view and do the operations, instead of entering the info like 'adding a node whose parent id is 1'. The amount value will be instantly recalculated so people could see the impact. 

Also, I assume the name of the node should not be empty and the amount of the node is a positive number or 0. And nodes with same name or amount are allowed.

I tried my best for the design of the project, but there may still be some improvements.  

# Install instruction

What you need to run this app:
* `node` and `npm` 
* Ensure you're running Node (`v6.x.x`+) and NPM (`3.x.x`+)

## Installing

```bash
# install the dependencies with npm
$ npm install

# start the server
$ npm start
```
It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:8080`.














