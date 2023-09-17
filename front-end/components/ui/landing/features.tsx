import { Button } from "../button";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Features() {
  const router = useRouter();

  return (
    <section>
      <div className="mx-auto max-w-6xl border-t border-gray-200 px-4 dark:border-gray-600 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <h2 className="h2 mb-4 text-4xl font-bold" data-aos="fade-up">
              Our Features
            </h2>
            <p className="mb-3 text-xl text-gray-400" data-aos="fade-up">
              With a fast setup comes a great product.
            </p>
            <a
              href={siteConfig.links.docs}
              target="_blank"
              className="text-purple-400 transition-all hover:opacity-80"
              rel="noreferrer"
              data-aos="fade-up"
            >
              Explore Docs
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-right"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                Log explorer
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400 ">
                Explore your logs caught by Fastlog and find the root cause of
                an issue.
              </p>

              <Image
                className="relative top-8 mx-auto rounded-lg shadow-xl shadow-black"
                src={"/screenshot-logs-dark.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>

            <div
              className="overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-up"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                App status
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Keep track of your app status and get notified when something
                goes wrong.
              </p>
              <Image
                className="relative top-14 mx-auto rounded-lg  shadow-xl shadow-black"
                src={"/screenshot-status-dark.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>

            <div
              className="overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-left"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                Events as code
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Keep track of your app status and get notified when something
                goes wrong.
              </p>
              <Image
                className="relative top-14 mx-auto rounded-lg shadow-xl shadow-black"
                src={"/screenshot-events-dark.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>

            <div
              className="overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-right"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                Data visualization
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Build charts and dashboards to visualize your data.
              </p>
              <Image
                className="relative top-10 mx-auto rounded-lg shadow-xl shadow-black sm:top-24 lg:top-14"
                src={"/screenshot-chart-dark.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>

            <div
              className="max-h-56 overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-up"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                Notifications
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Link events to notifications and get alerted when you need to.
              </p>
              <Image
                className="relative mx-auto rounded-lg"
                src={"/phone.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>

            <div
              className="max-h-56 overflow-hidden rounded-xl bg-gradient-to-b from-[#ece1f1] to-[#e7f0f6] p-7 dark:from-[#1e1639] dark:to-[#291337]"
              data-aos="fade-left"
            >
              <h4 className="h4 mb-2 text-xl font-bold text-gray-800 dark:text-white">
                Issues
              </h4>
              <p className="text-md text-gray-700 dark:text-gray-400">
                View all issues linked to your app{"'"}s errors in one place.
              </p>
              <Image
                className="relative mx-auto rounded-lg top-14"
                src={"/screenshot-events-dark.png"}
                width={250}
                height={250}
                alt="Features 02"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
