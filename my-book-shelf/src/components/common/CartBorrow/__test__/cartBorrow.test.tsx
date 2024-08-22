import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CartBorrow from "..";

describe("CartBorrow", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<CartBorrow />)).toMatchSnapshot();
  });
});
