import { act, render } from "@testing-library/react";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import ListContribute from "..";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  getThreeTopBook: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Contribute Three Top Book", () => {
  const mockThreeTopBook = DATA_BOOKS.sort((a, b) => {
    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  }).slice(0, 3);

  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: DATA_USER[0],
    },
    status: "authenticated",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);

    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
    jest.spyOn(utils, "getThreeTopBook").mockReturnValue(mockThreeTopBook);
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(
        <ListContribute list={DATA_BOOKS} user={DATA_USER[0]} />
      );
      expect(container).toMatchSnapshot();
    });
  });

  it("Should render correctly snapshot when error", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { container } = render(
        <ListContribute list={DATA_BOOKS} user={DATA_USER[0]} />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
