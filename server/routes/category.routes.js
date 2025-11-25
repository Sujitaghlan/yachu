const express = require("express");
const {createCategory, getAllCategories, deleteCategory, updateCategory} = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/category", createCategory); 
categoryRouter.get("/category", getAllCategories);
categoryRouter.delete("/category/:id", deleteCategory);
categoryRouter.put("/category/:id", updateCategory);

module.exports = {categoryRouter};
