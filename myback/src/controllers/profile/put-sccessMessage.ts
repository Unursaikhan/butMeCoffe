// controllers/profile/putSuccessMessage.ts
import { prisma } from "../../db";

export const putSuccessMessage = async (req, res) => {
  const { userId, successMessage } = req.body;
  if (typeof successMessage !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid successMessage" });
  }
  try {
    const updated = await prisma.profile.update({
      where: { userId: Number(userId) },
      data: { successMessage, updatedAt: new Date() },
    });
    res.json(updated);
  } catch (err) {
    console.error("Failed to update successMessage:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
