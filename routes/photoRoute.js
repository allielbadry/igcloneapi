const photoController = require("../controllers/photoController");
const passport = require("passport");
const router = require("express").Router();

const isAuth = passport.authenticate("user", { session: false });

router.post("/new", isAuth, photoController.createPhoto);
router.get("/", isAuth, photoController.getPhotos);
router.put("/:photoId", isAuth, photoController.updatePhoto);
router.delete("/:photoId", isAuth, photoController.deletePhoto);

router.param("photoId", photoController.photoById);

module.exports = router;
