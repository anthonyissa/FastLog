import { BotIcon, Code} from "lucide-react";

export default function Features() {
    return (
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-12 md:py-20">
  
            {/* Section header */}
            <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
              <h2 className="h2 mb-4 text-4xl font-bold">Ideal for a wide range of use cases</h2>
              <p className="text-xl text-gray-400">
                Such as...
              </p>
            </div>
  
            {/* Items */}
            <div className="mx-auto grid max-w-sm items-start gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-16" data-aos-id-blocks>
  
              {/* 1st item */}
              <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <BotIcon className="mb-4 h-16 w-16 rounded-full bg-purple-600 p-4 text-white" />
                <h4 className="h4 mb-2 text-lg">Bots</h4>
                <p className="text-md text-center text-gray-700 dark:text-gray-400">
                    Monitor your bots and get notified when they crash or find something interesting.
                </p>
              </div>
  
              {/* 2nd item */}
              <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
             <Code className="mb-4 h-16 w-16 rounded-full bg-purple-600 p-4 text-white" />
                <h4 className="h4 mb-2 text-lg">Backends</h4>
                <p className="text-md text-center text-gray-700 dark:text-gray-400">
                    Monitor your backends and explore logs to find the root cause of an issue.
                </p>
              </div>
              

               {/* 3rd item */}
               <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="mb-4 h-16 w-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
                <path className="stroke-current text-purple-100" strokeWidth="2" strokeLinecap="square" d="M21 23h22v18H21z" fill="none" fillRule="evenodd" />
                <path className="stroke-current text-purple-300" d="M26 28h12M26 32h12M26 36h5" strokeWidth="2" strokeLinecap="square" />
              </svg>
                <h4 className="h4 mb-2 text-lg">Scrapers</h4>
                <p className="text-md text-center text-gray-700 dark:text-gray-400">
                    Index the data you scrape and get notified when something goes right or wrong.
                </p>
              </div>
  
            </div>
  
          </div>
        </div>
      </section>
    )
  }
  