import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        profile: true,
        bankcard: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
