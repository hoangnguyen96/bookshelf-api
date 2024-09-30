import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonHomeList from "..";

describe("SkeletonHomeList", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SkeletonHomeList />)).toMatchSnapshot();
  });
});
