"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const comments = [
  {
    username: "@a_rsalan",
    avatar: "/avatars/@a_rsalan.jpeg",
    comment: "I joined your free course and it was amazing I learned a-lot appreciate your time 🤍",
  },
  {
    username: "@taskin_tuana",
    avatar: "/avatars/@taskin_tuana.jpeg",
    comment: "They say 'some people are meant to be teachers,' and I never truly understood what that meant until I met Tarık teacher. He is truly born to teach. Thanks for everything Teacher!!",
  },
  {
    username: "@thisismerrii",
    avatar: "/avatars/@thisismerrii.jpeg",
    comment: "It was my first lesson.Lesson was super clear and well-structured.The quality of the questions really helps reinforce the concepts love how clearly everything is explained💗💗",
  },
  {
    username: "@omerxkeskin",
    avatar: "/avatars/@omerxkeskin.jpeg",
    comment: "Best teacher in the worldd",
  },
  {
    username: "@aras.mp4",
    avatar: "/avatars/@aras.mp4.jpeg",
    comment: "Thank you for your great help and was wonderful working with you!!",
  },
  {
    username: "@kbeyzacakil",
    avatar: "/avatars/@kbeyzacakil.jpeg",
    comment: "Dersimiz çok verimli geçti. Soru ve kelime tahminlerini paylaştı. Seçtiği sorular zorlayıcıydı ama anlatımı ve açıklamaları ile kolay bir hale geldi. Herkesin sorularını özenle cevapladı.Teşekkürler💐",
  },
];

const Comments: React.FC = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Comments</h2>
      <div className="max-w-5xl mx-auto px-4">
        <Slider {...settings}>
          {comments.map((c, i) => (
            <div key={i} className="px-3">
              <div className="bg-white border rounded-lg shadow-sm p-6 h-full flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.username} className="w-10 h-10 rounded-full" />
                  <span className="font-semibold text-gray-800">{c.username}</span>
                </div>
                <p className="text-gray-700 text-sm">{c.comment}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Comments;
