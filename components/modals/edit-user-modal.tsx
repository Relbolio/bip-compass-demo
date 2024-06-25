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

import UserForm from "../forms/user-form";

interface EditUserModalProps {}

const EditUserModal: FC<EditUserModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { agency, subaccounts, accountType, user },
  } = useModal();

  const isModalOpen = isOpen && type === "editUser";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl  font-bold">
            Edit User Details
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            You can change permissions only when the user has an owned
            subaccount
          </DialogDescription>
        </DialogHeader>
        <UserForm
          type={accountType!}
          id={agency?.id || null}
          subAccounts={subaccounts}
          userData={user}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
