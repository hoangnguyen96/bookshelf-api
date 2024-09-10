import { render } from "@testing-library/react";
import Heading from "../my-book-shelf/@heading/page";
import { usePathname } from "next/navigation";
import { ROUTES } from "@app/constants";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Heading />)).toMatchSnapshot();
  });

  it("should underline 'All Books' when on MY_BOOK_SHELF route", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.MY_BOOK_SHELF);

    const { getByText } = render(<Heading />);

    const allBooksLink = getByText("All Books");
    const favoritesLink = getByText("Favorites");

    expect(allBooksLink).toHaveStyle("text-decoration: underline");
    expect(favoritesLink).toHaveStyle("text-decoration: none");
  });

  it("should underline 'Favorites' when on MY_BOOK_SHELF_FAVORITES route", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.MY_BOOK_SHELF_FAVORITES);

    const { getByText } = render(<Heading />);

    const allBooksLink = getByText("All Books");
    const favoritesLink = getByText("Favorites");

    expect(favoritesLink).toHaveStyle("text-decoration: underline");
    expect(allBooksLink).toHaveStyle("text-decoration: none");
  });
});
