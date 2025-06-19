import topRules from "@/data/rules";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import Image from "next/image";
import React from "react";

export default function FirstSection() {
  return (
    <main>
      <h1 className={"text-4xl bg-orange-400 p-5 mt-10 w-fit m-auto"}>
        Nuestras 5 reglas principales
      </h1>
      <section className=" md:flex justify-center items-centers md:w-1/2 p-5 md:p-0 mx-auto mt-10 mb-32">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/0 pointer-events-none w-1/2" />
          <Image
            src={"/mamertos7.JPG"}
            alt="Rules"
            width={400}
            height={400}
            className=" object-fill grayscale "
          />
          <div className="md:absolute inset-0 md:bg-gradient-to-l md:from-black md:from-25% pointer-events-none" />
        </div>

        <div className="flex flex-col mx-auto w-full max-w-lg divide-y justify-evenly">
          {topRules.map((section, index) => (
            <Disclosure
              as={div}
              className="p-6"
              defaultOpen={false}
              key={index}
            >
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-lg text-white font-medium group-data-hover:text-white/80 group-data-open:text-orange-400">
                      {section.title}
                    </span>
                    <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180 group-data-open:fill-orange-400" />
                  </DisclosureButton>
                  <DisclosurePanel static>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: open ? 1 : 0,
                        height: open ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2 text-sm/5 text-white/50"
                    >
                      {section.text}
                    </motion.div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </section>
    </main>
  );
}
