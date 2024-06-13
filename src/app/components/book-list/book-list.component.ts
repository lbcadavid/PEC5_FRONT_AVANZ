import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenLibraryService } from '../../services/open-library.service';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { Book } from '../../models/book';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
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
export class BookListComponent implements OnInit {
  books: Book[] = [];
  viewMode: string = 'card';
  displayedColumns: string[] = ['title', 'authors', 'first_publish_year'];
  pageSize = 15;
  currentPage = 0;
  totalBooks = 0;

  loading: boolean = true;

  constructor(
    private openLibraryService: OpenLibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMysteryBooks(this.currentPage + 1, this.pageSize);

  }

  loadMysteryBooks(page: number, pageSize: number): void {

    this.loading = true;
    this.openLibraryService.getMysteryBooks(page, pageSize).subscribe(
      response => {
        this.books = response.books;
        this.totalBooks = response.total;
        this.loading = false;
      },
      error => {
        console.error('Error loading mystery books:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMysteryBooks(this.currentPage + 1, this.pageSize);
  }

  toggleViewMode(mode: 'card' | 'table'): void {
    this.viewMode = mode;
    this.loadMysteryBooks(this.currentPage + 1, this.pageSize);
  }

  goToBookDetail(title: string): void {
    this.router.navigate(['/book-detail', title]);
  }
}