import { prisma } from "../../db";

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        profile: true,
        bankcards: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getMe error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
