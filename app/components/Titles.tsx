import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Titles() {
  return (
    <div className=" absolute flex inset-3">
      <div className=" p-5 rounded-xl flex flex-col justify-center text-start lg:grid grid-cols-2 grid-rows-2 lg:items-start bg-transparent">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=" lg:text-end uppercase text-white font-light left-10 bottom-30 text-5xl lg:text-7xl pb-10 col-start-2 row-start-2"
        >
          Alcanza tus <span className=" text-orange-500">metas</span> fisicas
        </motion.h1>
        <Button />
      </div>
    </div>
  );
}
