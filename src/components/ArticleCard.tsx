import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  readingTime?: string;
  featured?: boolean;
  image?: string;
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

export default function ArticleCard({
  title,
  excerpt,
  date,
  category,
  slug,
  readingTime = "5 分钟阅读",
  featured = false,
  image,
}: ArticleCardProps) {
  return (
    <article
      className={`group flex flex-col h-full ${
        featured ? "md:grid md:grid-cols-2 md:gap-8" : ""
      }`}
    >
      <Link href={`/articles/${slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-xl ${
            featured ? "h-64 md:h-full" : "h-48"
          } mb-4`}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-violet-100 dark:from-primary/20 dark:to-violet-900/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              categoryColors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {categoryLabels[category] || category}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>

        <Link href={`/articles/${slug}`} className="block group-hover:text-primary transition-colors">
          <h3
            className={`font-serif font-bold mb-2 ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
        </Link>

        <p className={`text-muted-foreground mb-4 ${featured ? "text-base" : "text-sm line-clamp-3"}`}>
          {excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{readingTime}</span>
        </div>
      </div>
    </article>
  );
}
