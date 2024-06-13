import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-10px)' }),
          stagger('100ms', [
            animate('2000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class GridComponent {
  @Input() books: any[] = [];
  @Input() displayedColumns: string[] = [];
  
  constructor(private router: Router) { }

  goToBookDetail(title: string): void {
    this.router.navigate(['/book-detail', title]);
  }
}
