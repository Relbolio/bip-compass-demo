"use server";

import { db } from "@/lib/db";
import { currentUser } from "./auth";
import { redirect } from "next/navigation";
import {
  Agency,
  Category,
  Color,
  Product,
  ProductVariant,
  Role,
  Size,
  SubAccount,
  User,
  Volume,
} from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const getAuthUserDetails = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.email!,
    },
    include: {
      Agency: {
        include: {
          SubAccount: true,
        },
      },
      Permissions: true,
    },
  });

  return userData;
};

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string;
  description: string;
  subaccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;
  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: { id: subaccountId },
          },
        },
      },
    });
    if (response) {
      userData = response;
    }
  } else {
    userData = await db.user.findUnique({
      where: { email: authUser.email! },
    });
  }

  if (!userData) {
    console.log("Could not find a user");
    return;
  }

  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subaccountId) {
      throw new Error(
        "You need to provide atleast an agency Id or subaccount Id"
      );
    }
    const response = await db.subAccount.findUnique({
      where: { id: subaccountId },
    });
    if (response) foundAgencyId = response.agencyId;
  }
  if (subaccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
        SubAccount: {
          connect: { id: subaccountId },
        },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};

export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;
  const response = await db.user.create({ data: { ...user } });
  return response;
};

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");
  const invitationExists = await db.invitation.findUnique({
    where: {
      email: user.email!,
      status: "PENDING",
    },
  });

  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.avatarUrl || "",
      id: user.id,
      name: user.name,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: new Date(),
      password: null,
    });
    await saveActivityLogsNotification({
      agencyId: invitationExists?.agencyId,
      description: `Joined`,
      subaccountId: undefined,
    });

    if (userDetails) {
      // await clerkClient.users.updateUserMetadata(user.id, {
      //   privateMetadata: {
      //     role: userDetails.role || 'SUBACCOUNT_USER',
      //   },
      // })

      await db.user.update({
        where: {
          email: userDetails.email,
        },
        data: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      await db.invitation.delete({
        where: { email: userDetails.email },
      });

      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: {
        email: user.email!,
      },
    });
    return agency ? agency.agencyId : null;
  }
};

export const updateAgencyDetails = async (
  agencyId: string,
  agencyDetails: Partial<Agency>
) => {
  const response = await db.agency.update({
    where: { id: agencyId },
    data: { ...agencyDetails },
  });
  return response;
};

export const deleteAgency = async (agencyId: string) => {
  const response = await db.agency.delete({ where: { id: agencyId } });
  return response;
};

export const initUser = async (newUser: Partial<User>) => {
  const user = await currentUser();
  if (!user) return;

  const userData = await db.user.upsert({
    where: {
      email: user.email,
    },
    update: newUser,
    create: {
      id: user.id,
      avatarUrl: user.avatarUrl,
      email: user.email,
      name: user.name,
      role: newUser.role || "SUBACCOUNT_USER",
    },
  });

  // await clerkClient.users.updateUserMetadata(user.id, {
  //   privateMetadata: {
  //     role: newUser.role || 'SUBACCOUNT_USER',
  //   },
  // })

  return userData;
};

export const upsertAgency = async (agency: Agency) => {
  if (!agency.companyEmail) return null;
  try {
    const agencyDetails = await db.agency.upsert({
      where: {
        id: agency.id,
      },
      update: agency,
      create: {
        users: {
          connect: { email: agency.companyEmail },
        },
        ...agency,
      },
    });
    return agencyDetails;
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationAndUser = async (agencyId: string) => {
  try {
    const response = await db.notification.findMany({
      where: { agencyId },
      include: { User: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const upsertSubAccount = async (subAccount: SubAccount) => {
  if (!subAccount.companyEmail) return null;
  const agencyOwner = await db.user.findFirst({
    where: {
      Agency: {
        id: subAccount.agencyId,
      },
      role: "AGENCY_OWNER",
    },
  });
  if (!agencyOwner) return console.log("🔴Erorr could not create subaccount");
  const permissionId = uuidv4();
  const response = await db.subAccount.upsert({
    where: { id: subAccount.id },
    update: subAccount,
    create: {
      ...subAccount,
      Permissions: {
        create: {
          access: true,
          email: agencyOwner.email,
          id: permissionId,
        },
        connect: {
          subAccountId: subAccount.id,
          id: permissionId,
        },
      },
    },
  });
  return response;
};

export const getUserPermissions = async (userId: string) => {
  const response = await db.user.findUnique({
    where: { id: userId },
    select: { Permissions: { include: { SubAccount: true } } },
  });

  return response;
};

export const updateUser = async (user: Partial<User>) => {
  const response = await db.user.update({
    where: { email: user.email },
    data: { ...user },
  });

  // await clerkClient.users.updateUserMetadata(response.id, {
  //   privateMetadata: {
  //     role: user.role || 'SUBACCOUNT_USER',
  //   },
  // })
  // await db.user.update({
  //   where: {
  //     id: user.id,
  //   },
  //   data: {
  //     role: user.role || "SUBACCOUNT_USER",
  //   },
  // });

  return response;
};

export const changeUserPermissions = async (
  permissionId: string | undefined,
  userEmail: string,
  subAccountId: string,
  permission: boolean
) => {
  try {
    const response = await db.permissions.upsert({
      where: { id: permissionId },
      update: { access: permission },
      create: {
        access: permission,
        email: userEmail,
        subAccountId: subAccountId,
      },
    });
    return response;
  } catch (error) {
    console.log("🔴Could not change persmission", error);
  }
};

export const getSubaccountDetails = async (subaccountId: string) => {
  const response = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  });
  return response;
};

export const deleteSubAccount = async (subaccountId: string) => {
  const response = await db.subAccount.delete({
    where: {
      id: subaccountId,
    },
  });
  return response;
};

export const deleteUser = async (userId: string) => {
  // await clerkClient.users.updateUserMetadata(userId, {
  //   privateMetadata: {
  //     role: undefined,
  //   },
  // })
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role: undefined,
    },
  });
  const deletedUser = await db.user.delete({ where: { id: userId } });

  return deletedUser;
};

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const createSize = async (sizeData: Size) => {
  const response = await db.size.create({
    data: { ...sizeData },
  });

  return response;
};

export const createColor = async (colorData: Color) => {
  const response = await db.color.create({
    data: { ...colorData },
  });

  return response;
};

export const createVolume = async (volumeData: Volume) => {
  const response = await db.volume.create({
    data: { ...volumeData },
  });

  return response;
};

export const createCategory = async (categoryData: Category) => {
  const response = await db.category.create({
    data: { ...categoryData },
  });

  return response;
};

export const createProductVariant = async (
  productData: Product,
  variantData: ProductVariant,
  componentsVariant: {
    description: string | null;
    sku: string;
    price: number;
    quantity: number;
    sizeId?: string;
    colorId?: string;
    volumeId?: string;
  }[]
) => {
  const product = await db.product.create({
    data: { ...productData },
  });

  // const response = await db.productVariant.create({
  //   data: { ...variantData },
  // });

  await Promise.all(
    componentsVariant.map(async (component) => {
      await db.productVariant.create({
        data: {
          ...component,
          productId: product.id,
        },
      });
    })
  );

  return product;
};

export const addVariantToProduct = async (
  productId: string,
  variantData: ProductVariant
) => {
  const response = await db.productVariant.create({
    data: {
      ...variantData,
      productId,
    },
  });

  return response;
};

export const createCompositeProduct = async (
  productData: Product,
  components: Array<{ componentProductId: string; quantity: number }>
) => {
  const product = await db.product.create({
    data: { ...productData },
  });

  await Promise.all(
    components.map(async (component) => {
      await db.compositeProduct.create({
        data: {
          parentProductId: product.id,
          componentProductId: component.componentProductId,
          quantity: component.quantity,
        },
      });
    })
  );

  return product;
};

export const getAllProducts = async (agencyId: string) => {
  const response = await db.product.findMany({
    where: {
      agencyId,
    },
    include: {
      productVariants: true,
      compositeComponents: true,
      compositeParents: true,
    },
  });

  return response;
};

export const getProductById = async (productId: string) => {
  const response = await db.product.findUnique({
    where: { id: productId },
    include: {
      productVariants: true,
      compositeComponents: true,
      compositeParents: true,
    },
  });

  return response;
};

export const deleteVariantTypes = async (
  variantTypeId: string,
  type: "size" | "color" | "volume"
) => {
  let response;
  if (type === "size") {
    response = await db.size.delete({
      where: { id: variantTypeId },
    });
  }
  if (type === "color") {
    response = await db.color.delete({
      where: { id: variantTypeId },
    });
  }

  if (type === "volume") {
    response = await db.volume.delete({
      where: { id: variantTypeId },
    });
  }

  return response;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await db.category.delete({
    where: { id: categoryId },
  });

  return response;
};

// export const sendInvitation = async (
//   role: Role,
//   email: string,
//   agencyId: string
// ) => {
//   const resposne = await db.invitation.create({
//     data: { email, agencyId, role },
//   })

//   try {
//     const invitation = await clerkClient.invitations.createInvitation({
//       emailAddress: email,
//       redirectUrl: process.env.NEXT_PUBLIC_URL,
//       publicMetadata: {
//         throughInvitation: true,
//         role,
//       },
//     })
//   } catch (error) {
//     console.log(error)
//     throw error
//   }

//   return resposne
// }
