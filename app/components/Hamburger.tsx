import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

export default function Hamburguer() {
  return (
    <div className=" flex lg:hidden z-50">
      <Menu>
        {({ open }) => (
          <div className="flex">
            <MenuButton>
              <Bars3Icon width={30} height={30} />
            </MenuButton>
            <AnimatePresence>
              {open && (
                <MenuItems
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom end"
                  className=" data-[closed]:scale-95 data-[closed]:opacity-0 gap-5  p-3 text-white justify-between font-bold bg-[#284F77]/70 w-fit m-auto rounded-lg z-50"
                >
                  <MenuItem>
                    <Link
                      className="block data-[focus]:bg-[#838383] p-3 rounded"
                      href="/pricing"
                    >
                      Pricing
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      className="block data-[focus]:bg-[#838383] p-3 rounded"
                      href="/company"
                    >
                      Company
                    </Link>
                  </MenuItem>
                  {/* <MenuItem>
                    <a
                      className="block data-[focus]:bg-[#284F77] p-3 rounded"
                      href="/blog"
                    >
                      Blog
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block data-[focus]:bg-[#284F77] p-3 rounded"
                      href="/login"
                    >
                      Login
                    </a>
                  </MenuItem> */}
                </MenuItems>
              )}
            </AnimatePresence>
          </div>
        )}
      </Menu>
    </div>
  );
}
