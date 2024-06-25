"use client";

import CreateAgencyModal from "@/components/modals/create-agency-modal";
import { useEffect, useState } from "react";
import { DeleteAgencyModal } from "@/components/modals/delete-agency-modal";
import CreateSubaccountModal from "@/components/modals/create-subaccount-modal";
import { DeleteSubaccountModal } from "@/components/modals/delete-subaccount-modal";
import CreateTeamMemberModal from "@/components/modals/create-team-member-modal";
import { DeleteUserModal } from "@/components/modals/delete-user-modal";
import EditUserModal from "@/components/modals/edit-user-modal";
import CreateCategoryModal from "@/components/modals/create-category-modal";
import CreateVariantTypesModal from "@/components/modals/create-variant-types-modal";
import { DeleteVariantTypesModal } from "@/components/modals/delete-variant-types-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateAgencyModal />
      <DeleteAgencyModal />
      <CreateSubaccountModal />
      <DeleteSubaccountModal />
      <CreateTeamMemberModal />
      <DeleteUserModal />
      <EditUserModal />
      <CreateCategoryModal />
      <CreateVariantTypesModal />
      <DeleteVariantTypesModal />
      <DeleteCategoryModal />
    </>
  );
};
