import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${article.title} - AI 资讯`,
    description: article.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  llm: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "computer-vision": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  ethics: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  tools: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  research: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const categoryLabels: Record<string, string> = {
  llm: "大语言模型",
  "computer-vision": "计算机视觉",
  ethics: "AI 伦理",
  tools: "AI 工具",
  research: "研究成果",
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Parse content into paragraphs and headings
  const contentLines = article.content.trim().split("\n");
  const contentElements = contentLines.map((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      return { type: "h2", content: trimmed.slice(3), key: `h2-${index}` };
    } else if (trimmed.startsWith("### ")) {
      return { type: "h3", content: trimmed.slice(4), key: `h3-${index}` };
    } else if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
      return { type: "li", content: trimmed.slice(3), key: `li-${index}` };
    } else if (trimmed.startsWith("- ")) {
      return { type: "li", content: trimmed.slice(2), key: `li-${index}` };
    } else if (trimmed === "") {
      return null;
    } else {
      return { type: "p", content: trimmed, key: `p-${index}` };
    }
  });

  // Group list items
  const groupedContent: Array<{ type: string; content: string | string[]; key: string }> = [];
  let currentList: string[] = [];
  let listIndex = 0;

  contentElements.forEach((el) => {
    if (!el) return;

    if (el.type === "li") {
      currentList.push(el.content as string);
    } else {
      if (currentList.length > 0) {
        groupedContent.push({ type: "ul", content: [...currentList], key: `ul-${listIndex++}` });
        currentList = [];
      }
      groupedContent.push({ type: el.type, content: el.content as string, key: el.key });
    }
  });

  if (currentList.length > 0) {
    groupedContent.push({ type: "ul", content: currentList, key: `ul-${listIndex++}` });
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">首页</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/archive" className="hover:text-primary">归档</Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{article.title}</li>
            </ol>
          </nav>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                categoryColors[article.category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {categoryLabels[article.category] || article.category}
            </span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{article.readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
            {article.excerpt}
          </p>

          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 relative rounded-xl mb-12 overflow-hidden">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-violet-100 dark:from-primary/20 dark:to-violet-900/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-3xl">
            {groupedContent.map((el) => {
              if (el.type === "h2") {
                return <h2 key={el.key} className="font-serif text-2xl font-bold mt-10 mb-4">{el.content}</h2>;
              } else if (el.type === "h3") {
                return <h3 key={el.key} className="font-serif text-xl font-bold mt-8 mb-3">{el.content}</h3>;
              } else if (el.type === "ul") {
                return (
                  <ul key={el.key} className="list-disc list-inside space-y-2 my-4 ml-4">
                    {(el.content as string[]).map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                );
              } else {
                return <p key={el.key} className="text-base leading-relaxed my-4 text-muted-foreground">{el.content}</p>;
              }
            })}
          </div>

          {/* Share Section */}
          <div className="max-w-3xl mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-medium">喜欢这篇文章？分享给其他人：</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm">Twitter</button>
                <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm">微信</button>
                <button className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm">复制链接</button>
              </div>
            </div>
          </div>
        </article>

        {/* More Articles */}
        <section className="container mx-auto px-4 py-12 md:py-16 border-t border-border">
          <h2 className="font-serif text-2xl font-bold mb-8">更多文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getAllArticles()
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group block">
                  <article>
                    <div className="relative h-40 rounded-xl mb-4 overflow-hidden">
                      {a.image ? (
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-violet-100 dark:from-primary/20 dark:to-violet-900/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-violet-200 dark:group-hover:to-violet-900/30 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif font-bold mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
