import { prisma } from "../../db";

export const usernameExists = async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
