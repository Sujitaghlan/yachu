const express = require("express");

const verifyAdmin = async (req, res, next) => {
  const {isAdmin} = req.user;
  if(!isAdmin){
    return res.status(400).json({message: "Only admin can access"});
  }
  next();
}

module.exports = {verifyAdmin};