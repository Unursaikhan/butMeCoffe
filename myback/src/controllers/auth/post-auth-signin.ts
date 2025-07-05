import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const postAuthSignin = async (req, res) => {
  const { email, password } = req.body;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET is not configured" });
  }
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        bankcards: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email эсвэл нууц үг буруу байна!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Email эсвэл нууц үг буруу байна!" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string, // secret key
      { expiresIn: "7d" } // options
    );

    // Remove password before returning user data
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Серверийн алдаа", error });
  }
};
