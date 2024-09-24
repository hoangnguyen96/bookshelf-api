import { BookType } from "@app/models";
import { API_ROUTES } from "@app/constants";
import { api } from "@app/services";
import { dividePaginationBooks } from "@app/utils";

export const getAllBook = async () => {
  try {
    const data = await api.get<BookType[]>(API_ROUTES.BOOKS);

    return data;
  } catch (error) {
    return [];
  }
};

export const getPaginatedBook = async () => {
  try {
    const data = await api.get<BookType[]>(API_ROUTES.BOOKS);
    const result = dividePaginationBooks(data);

    return result;
  } catch (error) {
    return [];
  }
};

export const getTwelveItemBook = async (params?: string) => {
  try {
    const data = await api.get<BookType[]>(
      `${API_ROUTES.BOOKS}?${params || ""}page=1&limit=12`
    );

    return data;
  } catch (error) {
    return [];
  }
};

export const getBookByParams = async (params: string) => {
  try {
    const data = await api.get<BookType[]>(`${API_ROUTES.BOOKS}?${params}`);

    return data;
  } catch (error) {
    return [];
  }
};

export const getBookById = async (id: string) => {
  try {
    const data = await api.get<BookType>(`${API_ROUTES.BOOKS}/${parseInt(id)}`);

    return data;
  } catch (error) {
    return [];
  }
};

export const addBook = async (payload: Partial<BookType>) => {
  return await api.post(API_ROUTES.BOOKS, payload);
};

export const updateBookById = async (
  id: string,
  payload: Partial<BookType>
) => {
  return await api.put(`${API_ROUTES.BOOKS}/${id}`, payload);
};

export const deleteBook = async (id: string) => {
  return await api.delete(`${API_ROUTES.BOOKS}/${id}`);
};
