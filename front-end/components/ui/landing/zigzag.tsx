import Image from "next/image";

export default function Zigzag() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-200 py-12 dark:border-gray-600 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="m-2 mb-4 inline-flex rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
              Easy Setup
            </div>
            <p className="text-xl text-gray-400">
              Stop wasting time, just build.
            </p>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <Image
                  className="none mx-auto hidden h-auto max-w-full dark:block md:max-w-none"
                  src={"/test-dark.png"}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
                <Image
                  className="mx-auto block h-auto max-w-full dark:hidden md:max-w-none"
                  src={"/test-light.png"}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
              </div>

              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="mb-2 text-xl font-bold text-purple-400">
                    Fast Migration
                  </div>
                  <h3 className="h3 mb-3">Keep projects on schedule</h3>
                  <p className="mb-4 text-xl text-gray-500 dark:text-gray-400">
                    Simply install our SDK and activate the monitoring.
                    <br /> Nothing else needed in your code.
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Easy integration
                      </span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Avoid code changes
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Monitor in seconds
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="rtl mx-auto mb-8 max-w-xl md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <Image
                  key={2}
                  id="phone"
                  className="mx-auto h-auto max-w-full md:max-w-none"
                  src={"/phone.png"}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-left"
              >
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="mb-2 text-xl font-bold text-purple-400">
                    Get Notified
                  </div>
                  <h3 className="h3 mb-3">Stay up to date</h3>
                  <p className="mb-4 text-xl text-gray-500 dark:text-gray-400">
                    Get notified when something is happening on your app.
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Accurate monitoring
                      </span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Direct notifications
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Always up to date
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div
                className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-up"
              >
                <Image
                  key={1}
                  className="none mx-auto hidden h-auto max-w-full rounded-lg shadow-2xl shadow-purple-900 dark:block md:max-w-none"
                  src={"/screenshot-dark.png"}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
                <Image
                  className="mx-auto block h-auto max-w-full rounded-lg shadow-2xl shadow-purple-200 dark:hidden md:max-w-none"
                  src={"/screenshot-light.png"}
                  width={540}
                  height={405}
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div
                className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6"
                data-aos="fade-right"
              >
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="mb-2 text-xl font-bold text-purple-400">
                    Visualize
                  </div>
                  <h3 className="h3 mb-3">Explore your dashboard</h3>
                  <p className="mb-4 text-xl text-gray-500 dark:text-gray-400">
                    Go deeper in your data and visualize everything happening on
                    your app.
                  </p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Logs
                      </span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Events
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-400">
                        Charts
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
