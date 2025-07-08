"use client";
import Slider from "react-slick";

const comments = [
  {
    username: "@mathgenius",
    avatar: "/avatars/user1.jpg",
    comment: "Bu platform tam olarak ihtiyacım olan şeydi. Sınav sürecimde çok yardımcı oldu!",
  },
  {
    username: "@studyqueen",
    avatar: "/avatars/user2.jpg",
    comment: "Arayüz çok kullanıcı dostu ve sorular gerçek sınav gibi. Bayıldım!",
  },
  {
    username: "@satready",
    avatar: "/avatars/user3.jpg",
    comment: "Soruların açıklamaları harika, yanlış yaptığım yerleri anında anlıyorum.",
  },
  {
    username: "@elif_oz",
    avatar: "/avatars/user4.jpg",
    comment: "Gerçekten Bluebook gibi hissettiriyor, hatta daha iyi bile olabilir.",
  },
  {
    username: "@kaanworks",
    avatar: "/avatars/user5.jpg",
    comment: "Zamanlayıcı özelliği sayesinde kendimi çok daha iyi hazırlıyorum.",
  },
  {
    username: "@toptier",
    avatar: "/avatars/user6.jpg",
    comment: "Harika bir kaynak, grafiklerle gelişimimi görmek çok motive edici.",
  },
];

const Comments: React.FC = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Yorumlar</h2>
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
