import { act, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ContributeList from "../contribute-list/page";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
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
}));

describe("Contribute List Page", () => {
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
    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<ContributeList />);
      expect(container).toMatchSnapshot();
    });
  });
});
