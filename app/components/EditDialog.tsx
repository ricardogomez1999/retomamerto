import React, { Dispatch, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

type EditDialogProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleSave: (e: React.FormEvent) => Promise<void>;
  ageInput: string;
  setAgeInput: Dispatch<SetStateAction<string>>;
  setSexInput: Dispatch<SetStateAction<string>>;
  sexInput: string;
  heightInput: string;
  setHeightInput: Dispatch<SetStateAction<string>>;
  weightInput: string;
  setWeightInput: Dispatch<SetStateAction<string>>;
  setPhotoFile: Dispatch<SetStateAction<File | null>>;
};

export default function EditDialog({
  isEditing,
  setIsEditing,
  handleSave,
  ageInput,
  setAgeInput,
  setSexInput,
  sexInput,
  heightInput,
  setHeightInput,
  setWeightInput,
  weightInput,
  setPhotoFile,
}: EditDialogProps) {
  return (
    <Dialog
      static
      open={isEditing}
      onClose={() => setIsEditing(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/70">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg w-full max-w-md text-black relative"
        >
          <button
            onClick={() => setIsEditing(false)}
            className="absolute top-2 right-2 text-gray-600"
          >
            <XMarkIcon width={20} height={20} />
          </button>
          <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Edad"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Sexo"
              value={sexInput}
              onChange={(e) => setSexInput(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Altura (cm)"
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Peso actual (kg)"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded mt-2"
            >
              Guardar
            </button>
          </form>
        </motion.div>
      </div>
    </Dialog>
  );
}
