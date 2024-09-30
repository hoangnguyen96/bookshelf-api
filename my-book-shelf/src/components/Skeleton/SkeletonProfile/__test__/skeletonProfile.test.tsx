import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonProfile from "..";

describe("SkeletonProfile", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SkeletonProfile />)).toMatchSnapshot();
  });
});
