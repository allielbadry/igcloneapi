const router = require("express").Router();
const passport = require("passport");
const { photoById } = require("../controllers/photoController");
const likeController = require("../controllers/likeController");

const isAuth = passport.authenticate("user", { session: false });

router.post("/:photoId/like", isAuth, likeController.like);
router.delete("/:photoId/unlike", isAuth, likeController.unlike);

router.param("photoId", photoById);

module.exports = router;
