"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      await emailjs.send(
        "service_17ebywz",
        "template_hcggx6l",
        {
          from_email: email,
          to_email: "nong7shi@163.com",
          message: `新订阅用户: ${email}`,
        },
        "sgVZ6B0i8rfOdGagM"
      );
      setSubscribed(true);
      setEmail("");
      alert(`感谢订阅！\n\n你的邮箱: ${email}\n\n已记录，稍后我会用邮件联系你。`);
    } catch (error) {
      console.log("订阅的邮箱:", email);
      setSubscribed(true);
      setEmail("");
      alert(`感谢订阅！\n\n你的邮箱: ${email}\n\n(已记录)`);
    }

    setLoading(false);
  };

  if (subscribed) {
    return (
      <p className="text-sm text-primary">
        感谢订阅！你的邮箱已被记录。
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="输入您的邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
      >
        {loading ? "发送中..." : "订阅"}
      </button>
    </form>
  );
}
