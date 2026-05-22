import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccessGate from "../components/AccessGate";
import { supabase } from "../integrations/supabase/client";

// Mock Supabase
vi.mock("../integrations/supabase/client", () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

const mockProject = {
  id: "asure-compliance",
  title: "Asure Compliance",
  description: "Test description",
  impact: "Test impact",
  role: "Lead Designer",
  tags: ["UX", "Tax"],
  tools: ["Figma"],
  image: "/placeholder.svg",
} as any;

describe("AccessGate", () => {
  const onAccessGranted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("renders the passcode gate", () => {
    render(<AccessGate project={mockProject} onAccessGranted={onAccessGranted} />);
    expect(screen.getByPlaceholderText(/enter passcode/i)).toBeInTheDocument();
  });

  it("shows error for incorrect passcode", async () => {
    (supabase.functions.invoke as any).mockResolvedValue({
      data: { valid: false },
      error: null,
    });

    render(<AccessGate project={mockProject} onAccessGranted={onAccessGranted} />);
    
    const input = screen.getByPlaceholderText(/enter passcode/i);
    const button = screen.getByText(/unlock case study/i);

    fireEvent.change(input, { target: { value: "WRONG" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/incorrect passcode/i)).toBeInTheDocument();
    });
    expect(onAccessGranted).not.toHaveBeenCalled();
  });

  it("unlocks when 'UX' is entered (mocking successful response)", async () => {
    (supabase.functions.invoke as any).mockImplementation(async (fnName, options) => {
      if (options.body.passcode.toLowerCase() === 'ux') {
        return { data: { valid: true }, error: null };
      }
      return { data: { valid: false }, error: null };
    });

    render(<AccessGate project={mockProject} onAccessGranted={onAccessGranted} />);
    
    const input = screen.getByPlaceholderText(/enter passcode/i);
    const button = screen.getByText(/unlock case study/i);

    // Test with "ux"
    fireEvent.change(input, { target: { value: "ux" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onAccessGranted).toHaveBeenCalled();
    });
    expect(sessionStorage.getItem("access_granted_asure-compliance")).toBe("true");

    // Test with "UX"
    vi.clearAllMocks();
    render(<AccessGate project={mockProject} onAccessGranted={onAccessGranted} />);
    fireEvent.change(input, { target: { value: "UX" } });
    fireEvent.click(button);
    await waitFor(() => {
        expect(onAccessGranted).toHaveBeenCalled();
    });
  });
});
