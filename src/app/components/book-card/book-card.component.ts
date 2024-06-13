import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input()
  book!: Book;

  constructor(private router: Router) { }

  goToBookDetail(title: string): void {
    this.router.navigate(['/book-detail', title]);
  }
}
