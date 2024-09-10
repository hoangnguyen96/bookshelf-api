import { act, fireEvent, render } from "@testing-library/react";
import MyBookShelfAll from "../my-book-shelf/(main)/page";
import { useSession } from "next-auth/react";
import { getAllBook, getBookById, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import * as utils from "@app/utils";

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
  updateBookById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  filterBooksOnShelf: jest.fn(),
}));

describe("My Book Shelf All", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
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
    jest.spyOn(utils, "filterBooksOnShelf").mockReturnValue(mockBooks);
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
      const { container } = render(<MyBookShelfAll />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle return book", async () => {
    const { findAllByTestId } = render(<MyBookShelfAll />);

    const buttons = await findAllByTestId("return-book");

    fireEvent.click(buttons[0]);

    expect(getBookById).toHaveBeenCalledWith(mockBooks[0].id.toString());
  });
});
