import { prisma } from "../../db";

export const postDonation = async (req, res) => {
  try {
    const { amount, specialMessage, recipientId, senderId } = req.body;

    if (!amount || !recipientId || !senderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const donation = await prisma.donations.create({
      data: {
        amount,
        specialMessage,
        recipientId,
        senderId,
      },
    });

    res.status(201).json(donation);
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
