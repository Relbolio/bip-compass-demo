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

import SendInvitation from "../forms/send-invitation";
import CategoryForm from "../forms/category-form";

interface CreateCategoryModalProps {}

const CreateCategoryModal: FC<CreateCategoryModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { agency },
  } = useModal();

  const isModalOpen = isOpen && type === "createCategory";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl  font-bold">
            Add a Category
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500"></DialogDescription>
        </DialogHeader>
        <CategoryForm agencyId={agency?.id!} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
