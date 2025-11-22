const { Category } = require("../models/Category.model");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;   
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }   
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: "Category created successfully", category });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.status(200).json({ categories });
  }   
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;      
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    } 
    res.status(200).json({ message: "Category deleted successfully" });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {    
  try { 
    const { id } = req.params;
    const { name, description } = req.body;      
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (name) category.name = name;
    if (description) category.description = description;      
    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}



module.exports = {createCategory, getAllCategories, deleteCategory, updateCategory};