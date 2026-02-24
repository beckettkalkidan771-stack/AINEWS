"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";

const categories = [
  { slug: "all", label: "全部" },
  { slug: "llm", label: "大语言模型" },
  { slug: "computer-vision", label: "计算机视觉" },
  { slug: "ethics", label: "AI 伦理" },
  { slug: "tools", label: "AI 工具" },
  { slug: "research", label: "研究成果" },
];

function ArchiveContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles;
    }
    return articles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    // Update URL without navigation
    const url = slug === "all" ? "/archive" : `/archive?category=${slug}`;
    window.history.pushState({}, "", url);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-violet-500/5 dark:from-primary/10 dark:to-violet-500/10">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              文章归档
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              浏览我们关于人工智能、机器学习和新兴技术的所有文章。
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container mx-auto px-4 py-12">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  category={article.category}
                  slug={article.slug}
                  readingTime={article.readingTime}
                  image={article.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                该分类下没有找到文章。
              </p>
              <button
                onClick={() => handleCategoryChange("all")}
                className="text-primary hover:underline"
              >
                查看所有文章
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ArchivePage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ArchiveContent />
    </Suspense>
  );
}
