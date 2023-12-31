import Navigation from '@/components/Navigation';
import './globals.css';
import HeaderComponent from '@/components/Header';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen p-4 px-6 items-center'>
          {/* <Navigation /> */}
          {children}
        </main>
      </body>
    </html>
  );
}
