"use client";

import { useCallback, useEffect, useState } from "react";

type MockUser = {
  email: string;
};

const STORAGE_KEY = "mock-auth";

type StoredAuth = {
  user: MockUser;
};

export function useMockAuth() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 初回マウント時に localStorage から状態を復元
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw) as StoredAuth;
      if (parsed?.user?.email) {
        setUser(parsed.user);
      }
    } catch {
      // 読み込み失敗は無視
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // 簡易モック認証: password が "password" のときだけ成功
    if (!email || !password || password !== "password") {
      throw new Error("Invalid credentials");
    }

    const nextUser: MockUser = { email };
    setUser(nextUser);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user: nextUser } satisfies StoredAuth)
      );
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };
}


