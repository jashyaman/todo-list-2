import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  title: string;
  completed: boolean;
}

interface TaskGroup {
  name: string;
  items: TodoItem[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  
  taskGroups: TaskGroup[] = [];
  newTaskGroup: string = '';
  newItemTitle: string = '';
  selectedGroup: TaskGroup | null = null;


  ngOnInit() {
    this.loadTaskGroups();
  }

  loadTaskGroups() {
    const storedGroups = localStorage.getItem('taskGroups');
    if (storedGroups) {
      this.taskGroups = JSON.parse(storedGroups);
    } else {
      this.taskGroups = [
        { name: 'Personal', items: [] },
        { name: 'Work', items: [] }
      ];
      this.saveTaskGroups();
    }
  }

  saveTaskGroups() {
    localStorage.setItem('taskGroups', JSON.stringify(this.taskGroups));
  }

  
  addTaskGroup() {
    this.taskGroups.push({ name: this.newTaskGroup, items: [] });
    this.saveTaskGroups();
  }

  addItem() {
    if(!this.selectedGroup) return;
    let groupIndex = this.taskGroups.map(g => g.name).indexOf(this.selectedGroup?.name);
    if(!this.newItemTitle) return;
    this.taskGroups[groupIndex].items.push({ title: this.newItemTitle, completed: false });
    this.saveTaskGroups();
    this.newItemTitle = "";
  }

  toggleComplete(item: TodoItem) {
    if(this.selectedGroup == null) return;
    let groupIndex = this.taskGroups.map(t => t.name).indexOf(this.selectedGroup?.name, 1)
    let itemIndex = this.taskGroups[groupIndex].items.map(i=>i.title).indexOf(item.title);
    this.taskGroups[groupIndex].items[itemIndex].completed = !this.taskGroups[groupIndex].items[itemIndex].completed;
    this.saveTaskGroups();
  }

  deleteGroup() {
    if(this.selectedGroup == null) return;
    let groupIndex = this.taskGroups.map(t => t.name).indexOf(this.selectedGroup?.name, 1)
    this.taskGroups.splice(groupIndex, 1);
    this.saveTaskGroups();
  }

  deleteItem(item: TodoItem) {
    if(this.selectedGroup == null) return;
    let groupIndex = this.taskGroups.map(t => t.name).indexOf(this.selectedGroup?.name, 1)
    let itemIndex = this.taskGroups[groupIndex].items.map(i=>i.title).indexOf(item.title);
    this.taskGroups[groupIndex].items.splice(itemIndex, 1);
    this.saveTaskGroups();
  }


  selectGroup(group: TaskGroup) {
    this.selectedGroup = group;
  }
}
