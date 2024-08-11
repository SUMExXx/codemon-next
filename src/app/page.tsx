import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex bg-black flex-col items-center justify-between" style={{minHeight: 'calc(100vh - 40px)'}}>
      <section className="">
        <div
            className="h-full flex flex-col items-center justify-center bg-cover bg-center text-white"
        >
          <video autoPlay muted loop preload="metadata" className="w-full object-cover md:h-[650px]" id='gsph_video' style={{objectFit: "cover"}}>
                <source src={'https://res.cloudinary.com/deeqsba43/video/upload/v1723339748/test/wel30oramljcuryegq1o.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="flex flex-col justify-center items-center absolute top-[400px]">
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
                Start Your Coding Journey Now
              </h1>
              <Link href="/playground">
                  <button className="px-8 py-4 bg-blue-500 text-xl font-semibold rounded-md hover:bg-blue-600">
                      Unleash Now
                  </button>
              </Link>
            </div>
        </div>
      </section>
    </main>
  );
}
