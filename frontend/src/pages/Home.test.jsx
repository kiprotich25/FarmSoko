// src/pages/Home.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import API from "../services/api";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock API
vi.mock("../services/api");

const mockProducts = [
  { _id: "1", name: "Tomatoes", category: "Vegetables" },
  { _id: "2", name: "Milk", category: "Dairy" },
];

const mockCategories = [
  { _id: "c1", name: "Vegetables" },
  { _id: "c2", name: "Dairy" },
];

describe("Home page", () => {
  beforeEach(() => {
    API.get.mockImplementation((url) => {
      if (url === "/products") return Promise.resolve({ data: mockProducts });
      if (url === "/categories") return Promise.resolve({ data: mockCategories });
    });
  });

  it("renders products", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Tomatoes")).toBeInTheDocument();
      expect(screen.getByText("Milk")).toBeInTheDocument();
    });
  });
});
