const { PrismaClient } = require("@prisma/client");

const { follows } = new PrismaClient();

module.exports = {
  follow: async (req, res, next) => {
    try {
      const follow = await follows.create({
        data: {
          follower_id: req.user.id,
          followee_id: req.follow.id,
        },
      });
      return res.json({
        message: "Followed",
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  unfollow: async (req, res, next) => {
    try {
      const unfollow = await follows.delete({
        where: {
          follower_id_followee_id: {
            followee_id: req.follow.id,
            follower_id: req.user.id,
          },
        },
      });
      return res.json({
        message: "Unfollowed",
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
