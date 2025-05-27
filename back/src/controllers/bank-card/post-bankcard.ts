import { prisma } from "../../db";

export const postBank = async (req, res) => {
  try {
    const {
      country,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      CVC,
      userId,
    } = req.body;

    const bankcard = await prisma.bankcard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        CVC,
        user: {
          connect: { id: userId },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(bankcard);
  } catch (error) {
    console.error("Cardnii medeelel buruu baina", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
