import './globals.css';

export const metadata = {
  title: 'Portfolio de Zoé Mahler',
  description: 'Portfolio final',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
