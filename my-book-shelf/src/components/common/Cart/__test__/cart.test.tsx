import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Cart from "..";

describe("Cart", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Cart />)).toMatchSnapshot();
  });
});
