const router = require("express").Router();
const cartController = require("./controller");
const { police_check } = require("../../middlewares");

router.put("/carts", cartController.update);
router.get("/carts", cartController.index);

module.exports = router;