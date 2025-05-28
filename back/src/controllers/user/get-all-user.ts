import { prisma } from "../../db";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
