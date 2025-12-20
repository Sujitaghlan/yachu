// VideoEmbed.jsx
export default function VideoEmbed({ url }) {
  if (!url) return null;

  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId =
      url.includes("youtu.be") ? url.split("youtu.be/")[1] : new URL(url).searchParams.get("v");

    return (
      <iframe
        className="w-full aspect-video rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    );
  }

  // TikTok
  if (url.includes("tiktok.com")) {
    return (
      <iframe
        className="w-full h-[400px] rounded-lg"
        src={`https://www.tiktok.com/embed/v2/${url.split("/video/")[1]}`}
        allowFullScreen
      />
    );
  }

  // Instagram
  if (url.includes("instagram.com")) {
    return (
      <iframe
        className="w-full h-[400px] rounded-lg"
        src={`${url}embed`}
        allowFullScreen
      />
    );
  }

  // Facebook
  if (url.includes("facebook.com")) {
    return (
      <iframe
        className="w-full h-[350px] rounded-lg"
        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`}
        allowFullScreen
      />
    );
  }

  // Fallback for direct video URL
  return (
    <video controls className="w-full rounded-lg">
      <source src={url} />
    </video>
  );
}
