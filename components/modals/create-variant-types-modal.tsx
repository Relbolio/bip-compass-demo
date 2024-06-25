"use client";

import React, { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import VariantTypesForm from "@/components/forms/variant-types-form";

interface CreateVariantTypesModalProps {}

const CreateVariantTypesModal: FC<CreateVariantTypesModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { agency, variantType },
  } = useModal();

  const isModalOpen = isOpen && type === "createVariantTypes";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl  font-bold">
            Add a {variantType}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500"></DialogDescription>
        </DialogHeader>
        <VariantTypesForm
          agencyId={agency?.id!}
          onClose={handleClose}
          type={variantType!}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateVariantTypesModal;
