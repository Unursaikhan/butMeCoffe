import { prisma } from "../../db";

export const getUserProfileByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        profile: true,
        receivedDonations: {
          include: { sender: { select: { username: true, profile: true } } },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
