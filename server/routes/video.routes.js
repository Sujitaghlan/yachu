const express = require("express");
const { createVideo, getVideos, updateVideo, deleteVideo, getVideoById } = require("../controllers/video.controller");

const videoRouter = express.Router();

videoRouter.post("/videos", createVideo);
videoRouter.get("/videos", getVideos);
videoRouter.get("/videos/:id", getVideoById);
videoRouter.put("/videos/:id", updateVideo);
videoRouter.delete("/videos/:id", deleteVideo);  

module.exports = { videoRouter };