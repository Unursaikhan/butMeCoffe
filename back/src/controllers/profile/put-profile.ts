import { prisma } from "../../db";

export const putProfile = async (req, res) => {
  const { userId, ...data } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const updated = await prisma.profile.update({
      where: { userId: Number(userId) },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Failed to update profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
