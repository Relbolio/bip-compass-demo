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

import * as z from "zod";

import { Agency } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";

import SubAccountForm from "../forms/subaccount-form";

interface CreateSubaccountModalProps {}

const CreateSubaccountModal: FC<CreateSubaccountModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { agency, subaccount, userId, userName },
  } = useModal();

  const isModalOpen = isOpen && type === "createSubaccount";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl  font-bold">
            Create A Subaccount
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            You can switch between your agency account and the subaccount from
            the sidebar
          </DialogDescription>
        </DialogHeader>
        <SubAccountForm
          agencyDetails={agency as Agency}
          userId={userId || ""}
          userName={userName || ""}
          details={subaccount}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubaccountModal;
