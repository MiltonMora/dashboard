import React from "react";
import Fixed from "@/components/Fixed";
import BasicCard from "@/components/BasicCard";
import { FaWindowClose } from "react-icons/fa";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Fixed>
      <div className="w-full">
        <BasicCard className="w-10/12 md:w-1/2 lg:w-1/4 p-5 pt-10 pb-10 z-20 relative overflow-visible">
          <FaWindowClose
            className="absolute size-8 -top-8 -right-8 rounded-lg text-xl cursor-pointer"
            onClick={onCancel}
          />
          <div className='overflow-hidden'>
            <p className="text-center text-lg mb-4">{message}</p>
            <div className="flex justify-around">
              <button onClick={onConfirm} className="px-4 py-2 rounded-lg">
                Confirmar
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </BasicCard>
      </div>
    </Fixed>
  );
};

export default ConfirmDialog;
