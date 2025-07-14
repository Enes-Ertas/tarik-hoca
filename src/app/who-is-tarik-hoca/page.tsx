// app/who-is-tarik-hoca/page.tsx

import Image from 'next/image'

export default function WhoIsTarikHoca() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#66B3E1] to-[#0077C8] text-white">
      {/* Logo + Başlık */}
      <div className="flex flex-col items-center py-12 px-4 text-center max-w-4xl mx-auto">
        <div className="mb-6">
          {/* Logo alanı — sen buraya görseli yükleyeceksin */}
          <Image
            src="/tarik-hoca-logo.png"
            alt="Tarık Hoca Logo"
            width={300}
            height={300}
            className="rounded-full border border-white shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Who is Tarık Hoca?</h1>
        <p className="text-lg leading-relaxed text-white/90 space-y-4 text-left mt-6">
  <strong>Hello, I'm Tarık Cansızoğlu.</strong> I am an English teacher, SAT exam specialist, math instructor, and advocate for healthy living. In education, I focus not only on academic success but also on the holistic development of the student. I have guided hundreds of students to take significant steps not only in exams but also in life.
  <br /><br />
  I completed my undergraduate studies in English Language Teaching at Kocaeli University. I also spent part of my high school education in Toronto, Canada. This experience not only helped me achieve an advanced level of English, but also provided me with an international perspective, strong discipline, and intercultural awareness. While in Toronto, I swam professionally and earned a provincial championship title in wrestling.
  <br /><br />
  My competence in quantitative fields was strengthened by my education in civil engineering. Thanks to this background, I offer my students a practical, structured, and comprehensive approach—especially in the SAT Math section.
  <br /><br />
  I believe that every student is unique. That’s why I follow a student-centered approach, taking individual differences into account and working with a principle of close monitoring. Throughout my students’ learning journey, I am not only a teacher but also a mentor, motivator, and companion.
  <br /><br />
  For the past six years, I have specialized particularly in the Digital SAT. During this time, I have worked one-on-one with over 400 students. My students have been accepted into prestigious universities in the United States, Canada, Europe, and Turkey.
  <br /><br />
  My students don’t just learn how to solve questions—they also develop healthy life habits. I raise awareness about how nutrition, physical activity, and mental balance contribute to academic success.
  <br /><br />
  If you're looking for a strong mentor to guide you on your path to your dream university, you're in the right place.
</p>

      </div>
    </div>
  )
}
