const router = require("express").Router();
const {
  followUserId,
  getSingleUser,
} = require("../controllers/userController");
const { photoById, getSinglePost } = require("../controllers/photoController");
const passport = require("passport");

const isAuth = passport.authenticate("user", { session: false });

router.get("/:followId/:name", isAuth, getSingleUser);
router.get("/:photoId", isAuth, getSinglePost);

router.param("followId", followUserId);
router.param("photoId", photoById);

module.exports = router;
