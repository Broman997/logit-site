export const metadata = {
  title: 'LogIt: TV & Movie Tracker',
  description: 'Privacy policy and support for LogIt: TV & Movie Tracker.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#fff' }}>{children}</body>
    </html>
  );
}
