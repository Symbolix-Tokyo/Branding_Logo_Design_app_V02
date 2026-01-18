import './globals.css'

export const metadata = {
  title: 'ブランドロゴデザイン提案書アプリ',
  description: 'PDF形式のブランドロゴデザイン提案書を生成するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
