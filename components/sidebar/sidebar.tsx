import { getAuthUserDetails } from "@/lib/queries";
import { off } from "process";
import React from "react";
import MenuOptions from "./menu-options";
import {
  ArrowLeftRight,
  Box,
  Boxes,
  Component,
  Contact,
  CreditCard,
  Layout,
  LayoutDashboard,
  NotebookTabs,
  Package,
  PencilRuler,
  Settings,
  ShieldHalf,
  ShoppingBasket,
  Users,
} from "lucide-react";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

export type sidebarOptProps = {
  name: string;
  icon: React.JSX.Element;
  link: string;
  subMenu?: {
    name: string;
    icon?: React.JSX.Element;
    link: string;
  }[];
}[];

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabeledAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/bip-logo.png";

  if (!isWhiteLabeledAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt: sidebarOptProps =
    type === "agency"
      ? [
          {
            name: "Dashboard",
            icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}`,
            subMenu: undefined,
          },
          {
            name: "Launchpad",
            icon: <NotebookTabs className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/launchpad`,
            subMenu: undefined,
          },
          {
            name: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/billing`,
            subMenu: undefined,
          },
          {
            name: "Sub Accounts",
            icon: <Boxes className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/all-subaccounts`,
            subMenu: undefined,
          },
          {
            name: "Team",
            icon: <ShieldHalf className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/team`,
            subMenu: undefined,
          },
          {
            name: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/settings`,
            subMenu: undefined,
          },
        ]
      : [
          {
            name: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            link: `/subaccount/${id}/settings`,
            subMenu: undefined,
          },
          {
            name: "Stocks",
            icon: <ArrowLeftRight className="h-4 w-4 mr-2" />,
            link: `/subaccount/${id}/stocks`,
            subMenu: [
              {
                name: "Stocks movement",
                link: `/subaccount/${id}/stocks/movement`,
              },
              {
                name: "Transfert",
                link: `/subaccount/${id}/stocks/transfert`,
              },
              {
                name: "Order",
                link: `/subaccount/${id}/stocks/order`,
              },
            ],
          },
          {
            name: "Products",
            icon: <ShoppingBasket className="h-4 w-4 mr-2" />,
            link: `/subaccount/${id}/products`,
            subMenu: [
              {
                name: "Category",
                link: `/subaccount/${id}/products/category`,
              },
              {
                name: "Simple Products",
                link: `/subaccount/${id}/products/simple`,
              },
              {
                name: "Compound product",
                link: `/subaccount/${id}/products/compound`,
              },
            ],
          },
          {
            name: "Contacts",
            icon: <Contact className="h-4 w-4 mr-2" />,
            link: `/subaccount/${id}/contacts`,
            subMenu: undefined,
          },
          {
            name: "Dashboard",
            icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
            link: `/subaccount/${id}`,
            subMenu: undefined,
          },
        ];

  const sidebarProductOpt: sidebarOptProps =
    type === "agency"
      ? [
          {
            name: "Categories",
            icon: <Component className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/categories`,
            subMenu: undefined,
          },
          {
            name: "Variants",
            icon: <PencilRuler className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/variants`,
            subMenu: undefined,
          },
          {
            name: "Products",
            icon: <Package className="h-4 w-4 mr-2" />,
            link: `/agency/${user?.Agency?.id}/products`,
            subMenu: undefined,
          },
        ]
      : [
          {
            name: "Products",
            icon: <Package className="h-4 w-4 mr-2" />,
            link: `/subaccount/${user?.Agency?.id}/products`,
            subMenu: undefined,
          },
        ];

  // const sidebarOpt =
  //   type === 'agency'
  //     ? user.Agency.SidebarOption || []
  //     : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
  //         ?.SidebarOption || []

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );

  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        sidebarProductOpt={sidebarProductOpt}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subaccounts}
        sidebarProductOpt={sidebarProductOpt}
        user={user}
      />
    </>
  );
};

export default Sidebar;
