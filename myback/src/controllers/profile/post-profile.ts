import { prisma } from "../../db";

export const postProfile = async (req, res) => {
  try {
    const { userId, about, avatarImage, name, socialMedia, backGroundImage } =
      req.body;
    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMedia,
        user: {
          connect: { id: userId },
        },
        backGroundImage: backGroundImage || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    console.log("error", error);
  }
};
