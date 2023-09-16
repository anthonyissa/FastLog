import Image from 'next/image'

export default function Zigzag() {

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 py-12 md:py-20">

          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="m-2 mb-4 inline-flex rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">Easy Setup</div>
            <p className="text-xl text-gray-400">Stop wasting time, just build.</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-up">
                <Image className="dark:block hidden none mx-auto h-auto max-w-full md:max-w-none" src={"/snap-dark.png"} width={540} height={405} alt="Features 02" />
                <Image className="dark:hidden block mx-auto h-auto max-w-full md:max-w-none" src={"/snap-light.png"} width={540} height={405} alt="Features 02" />
              </div>

              {/* Content */}
              <div className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="mb-2 text-xl text-purple-400 font-bold">Fast Migration</div>
                  <h3 className="h3 mb-3">Keep projects on schedule</h3>
                  <p className="mb-4 text-xl text-gray-400">Simply install our SDK and activate the monitoring.<br /> Nothing else needed in your code.</p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Easy integration</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Avoid code changes</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Monitor in seconds</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div className="rtl mx-auto mb-8 max-w-xl md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-up">
                <Image id='phone' className="mx-auto h-auto max-w-full md:max-w-none" src={"/phone.png"} width={540} height={405} alt="Features 02" />
              </div>
              {/* Content */}
              <div className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="mb-2 text-xl text-purple-400 font-bold">Get Notified</div>
                  <h3 className="h3 mb-3">Stay up to date</h3>
                  <p className="mb-4 text-xl text-gray-400">Get notified when something is happening on your app.</p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Accurate monitoring</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Direct notifications</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Always up to date</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="items-center md:grid md:grid-cols-12 md:gap-6">
              {/* Image */}
              <div className="mx-auto mb-8 max-w-xl md:order-1 md:col-span-5 md:mb-0 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-up">
                <Image className="mx-auto h-auto max-w-full md:max-w-none" src={"/snap-dark.png"} width={540} height={405} alt="Features 03" />
              </div>
              {/* Content */}
              <div className="mx-auto max-w-xl md:col-span-7 md:w-full md:max-w-none lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter mb-2 text-xl text-purple-600">More speed. Less spend</div>
                  <h3 className="h3 mb-3">Keep projects on schedule</h3>
                  <p className="mb-4 text-xl text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <ul className="-mb-2 text-lg text-gray-400">
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Duis aute irure dolor in reprehenderit</span>
                    </li>
                    <li className="mb-2 flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Excepteur sint occaecat</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="mr-2 h-3 w-3 shrink-0 fill-current text-purple-500" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Amet consectetur adipiscing elit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
