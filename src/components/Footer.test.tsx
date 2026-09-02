import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("exibe o nome da brigada", () => {
    render(<Footer />);
    expect(
      screen.getByText("Brigada de Operações Florestais de Rio de Janeiro")
    ).toBeInTheDocument();
  });

  it("exibe a indicação de copyright com o ano atual", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} BOF-RJ. Todos os direitos reservados.`)
    ).toBeInTheDocument();
  });
});
