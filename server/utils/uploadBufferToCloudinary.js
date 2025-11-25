const { cloudinary } = require("../config/cloudinary.js");

const uploadBufferToCloudinary = async (buffer, folder = "general") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err || !result) return reject(err || "Cloudinary upload failed");
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = { uploadBufferToCloudinary };