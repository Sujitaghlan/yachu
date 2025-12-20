const { Video } = require("../models");

const createVideo = async (req, res) => {
  try {
    const { title, videoUrl, description } = req.body;

    const video = new Video({ title, videoUrl, description });
    await video.save();

    res.status(201).json({ success: true, video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, videoUrl, description } = req.body;

  try {
    const video = await Video.findByIdAndUpdate(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    video.title = title || video.title;
    video.videoUrl = videoUrl || video.videoUrl;
    video.description = description || video.description;
    await video.save();
    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", err: error.message });
  }
};

const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", err: error.message });
  }
};

module.exports = {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
  getVideoById,
};
