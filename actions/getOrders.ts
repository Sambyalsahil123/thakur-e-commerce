import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    console.log(error, "this is under error");
    throw new Error(
      error.message || "An error occurred while fetching ORders."
    );
  }
}
