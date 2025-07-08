// app/pricing/page.tsx

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
      <div className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          SAT İngilizce Soru Bankası – <span className="text-yellow-300">$100</span>
        </h1>
        <div className="text-left text-white/90 space-y-6">
          <p>
            Hazırladığım bu özel SAT İngilizce Soru Bankası, sadece bilgi ölçmeyi değil, sınavın mantığını kavratmayı hedefleyen yüksek kaliteli ve özgün sorulardan oluşmaktadır. Sorular, <strong>Digital SAT</strong> formatına birebir uygun şekilde tasarlanmıştır ve içerik bakımından gerçek sınav deneyimini yaşatacak niteliktedir.
          </p>
          <p>
            Her bir soru, zorluk derecesine göre özel olarak sınıflandırılmış ve detaylı açıklamalarla desteklenmiştir. Öğrenciler, yalnızca doğru cevabı değil, neden o cevabın doğru olduğunu da anlayarak <strong>kalıcı öğrenme</strong> sağlar.
          </p>
          <p>
            Bazı sorularım, öyle gerçekçi ve sınava uygun şekilde hazırlanmıştır ki, öğrencilerim tarafından <em>“tıpatıp sınavda çıkan soruya benziyordu”</em> şeklinde yorumlar almıştır. Bu da soru bankasının ne kadar isabetli ve sınav odaklı olduğunun bir göstergesidir.
          </p>
          <p>
            Soru bankama, web sitem üzerinden açıklamalarıyla birlikte ulaşabilir; sadece İngilizce bölümüyle ilgili hedefinize yönelik en <strong>etkili hazırlığı</strong> yapabilirsiniz.
          </p>
          <p className="pt-4 text-lg font-semibold text-yellow-200">
            Satın almak veya detaylı bilgi almak için <a href="mailto:aceyouredu@gmail.com" className="underline hover:text-yellow-300">aceyouredu@gmail.com</a> adresinden benimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
