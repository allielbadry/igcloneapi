const { PrismaClient } = require("@prisma/client");
const { photos } = new PrismaClient();

module.exports = {
  photoById: async (req, res, next, id) => {
    try {
      const photo = await photos.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!photo) {
        return res.json({
          error: "Photo not Found",
        });
      }
      req.photo = photo;
      next();
    } catch (err) {
      res.json({
        error: err,
      });
    }
  },
  createPhoto: async (req, res, next) => {
    try {
      const post = await photos.create({
        data: {
          image_url: req.body.image,
          user_id: req.user.id,
        },
        select: {
          image_url: true,
          created_at: true,
          users: {
            select: {
              username: true,
            },
          },
        },
      });
      return res.json(post);
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  getPhotos: async (req, res, next) => {
    try {
      const photo = await photos.findMany({
        select: {
          image_url: true,
          created_at: true,
          users: {
            select: {
              username: true,
            },
          },
          comments: {
            select: {
              comment_text: true,
              created_at: true,
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          likes: {
            select: {
              created_at: true,
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      });
      return res.json(photo);
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  updatePhoto: async (req, res, next) => {
    try {
      if (req.user.id === req.photo.user_id) {
        const photo = await photos.update({
          where: {
            id: req.photo.id,
          },
          data: {
            image_url: req.body.image,
          },
          select: {
            image_url: true,
            created_at: true,
            users: {
              select: {
                username: true,
              },
            },
            comments: {
              select: {
                comment_text: true,
                created_at: true,
                users: {
                  select: {
                    username: true,
                  },
                },
              },
            },
            likes: {
              select: {
                created_at: true,
                users: {
                  select: {
                    username: true,
                  },
                },
              },
            },
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        });
        return res.json(photo);
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
  deletePhoto: async (req, res, next) => {
    try {
      if (req.user.id === req.photo.user_id) {
        const photo = await photos.delete({
          where: {
            id: req.photo.id,
          },
        });
        return res.json({
          message: "Photo is Deleted",
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
  getSinglePost: async (req, res, next) => {
    try {
      const photo = await photos.findUnique({
        where: {
          id: req.photo.id,
        },
        select: {
          image_url: true,
          created_at: true,
          users: {
            select: {
              username: true,
            },
          },
          comments: {
            select: {
              comment_text: true,
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          likes: {
            select: {
              users: {
                select: {
                  username: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      });
      return res.json({
        photo,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
