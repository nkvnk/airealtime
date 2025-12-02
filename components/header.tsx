"use client";

import { MobileNav } from "./mobile-nav";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 border-b bg-background"
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2">
        {/* 現状はモバイルナビゲーションのみ表示。ロゴやGitHub/Twitterリンクは非表示にしています。 */}
        <MobileNav />
      </div>
    </motion.header>
  );
}
