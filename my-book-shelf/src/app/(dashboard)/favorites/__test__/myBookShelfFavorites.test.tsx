import { render, waitFor } from "@testing-library/react";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import MyBookShelfFavorites from "../page";
import { auth } from "@app/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  filterBooksFavorite: jest.fn(),
  filterBooksFavoriteByParams: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
  const mockSearchParams = { title: "on" };
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].favorites.includes(item.id)
  );
  const mockBooksByParams = mockBooks.filter((book) =>
    book.title.includes("on")
  );
  const mockSession = {
    user: {
      isAdmin: true,
      email: "admin@gmail.com",
      id: "3733403",
      name: "admin",
      image: "https://i.ibb.co/RHMqQGr/man-1.png",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
    jest.spyOn(utils, "filterBooksFavorite").mockReturnValue(mockBooks);
    jest
      .spyOn(utils, "filterBooksFavoriteByParams")
      .mockReturnValue(mockBooksByParams);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(
      await MyBookShelfFavorites({ searchParams: mockSearchParams })
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should render correctly snapshot when user has no favorites", async () => {
    (getUserById as jest.Mock).mockResolvedValue({
      data: { ...DATA_USER[0], favorites: null },
    });

    const { container } = render(
      await MyBookShelfFavorites({ searchParams: {} })
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
