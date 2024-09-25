import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import HomePage from "../page";

jest.mock("@app/features/dashboard/actions", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  getTwelveItemData: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("HomePage", () => {
  const mockBooks = DATA_BOOKS.slice(0, 12);

  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
      expires: "2024-12-31T23:59:59.999Z",
    },
    status: "authenticated",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      favorites: DATA_USER[0].favorites,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<HomePage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle fetch data failed", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle update favorite", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      favorites: ["3", "2", "1", "13", "5"],
    });
    const { findAllByTestId } = render(<HomePage />);

    const buttons = await findAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite when id null", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      favorites: [],
    });
    const { findAllByTestId } = render(<HomePage />);

    const buttons = await findAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });
});