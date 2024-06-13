import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {

  private apiUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  /**
   * Cargamos un listado paginado de libros de misterio, con un limite fijo de 12 elementos por página
   * @param page 
   * @returns 
   */
  getMysteryBooks(page: number, pageSize: number): Observable<{ books: Book[], total: number }> {
    const offset = (page - 1) * pageSize;

    return this.http.get<any>(`${this.apiUrl}/subjects/mystery.json?limit=${pageSize}&offset=${offset}`).pipe(
      map(response => {
        const books = response.works.map((work: any) => {
          return new Book({
            title: work.title,
            author_name: work.authors.map((author: any) => author.name),
            first_publish_year: work.first_publish_year,
            description: work.description,
            publisher: work.publisher,
            number_of_pages: work.number_of_pages
          });
        });
        const total = response.work_count; // Asumiendo que la API proporciona el número total de libros
        return { books, total };
      })
    );
  }

  /**
   * Cargamos los datos de un libro por su título, obteniendo solo el primer resultado
   * @param title 
   * @returns 
   */
  getBookDetails(title: string): Observable<Book> {
    return this.http.get<any>(`${this.apiUrl}/search.json?q=${title}&limit=1`).pipe(
      map(response => {
        const bookData = response.docs[0];
        return new Book({
          title: bookData.title,
          author_name: bookData.author_name,
          first_publish_year: bookData.first_publish_year,
          description: bookData.description,
          publisher: bookData.publisher,
          number_of_pages: bookData.number_of_pages
        });
      })
    );
  }
}
