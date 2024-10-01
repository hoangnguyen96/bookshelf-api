import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import CartBorrow from "..";
import { book1 } from "@app/assets/images";

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("CartBorrow", () => {
  const props = {
    title: "Don’t Make Me think",
    author: "Steve Krug, ",
    publicationYear: 1900,
    rating: 4.5,
    imgUrl: `${book1}`,
    createDate: "11 Mar 2023 09:00 AM",
    id: "",
    onReturnBook: jest.fn(),
  };
  it("Should render correctly snapshot", () => {
    expect(render(<CartBorrow {...props} />)).toMatchSnapshot();
  });

  it("Should handle return book", () => {
    const { getByTestId } = render(<CartBorrow {...props} />);

    const buttons = getByTestId("return-book");

    fireEvent.click(buttons);

    expect(props.onReturnBook).toHaveBeenCalled();
  });
});
