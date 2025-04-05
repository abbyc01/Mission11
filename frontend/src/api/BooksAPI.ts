import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_Url =
  'hhttps://onlinebookstore-cummings-backend.azurewebsites.net/api/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_Url}?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while fetching books');
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred while fetching books:', error);
    throw error;
  }
};

export const addBook = async (newbook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_Url}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newbook),
    });

    if (!response.ok) {
      throw new Error('An error occurred while adding the book');
    }

    return await response.json();
  } catch (error) {
    console.error('An error occurred while adding the book:', error);
    throw error;
  }
};

export const UpdateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_Url}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('An error occurred while updating the book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_Url}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('An error occurred while deleting the book');
    }
  } catch (error) {
    console.error('An error occurred while deleting the book:', error);
    throw error;
  }
};
