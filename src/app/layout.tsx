import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes)",
    template: "%s | BOF-RJ",
  },
  description:
    "1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes). Prevenção e combate a incêndios florestais, proteção da Mata Atlântica e resposta a emergências no Rio de Janeiro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={geistSans.variable}>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
