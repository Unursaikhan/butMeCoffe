import { prisma } from "../../db";

export const putBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, firstName, lastName, cardNumber, expiryDate, CVC } =
      req.body;

    const updatedBankcard = await prisma.bankcard.update({
      where: { id: Number(id) },
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        CVC,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updatedBankcard);
  } catch (error) {
    console.error("Failed to update bankcard:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
