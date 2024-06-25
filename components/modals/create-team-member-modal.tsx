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

interface CreateTeamMemberModalProps {}

const CreateTeamMemberModal: FC<CreateTeamMemberModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { agency },
  } = useModal();

  const isModalOpen = isOpen && type === "createTeamMember";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle className="text-2xl  font-bold">
            Add a team member
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send an invitation
          </DialogDescription>
        </DialogHeader>
        <SendInvitation agencyId={agency?.id!} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamMemberModal;
