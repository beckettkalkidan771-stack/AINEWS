import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 资讯 - 每周最新人工智能资讯",
  description: "关注最新的人工智能、机器学习和新兴技术。每周精选资讯和见解。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
