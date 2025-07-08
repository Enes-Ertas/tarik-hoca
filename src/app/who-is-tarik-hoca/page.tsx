// app/who-is-tarik-hoca/page.tsx

import Image from 'next/image'

export default function WhoIsTarikHoca() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Logo + Başlık */}
      <div className="flex flex-col items-center py-12 px-4 text-center max-w-4xl mx-auto">
        <div className="mb-6">
          {/* Logo alanı — sen buraya görseli yükleyeceksin */}
          <Image
            src="/tarik-hoca-logo.png"
            alt="Tarık Hoca Logo"
            width={100}
            height={100}
            className="rounded-full border border-white shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Tarık Hoca Kimdir?</h1>
        <p className="text-lg leading-relaxed text-white/90 space-y-4 text-left mt-6">
          <strong>Merhaba, ben Tarık Cansızoğlu.</strong> İngilizce öğretmeni, SAT sınav uzmanı, matematik eğitmeni ve sağlıklı yaşam savunucusuyum. Eğitimde yalnızca akademik başarıya değil, öğrencinin tüm yönleriyle gelişimine odaklanırım. Bugüne kadar yüzlerce öğrencinin hem sınavlarda hem de hayatta önemli adımlar atmasına rehberlik ettim.
          <br /><br />
          Lisans eğitimimi Kocaeli Üniversitesi İngilizce Öğretmenliği bölümünde tamamladım. Lise eğitimimin bir kısmını ise Kanada’nın Toronto şehrinde aldım. Bu süreç bana yalnızca ileri düzey İngilizce kazandırmakla kalmadı, aynı zamanda uluslararası bakış açısı, disiplin ve kültürlerarası farkındalık da sağladı. Toronto’da profesyonel olarak yüzmeyle ilgilendim ve güreşte eyalet birinciliği elde ettim.
          <br /><br />
          Sayısal alandaki yetkinliğim ise inşaat mühendisliği eğitimi almamla perçinlendi. Bu altyapı sayesinde özellikle SAT Math alanında öğrencilerime pratik, sistemli ve kavrayıcı bir eğitim sunuyorum.
          <br /><br />
          Eğitim anlayışımda her öğrenci özeldir. Bu nedenle öğrenci odaklı bir sistemle ilerler, bireysel farklılıkları dikkate alır ve yakın takip prensibiyle çalışırım. Öğrencilerimin gelişim sürecinde sadece bir öğretmen değil, aynı zamanda bir danışman, motivatör ve yol arkadaşı olarak onların yanındayım.
          <br /><br />
          Son altı yılı aşkın süredir özellikle Digital SAT üzerine uzmanlaştım. Bu süre zarfında 400’den fazla öğrenciyle birebir çalıştım. Öğrencilerim Amerika, Kanada, Avrupa ve Türkiye’nin prestijli üniverselerine kabul edildiler.
          <br /><br />
          Benimle çalışan öğrenciler yalnızca soru çözmeyi değil, doğru yaşam alışkanlıklarını da öğrenirler. Sağlıklı beslenmenin, fiziksel aktivitenin ve ruhsal dengenin akademik başarıyı nasıl etkilediğini anlatır, öğrencilerimi bilinçlendiririm.
          <br /><br />
          Eğer siz de hayalini kurduğunuz üniversiteye giden yolda kendinize güçlü bir rehber arıyorsanız, doğru yerdesiniz.
        </p>
      </div>
    </div>
  )
}
