import { useEffect } from "react";
import { Button } from "../button"
import { useRouter } from "next/navigation"

export default function Hero() {

    const router = useRouter()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.getElementById("pulse-image")!.style.transform = `translateY(-${scrollY * 0.3}px)`; 
      document.getElementById("graph-image")!.style.transform = `translateY(+${scrollY * 0.4}px)`;
      document.getElementById("graph-image-light")!.style.transform = `translateY(+${scrollY * 0.4}px)`;
  });
  }, [])

  return (
    <section className=" w-full overflow-hidden">
      <div className="relative mx-auto h-screen max-w-6xl px-4 sm:px-6">
        {/* Illustration behind hero content */}
        <div
        id="pulse-image"
          className="pointer-events-none absolute left-0 top-0 -ml-20 hidden lg:block"
          aria-hidden="true"
        >
          {" "}
          <img
            src="/hero.svg"
            className="relative top-0 max-w-full animate-pulse opacity-20"
            width="564"
            height="552"
          ></img>
        </div>
        <div
          id="graph-image"
          className="pointer-events-none absolute left-0 top-0 -ml-20 hidden lg:block"
          aria-hidden="true"
        >
          {" "}
          <img
            src="/screenshot-dark.png"
            className="relative left-[75%] top-64 max-w-full  dark:opacity-20 opacity-0"
            width="800"
            height="552"
          ></img>
        </div>
        <div
        id="graph-image-light"
          className="pointer-events-none visible absolute left-0 top-0 -ml-20 lg:block"
          aria-hidden="true"
        >
          {" "}
          <img
            src="/screenshot-light.png"
            className="relative left-[75%] top-64 max-w-full  dark:hidden opacity-20"
            width="800"
            height="552"
          ></img>
        </div>

        {/* Hero content */}
        <div className="relative pb-10 pt-32 md:pb-16 md:pt-40">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <h1 className="h1 mb-4 text-6xl font-bold" data-aos="fade-up">
              Monitor your apps <br />
              in seconds.
            </h1>
            <p
              className="mb-8 text-xl text-gray-400 drop-shadow-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Made for developers who are tired of wasting time on monitoring.<br /> Let us take care of the complexity while you focus on building your app.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <a onClick={() => router.push("/apps")} data-aos="fade-up" data-aos-delay="400">
                <Button className="text-md bg-gradient-to-r from-purple-500 to-purple-700 px-8 py-6 text-white transition-all hover:opacity-80">
                  Start for free
                </Button>
              </a>
            </div>
          </div>

          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={1024}
            thumbHeight={576}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          /> */}
        </div>
      </div>
    </section>
  )
}
