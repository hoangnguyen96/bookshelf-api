import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import FormRegister from "..";
import { checkEmailExists } from "@app/utils";

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  checkEmailExists: jest.fn(),
}));

const mockSubmit = jest.fn();

describe("FormRegister Component", () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("Should render correctly snapshot", () => {
    expect(
      render(<FormRegister itemUpdate={{}} onSubmit={mockSubmit} />)
    ).toMatchSnapshot();
  });

  it("Should renders the form with all fields", () => {
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    expect(getByLabelText(/Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(getByText(/Register/i)).toBeInTheDocument();
  });

  it("Should shows password mismatch error if confirmPassword does not match password", async () => {
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "Password123" },
    });
    fireEvent.click(getByText(/Register/i));

    await waitFor(() => {
      expect(
        getByText(
          /Password must have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one symbol/i
        )
      ).toBeInTheDocument();
    });
  });

  it("Should calls onSubmit when form is filled correctly", async () => {
    (checkEmailExists as jest.Mock).mockResolvedValue(false);
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "john.doe@gmail.com" }, // Change email to a valid one
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Abc123___" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "Abc123___" },
    });

    fireEvent.click(getByText(/Register/i));
  });
});
