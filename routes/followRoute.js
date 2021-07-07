const router = require("express").Router();
const passport = require("passport");
const followController = require("../controllers/followController");
const { followUserId } = require("../controllers/userController");

const isAuth = passport.authenticate("user", { session: false });

router.post("/:followId/follow", isAuth, followController.follow);
router.delete("/:followId/unfollow", isAuth, followController.unfollow);

router.param("followId", followUserId);

module.exports = router;
