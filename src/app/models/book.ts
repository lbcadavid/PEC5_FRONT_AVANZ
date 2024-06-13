export class Book {
    title: string;
    author_name: string[];
    first_publish_year: number;
    description: string;
    publisher: string;
    number_of_pages: number;
  
    constructor(data: any) {
      this.title = data.title;
      this.author_name = data.author_name;
      this.first_publish_year = data.first_publish_year;
      this.description = data.description || 'Descripción no disponible';
      this.publisher = data.publisher || 'Editorial no disponible';
      this.number_of_pages = data.number_of_pages || 0;
    }
  }
