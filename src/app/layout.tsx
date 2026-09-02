import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BOF-RJ | Brigada de Operações Florestais do Rio de Janeiro",
    template: "%s | BOF-RJ",
  },
  description:
    "Brigada de Operações Florestais do estado do Rio de Janeiro. Prevenção e combate a incêndios florestais, proteção da Mata Atlântica e resposta a emergências.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={geistSans.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
