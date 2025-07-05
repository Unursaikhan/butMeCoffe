import { prisma } from "../../db";

export const getRecentDonations = async (req, res) => {
  const userId = Number(req.params.userId);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const donations = await prisma.donations.findMany({
      where: {
        recipientId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        specialMessage: true,
        amount: true,
        sender: {
          select: {
            profile: {
              select: {
                name: true,
                avatarImage: true,
              },
            },
          },
        },
      },
    });
    return res.json(donations);
  } catch (error) {
    console.error("Failed to fetch recent donations:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
