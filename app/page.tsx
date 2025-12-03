"use client";

import React, { useEffect, useState } from "react";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { tools } from "@/lib/tools";
import { Welcome } from "@/components/welcome";
import { BroadcastButton } from "@/components/broadcast-button";
import { StatusDisplay } from "@/components/status";
import { TokenUsageDisplay } from "@/components/token-usage";
import { MessageControls } from "@/components/message-controls";
import { ToolsEducation } from "@/components/tools-education";
import { motion } from "framer-motion";
import { useToolsFunctions } from "@/hooks/use-tools";
import { DottedSphere } from "@/components/dotted-sphere";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMockAuth } from "@/hooks/use-mock-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const App: React.FC = () => {
  const [pattern, setPattern] = useState<string>("");
  const [situation, setSituation] = useState<string>("");
  const { user, isAuthenticated, loading, login, logout } = useMockAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    audioIndicatorRef,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
  } = useWebRTCAudioSession("ash", tools, {
    pattern,
    situation,
  });

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: "getCurrentTime",
        backgroundFunction: "changeBackgroundColor",
        partyFunction: "partyMode",
        launchWebsite: "launchWebsite",
        copyToClipboard: "copyToClipboard",
        scrapeWebsite: "scrapeWebsite",
      };

      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="h-full">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground text-sm">
            認証状態を確認しています...
          </p>
        </div>
      ) : !isAuthenticated ? (
        <div className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20">
          <motion.div
            className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                ログイン
              </h1>
              <p className="text-sm text-muted-foreground">
                デモ用の簡易ログインです。パスワードに{" "}
                <span className="font-mono font-semibold">password</span>{" "}
                を入力するとログインできます。
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">{user?.email}</span>{" "}
              としてログイン中
            </div>
            <Button type="button" variant="outline" size="sm" onClick={logout}>
              ログアウト
            </Button>
          </div>

          <Welcome />

          <motion.div
            className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="space-y-3 w-full">
              <p className="text-sm text-muted-foreground">
                ロープレを開始する前に、「顧客パターン」と「シチュエーション」を自由入力してください。
                ここに書いた内容がそのまま AI
                に渡されるので、より柔軟にロールプレイ設定ができます。
              </p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="pattern-text">顧客パターン（自由入力）</Label>
                  <Textarea
                    id="pattern-text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="例：68歳の女性。夫を亡くし、郊外の戸建てを相続。空き家の管理や売却について不安を感じている。慎重で心配性。"
                    rows={3}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="situation-text">
                    シチュエーション（自由入力）
                  </Label>
                  <Textarea
                    id="situation-text"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="例：初回の電話で訪問査定の日程を調整したい。時間はあまり取れないが、話は聞いてみたいと思っている。"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
              {/* ユーザーが話しているときに反応するAIの球体アバター */}
              <div
                ref={audioIndicatorRef}
                className="audio-indicator flex items-center justify-center"
                aria-hidden="true"
              >
                <DottedSphere color="#22c55e" density={1400} speed={0.55} />
              </div>
              <BroadcastButton
                isSessionActive={isSessionActive}
                onClick={handleStartStopClick}
              />
            </div>
            {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
            {status && (
              <motion.div
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageControls conversation={conversation} msgs={msgs} />
              </motion.div>
            )}
          </motion.div>

          {status && <StatusDisplay status={status} />}
          <div className="w-full flex flex-col items-center gap-4">
            <ToolsEducation />
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default App;
