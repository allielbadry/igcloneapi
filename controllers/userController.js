const { PrismaClient, Prisma } = require("@prisma/client");
const utils = require("../libs/utils");

// get the user model
const { users } = new PrismaClient();

module.exports = {
  followUserId: async (req, res, next, id) => {
    try {
      const user = await users.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        return res.json({
          error: "User not Found",
        });
      }
      req.follow = user;
      next();
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  createUser: async (req, res, next) => {
    const hashPassword = utils.generateHashedPassword(req.body.password);
    const hash = hashPassword.hashPassword;
    const salt = hashPassword.salt;
    const existUser = await users.findUnique({
      where: { email: req.body.email },
    });
    try {
      if (existUser) {
        return res.json({
          error: "Email is already taken",
        });
      }
      const user = await users.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          hash: hash,
          salt: salt,
        },
      });
      const token = utils.issueJwt(user);
      return res.json({
        message: "Account Sign up",
        user: user,
        token: token.token,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  signInUser: async (req, res, next) => {
    const user = await users.findUnique({
      where: {
        email: req.body.email,
      },
    });
    try {
      if (!user) {
        return res.json({
          error: "User not found",
        });
      }
      const isValid = utils.ValidatePassword(
        req.body.password,
        user.salt,
        user.hash
      );
      if (!isValid) {
        return res.json({
          error: "Username or Password does not Match",
        });
      }
      const token = utils.issueJwt(user);
      return res.json({
        message: "Login Success",
        token: token.token,
        expiresIn: token.expires,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  getUsers: async (req, res, next) => {
    const user = await users.findMany({
      select: {
        username: true,
        email: true,
        created_at: true,
        photos: {
          select: {
            image_url: true,
            created_at: true,
          },
        },
        _count: {
          select: {
            follows_follows_followee_idTousers: true,
            follows_follows_follower_idTousers: true,
          },
        },
      },
    });
    try {
      return res.json(user);
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
  getSingleUser: async (req, res, next) => {
    try {
      const user = await users.findUnique({
        where: {
          id: req.follow.id,
        },
        select: {
          username: true,
          email: true,
          created_at: true,
          photos: {
            select: {
              image_url: true,
              created_at: true,
            },
          },
          follows_follows_followee_idTousers: true,
          follows_follows_follower_idTousers: true,
          _count: {
            select: {
              photos: true,
              follows_follows_followee_idTousers: true,
              follows_follows_follower_idTousers: true,
            },
          },
        },
      });
      return res.json({
        user,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  },
};
