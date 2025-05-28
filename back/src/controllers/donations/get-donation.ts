import { prisma } from "../../db";

export const getDonations = async (req, res) => {
  try {
    const donations = await prisma.donations.findMany({
      include: {
        sender: {
          select: {
            id: true,
            profile: {
              select: {
                avatarImage: true,
                name: true,
                socialMedia: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
