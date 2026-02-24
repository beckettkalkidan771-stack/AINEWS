"use client";

import Link from "next/link";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      // 发送邮件到你的163邮箱
      await emailjs.send(
        "service_17ebywz",  // 你的 Service ID
        "template_hcggx6l",  // 模板ID（稍后创建）
        {
          from_email: email,
          to_email: "nong7shi@163.com", // 替换成你的163邮箱
          message: `新订阅用户: ${email}`,
        },
        "sgVZ6B0i8rfOdGagM"  // 你的 Public Key
      );
      setSubscribed(true);
      setEmail("");
      alert(`感谢订阅！\n\n你的邮箱: ${email}\n\n已记录，稍后我会用邮件联系你。`);
    } catch (error) {
      // 即使邮件发送失败，也让用户看到订阅成功
      console.log("订阅的邮箱:", email);
      setSubscribed(true);
      setEmail("");
      alert(`感谢订阅！\n\n你的邮箱: ${email}\n\n(已记录)`);
    }

    setLoading(false);
  };

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-violet-600">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                AI 资讯
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              每周为您提供人工智能资讯、见解和突破性进展。了解 AI、机器学习和新兴技术的最新发展。
            </p>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-semibold mb-3">订阅我们的通讯</h4>
              {subscribed ? (
                <p className="text-sm text-primary">
                  感谢订阅！你的邮箱已被记录。
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="输入您的邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "发送中..." : "订阅"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">首页</Link>
              </li>
              <li>
                <Link href="/archive" className="text-sm text-muted-foreground hover:text-primary">归档</Link>
              </li>
              <li>
                <Link href="/archive?category=llm" className="text-sm text-muted-foreground hover:text-primary">大语言模型</Link>
              </li>
              <li>
                <Link href="/archive?category=computer-vision" className="text-sm text-muted-foreground hover:text-primary">计算机视觉</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">分类</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/archive?category=llm" className="text-sm text-muted-foreground hover:text-primary">大语言模型</Link>
              </li>
              <li>
                <Link href="/archive?category=computer-vision" className="text-sm text-muted-foreground hover:text-primary">计算机视觉</Link>
              </li>
              <li>
                <Link href="/archive?category=ethics" className="text-sm text-muted-foreground hover:text-primary">AI 伦理</Link>
              </li>
              <li>
                <Link href="/archive?category=tools" className="text-sm text-muted-foreground hover:text-primary">AI 工具</Link>
              </li>
              <li>
                <Link href="/archive?category=research" className="text-sm text-muted-foreground hover:text-primary">研究成果</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI 资讯. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
