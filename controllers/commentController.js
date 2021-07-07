const { PrismaClient } = require("@prisma/client");

const { comments } = new PrismaClient();

module.exports = {
  commentById: async (req, res, next, id) => {
    try {
      const comment = await comments.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!comment) {
        return res.json({
          error: "Comment no Found",
        });
      }
      req.comment = comment;
      next();
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  createComment: async (req, res, next) => {
    try {
      const comment = await comments.create({
        data: {
          comment_text: req.body.comment,
          user_id: req.user.id,
          photo_id: req.photo.id,
        },
      });
      return res.json(comment);
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  updateComment: async (req, res, next) => {
    try {
      if (req.user.id === req.comment.user_id) {
        const comment = await comments.update({
          where: {
            id: req.comment.id,
          },
          data: {
            comment_text: req.body.comment,
          },
        });
        return res.json(comment);
      } else {
        return res.json({
          error: "Unauthorized",
        });
      }
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      if (
        req.user.id === req.comment.user_id ||
        req.user.id === req.photo.user_id
      ) {
        const comment = await comments.delete({
          where: {
            id: req.comment.id,
          },
        });
        return res.json({
          message: "Comment Deleted",
        });
      } else {
        return res.json({
          error: "Unauthorized",
        });
      }
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
