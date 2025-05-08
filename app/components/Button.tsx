import React from "react";
import { motion } from "framer-motion";

export default function Button() {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className=" bg-orange-500 p-5 md:p-10 rounded-lg text-white text-lg md:text-3xl md:hidden"
    >
      Registrate aqui!
    </motion.button>
  );
}
