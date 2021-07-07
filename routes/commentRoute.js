const router = require("express").Router();
const passport = require("passport");
const commentController = require("../controllers/commentController");
const { photoById } = require("../controllers/photoController");

const isAuth = passport.authenticate("user", { session: false });

router.post("/:photoId/comment", isAuth, commentController.createComment);
router.put(
  "/:photoId/comment/:commentId",
  isAuth,
  commentController.updateComment
);
router.delete(
  "/:photoId/comment/:commentId",
  isAuth,
  commentController.deleteComment
);

router.param("photoId", photoById);
router.param("commentId", commentController.commentById);

module.exports = router;
