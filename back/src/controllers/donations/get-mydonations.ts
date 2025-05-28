import { prisma } from "../../db";

export const getMyDonations = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId query param" });
    }

    const donations = await prisma.donations.findMany({
      where: { recipientId: Number(userId) },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                name: true,
                avatarImage: true,
                socialMedia: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
