import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white w-full fixed top-0 flex items-center justify-center h-[40px] z-50">
      <div className="container mx-auto flex justify-between items-center px-12 w-full h-full">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          {/* <Image
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8" // Ensure you have a logo image at this path
            width={60}
            height={60}
          /> */}
          <span className="text-xl font-semibold">Codemon</span>
        </div>
        {/* Links */}
        <div className="flex space-x-4">
          <a href="/playground" className="hover:text-gray-300">
            Playground
          </a>
          <a href="/arena" className="hover:text-gray-300">
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