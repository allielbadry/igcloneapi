const router = require("express").Router();

router.use("/user", require("./userRoute"));
router.use("/photo", require("./photoRoute"));
router.use("/", require("./commentRoute"));
router.use("/", require("./likeRoute"));
router.use("/", require("./followRoute"));
router.use("/", require("./singleDetailRoute"));

module.exports = router;
