"use client";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const videoUrls = [
  "https://www.tiktok.com/@tarik_hoca/video/7476962236540390664?_r=1&_t=ZS-8y2UvQMqkEs",
  "https://www.tiktok.com/@tarik_hoca/video/7476964440282336519?_r=1&_t=ZS-8y2UzdMghj6",
  "https://www.tiktok.com/@tarik_hoca/video/7477564574170877202?_r=1&_t=ZS-8y2V4ntpccE",
  "https://www.tiktok.com/@tarik_hoca/video/7476963770942721298?_r=1&_t=ZS-8y2V9XnRtxA",
  "https://www.tiktok.com/@tarik_hoca/video/7484182895066729736?_r=1&_t=ZS-8y2VC2mhctr"


];

export default function StudentResults() {
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.tiktok.com/embed.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    // TikTok embed script yüklendikten sonra tekrar tetikle
    if ((window as any).tiktokEmbedLoad) {
      (window as any).tiktokEmbedLoad();
    }
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);


  return (
    <section className="py-12 bg-[#F9FAFB]">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Student Results</h2>
      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
        >
          {videoUrls.map((url, idx) => {
            const videoId = url.split("/").pop();
            return (
              <SwiperSlide key={idx}>
                <blockquote
                  className="tiktok-embed"
                  cite={url}
                  data-video-id={videoId}
                  style={{ maxWidth: "100%" }}
                >
                  <section></section>
                </blockquote>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
