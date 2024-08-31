const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController.js");

router.get("/", inventoryController.displayIndex);
router.post("/delete/:id", inventoryController.deleteRow);
router.get("/gamedetails/:id", inventoryController.displayGameDetails);

module.exports = router;