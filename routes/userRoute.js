const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController");

const isAuth = passport.authenticate("user", { session: false });

router.post("/signup", userController.createUser);
router.post("/signin", userController.signInUser);
router.get("/", isAuth, userController.getUsers);

module.exports = router;
