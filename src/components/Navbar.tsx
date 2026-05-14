"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Lead Management System
        </h1>

        <div className="flex gap-6">
          <Link
            href="/"
            className={`hover:text-gray-300 ${
              pathname === "/" ? "font-bold underline" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className={`hover:text-gray-300 ${
              pathname === "/dashboard"
                ? "font-bold underline"
                : ""
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}