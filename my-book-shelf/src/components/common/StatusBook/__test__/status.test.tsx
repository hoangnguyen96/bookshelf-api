import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import StatusBook from "..";

describe("Status", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<StatusBook />)).toMatchSnapshot();
  });

  it("Should render correctly snapshot with status true", () => {
    expect(render(<StatusBook status={true} />)).toMatchSnapshot();
  });
});
