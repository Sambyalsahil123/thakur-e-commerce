import prisma from "@/libs/prismadb";

export default async function getUsers() {
  try {
    const users = await prisma?.user.findMany();
    return users;
  } catch (error: any) {
    console.log(error, "this is under error");
    throw new Error(error.message || "An error occurred while fetching Users.");
  }
}
