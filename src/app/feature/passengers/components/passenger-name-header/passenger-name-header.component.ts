import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NameSort } from '../../services/name-sort.type';

@Component({
  selector: 'app-passenger-name-header',
  templateUrl: './passenger-name-header.component.html',
  styleUrl: './passenger-name-header.component.scss',
  standalone: false,
})
export class PassengerNameHeaderComponent {
  @Input() sortState: NameSort = 'NONE';
  @Output() sortClicked = new EventEmitter<void>();

  public onClick(): void {
    this.sortClicked.emit();
  }

  public get label(): string {
    if (this.sortState === 'ASC') return 'Name ▲';
    if (this.sortState === 'DESC') return 'Name ▼';
    return 'Name';
  }
}