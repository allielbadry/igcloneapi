const { PrismaClient } = require("@prisma/client");

const { likes } = new PrismaClient();

module.exports = {
  like: async (req, res, next) => {
    try {
      const like = await likes.create({
        data: {
          user_id: req.user.id,
          photo_id: req.photo.id,
        },
      });
      return res.json({
        message: "Liked",
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  unlike: async (req, res, next) => {
    try {
      const unlike = await likes.delete({
        where: {
          user_id_photo_id: {
            user_id: req.user.id,
            photo_id: req.photo.id,
          },
        },
      });
      return res.json({
        message: "Unliked",
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
