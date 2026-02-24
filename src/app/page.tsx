import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-violet-500/5 dark:from-primary/10 dark:to-violet-500/10">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  每周通讯
                </span>
                <span className="text-sm text-muted-foreground">
                  第 {Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24 * 7))} 期
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                走在{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">
                  AI 革命
                </span>{" "}
                的前沿
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                每周为您精选 AI 资讯、突破性研究和实用工具。加入数千名开发者、研究人员和爱好者的行列。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#latest"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  阅读最新一期
                </a>
                <a
                  href="/archive"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-secondary transition-colors"
                >
                  浏览归档
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section id="latest" className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">精选文章</h2>
          </div>
          <ArticleCard
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            date={featuredArticle.date}
            category={featuredArticle.category}
            slug={featuredArticle.slug}
            readingTime={featuredArticle.readingTime}
            featured={true}
            image={featuredArticle.image}
          />
        </section>

        {/* Recent Articles */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">最新文章</h2>
            <a
              href="/archive"
              className="text-sm font-medium text-primary hover:underline"
            >
              查看全部 &rarr;
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
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
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              按主题探索
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              深入了解 AI 研究和开发的特定领域
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "大语言模型", slug: "llm", color: "from-blue-500 to-blue-600" },
              { name: "计算机视觉", slug: "computer-vision", color: "from-green-500 to-green-600" },
              { name: "AI 伦理", slug: "ethics", color: "from-red-500 to-red-600" },
              { name: "AI 工具", slug: "tools", color: "from-orange-500 to-orange-600" },
              { name: "研究成果", slug: "research", color: "from-purple-500 to-purple-600" },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/archive?category=${category.slug}`}
                className={`group p-6 rounded-xl bg-gradient-to-br ${category.color} text-white text-center hover:opacity-90 transition-opacity`}
              >
                <span className="font-semibold">{category.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-violet-600 p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
              不错过每一期
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              每周将最新的 AI 新闻、工具和见解直接发送到您的邮箱。无需垃圾邮件，随时可退订。
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
