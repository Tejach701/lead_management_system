import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
