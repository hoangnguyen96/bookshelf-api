import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "..";

describe("Button", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Button />)).toMatchSnapshot();
  });
});
