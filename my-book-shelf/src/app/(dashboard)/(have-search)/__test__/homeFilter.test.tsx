import { render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getAllBook, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import HomePage from "../home/[...slug]/page";

jest.mock("@app/api", () => ({
  getAllBook: jest.fn(),
  getBookByParams: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Search Params", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);
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
  });

  it("should render correctly and match snapshot", async () => {
    const { container } = render(
      <HomePage params={{ slug: ["title", "on"] }} />
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
