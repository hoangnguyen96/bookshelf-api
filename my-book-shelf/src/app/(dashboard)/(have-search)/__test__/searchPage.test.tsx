import { act, fireEvent, render } from "@testing-library/react";
import SearchPage from "../search/(main)/page";
import { useSession } from "next-auth/react";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import { BookType } from "@app/models";
import { getAllBook, getUserById } from "@app/api";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  dividePaginationBooks: jest.fn(),
}));

describe("Search Page", () => {
  const mockBooksPagination = DATA_BOOKS.reduce(
    (acc: BookType[][], _, i, self) => {
      if (!(i % 12)) {
        return [...acc, self.slice(i, i + 12)];
      }
      return acc;
    },
    []
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
    jest
      .spyOn(utils, "dividePaginationBooks")
      .mockReturnValue(mockBooksPagination);
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<SearchPage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle update favorite book", async () => {
    const { findAllByTestId } = render(<SearchPage />);

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });
});
