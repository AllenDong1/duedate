import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DueDate",
  description: "A customizable web countdown for deadlines and events.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
