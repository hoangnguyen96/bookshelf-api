import { act, fireEvent, render } from "@testing-library/react";
import MyBookShelfFavorites from "../my-book-shelf/(main)/favorites/page";
import { useSession } from "next-auth/react";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import { getAllBook, getBookById, getUserById } from "@app/api";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
  getBookById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  filterBooksFavorite: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].favorites.includes(item.id)
  );

  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
    },
    status: "authenticated",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(utils, "filterBooksFavorite").mockReturnValue(mockBooks);
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
    (getBookById as jest.Mock).mockReturnValue({
      data: mockBooks[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<MyBookShelfFavorites />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle favorite book", async () => {
    const { findAllByTestId } = render(<MyBookShelfFavorites />);

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });
});
