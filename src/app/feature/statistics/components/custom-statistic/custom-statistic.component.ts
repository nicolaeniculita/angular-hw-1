import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-statistic',
  templateUrl: './custom-statistic.component.html',
  styleUrls: ['./custom-statistic.component.scss'],
  standalone: false,
})
export class CustomStatisticComponent {
  @Input() public label!: string;
  @Input() public value!: string | number;
  @Input() public icon?: string;
  @Input() public subtext?: string;
}
