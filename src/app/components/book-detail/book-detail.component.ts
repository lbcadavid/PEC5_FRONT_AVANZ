import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenLibraryService } from '../../services/open-library.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private openLibraryService: OpenLibraryService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.openLibraryService.getBookDetails(title).subscribe(
        book => {
          this.book = book;
        },
        error => {
          console.error('Error cargando los detalles:', error);
        }
      );
    } else {
      console.error('El titulo no existe como parametro');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
