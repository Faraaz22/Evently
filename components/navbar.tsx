"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-md shadow-sm dark:bg-gray-900/40">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Evently Home">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 shadow-md" />
          <span className="text-lg font-bold tracking-tight text-white hover:text-pink-400 transition-colors">
            Evently
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button variant="ghost" className="text-sm text-white hover:text-pink-400 hidden sm:inline-flex" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-zinc-300 hidden sm:inline">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
