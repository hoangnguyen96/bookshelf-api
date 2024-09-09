import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import HomePage from "../home/page";
import { getAllBook, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";

jest.mock("@app/api", () => ({
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

describe("HomePage", () => {
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
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", () => {
    expect(render(<HomePage />)).toMatchSnapshot();
  });
});
