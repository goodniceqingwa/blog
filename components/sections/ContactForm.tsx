"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fields = [
    { key: "name" as const, label: "姓名", type: "text" },
    { key: "email" as const, label: "邮箱", type: "email" },
    { key: "message" as const, label: "消息", type: "textarea" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      {fields.map((field) => (
        <div key={field.key} className="relative group">
          <label className="block text-text-muted text-sm mb-2">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              rows={5}
              value={formData[field.key]}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
              required
              className="w-full bg-transparent border-b-2 border-glass-border focus:border-accent-purple px-0 py-2 text-text-primary focus:outline-none transition-colors resize-none"
            />
          ) : (
            <input
              type={field.type}
              value={formData[field.key]}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
              required
              className="w-full bg-transparent border-b-2 border-glass-border focus:border-accent-purple px-0 py-2 text-text-primary focus:outline-none transition-colors"
            />
          )}
          {/* Focus line animation */}
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-purple group-focus-within:w-full group-focus-within:left-0 transition-all duration-300" />
        </div>
      ))}

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          {submitted ? "✓ 已发送！" : "发送消息"}
        </Button>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-accent-purple text-lg font-medium"
        >
          🎉 感谢你的消息！
        </motion.div>
      )}
    </form>
  );
}
