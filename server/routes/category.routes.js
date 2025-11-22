const express = require("express");
const {createCategory, getAllCategories, deleteCategory, updateCategory} = require("../controllers/category.controller");

const categoryRouter = express.Router();

router.post("/category", createCategory); 
router.get("/category", getAllCategories);
router.delete("/category/:id", deleteCategory);
router.put("/category/:id", updateCategory);

module.exports = {categoryRouter};
