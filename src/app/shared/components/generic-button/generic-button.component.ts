import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-button[callback]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericButtonComponent implements OnInit {
  @Input() action: string = 'Unkown Action';
  @Input() callback!: (...arg: any) => any;
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  btnClass = '';

  ngOnInit(): void {
      this.btnClass = `btn-${this.type}.${this.size}`;
  }

  onClick(): void {
    this.callback();
  }
}
