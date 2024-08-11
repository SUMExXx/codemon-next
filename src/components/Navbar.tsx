import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white w-full fixed top-0 flex items-center justify-center h-[40px] z-50">
      <div className="container mx-auto flex justify-between items-center px-12 w-full h-full">
        {/* Logo and Name */}
        <Link href={`./`} className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="w-12 h-8" // Ensure you have a logo image at this path
            width={60}
            height={60}
          />
          <span className="text-xl font-semibold">Codemon</span>
        </Link>
        {/* Links */}
        <div className="flex space-x-4">
          <a href="/playground" className="hover:text-gray-300">
            Playground
          </a>
          <a href="/arena?id=1" className="hover:text-gray-300">
            Arena
          </a>
          <a href="/battleground" className="hover:text-gray-300">
            Battleground
          </a>
        </div>
      </div>
    </nav>
  );
}