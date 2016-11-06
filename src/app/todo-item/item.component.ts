import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-item',
  template: `
    <div class="todo-item">
      <input class="todo-checkbox"
             type="checkbox"
             (click)="toggleCompleted()">
      
      <span class="todo-title"
            [hidden]="editing" 
            (click)="editItem()"
            [class.completed]="item.completed">{{ item.title }}</span>
      
      <todo-input [hidden]="!editing"
                  [title]="item.title"
                  (submit)="changeItemTitle($event)" (cancel)="cancelEdit($event)">               
      </todo-input>
      
      <button class="btn btn-red" (click)="removeItem()">
        remove
      </button>
    </div>
  `,
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Output() remove:EventEmitter<any> = new EventEmitter();
  @Output() changeTitle:EventEmitter<any> = new EventEmitter();

  private editing:boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  editItem() {
    this.editing = true;
  }

  changeItemTitle(newTitle) {
    this.editing = false;
    this.changeTitle.emit({
      item: this.item,
      newTitle
    });
  }

  cancelEdit() {
    this.editing = false;
  }

  toggleCompleted() {
    console.log('before: ' + this.item.completed);
    this.item.completed = !this.item.completed;
    console.log('after: ' + this.item.completed);
  }

}
