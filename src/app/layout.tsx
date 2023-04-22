import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
        {/* <script src="../../node_modules/flowbite/dist/flowbite.min.js"></script> */}
      </body>
    </html>
  );
}
