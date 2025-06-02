import { prisma } from "../../db";

export const getUserBankcard = async (req, res) => {
  try {
    const { userId } = req.params;

    const bankcard = await prisma.bankcard.findFirst({
      where: { userId: Number(userId) },
    });

    if (!bankcard)
      return res.status(404).json({ error: "Bankcard not found." });

    res.status(200).json(bankcard);
  } catch (error) {
    console.error("Failed to get bankcard:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
