"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-violet-600">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">AI 资讯</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            首页
          </Link>
          <Link
            href="/archive"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            归档
          </Link>
          <Link
            href="/archive?category=llm"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            大语言模型
          </Link>
          <Link
            href="/archive?category=computer-vision"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            计算机视觉
          </Link>
          <Link
            href="/archive?category=ethics"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            AI 伦理
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="切换菜单"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-4">
            <Link
              href="/"
              className="text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/archive"
              className="text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              归档
            </Link>
            <Link
              href="/archive?category=llm"
              className="text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              大语言模型
            </Link>
            <Link
              href="/archive?category=computer-vision"
              className="text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              计算机视觉
            </Link>
            <Link
              href="/archive?category=ethics"
              className="text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              AI 伦理
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
