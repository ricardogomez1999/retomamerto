import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Hamburguer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" flex lg:hidden">
      <button onClick={() => setIsOpen(true)}>
        <Bars3Icon className=" text-white" width={30} height={30} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full bg-black p-12"
              >
                <div className="flex flex-row-reverse gap-4 text-white">
                  <button onClick={() => setIsOpen(false)}>
                    <XMarkIcon width={30} height={30} />
                  </button>
                </div>
                <ul className=" flex flex-col justify-between gap-10 text-3xl text-white mt-10">
                  <li>
                    <Link href={"/rules"}>
                      <p>Reglamento</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/us"}>
                      <p>Acerca</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/events"}>
                      <p>Calendario</p>
                    </Link>
                  </li>
                </ul>
                <Link
                  href={"registration"}
                  className=" bg-orange-500 h-16 px-5 rounded-xl text-white text-lg font-light flex justify-center items-center mt-10"
                >
                  Únete al reto
                </Link>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
