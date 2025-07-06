'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Profile = {
  id: string
  full_name: string
  username: string
  is_admin: boolean
}

export default function AdminPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
   const [questions, setQuestions] = useState<any[]>([])
const [currentPage, setCurrentPage] = useState(1)
 const pageSize = 10
 const [searchTerm, setSearchTerm] = useState('')
 const [editingQuestion, setEditingQuestion] = useState<any>(null)
const [showModal, setShowModal] = useState(false)
const [showNewModal, setShowNewModal] = useState(false);
const [newQuestion, setNewQuestion] = useState<any>(null)
const [showAddReferralModal, setShowAddReferralModal] = useState(false)
const [referralEmail, setReferralEmail] = useState("")
const [referralCode, setReferralCode] = useState("")




const fetchQuestions = async (page: number, search: string = '') => {
   const from = (page - 1) * pageSize
   const to = from + pageSize - 1


  let query = supabase
    .from('questions')
    .select('*')
   .order('created_at', { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike('question_text', `%${search}%`)
  }

  const { data, error } = await query

   if (!error) {
     setQuestions(data || [])
     setCurrentPage(page)
   }
 }
useEffect(() => {
  if (showModal && editingQuestion) {
    console.log("DEBUG editingQuestion:", editingQuestion)
  }
}, [showModal, editingQuestion])


 useEffect(() => {
  const fetchData = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      router.push('/login')
      return
    }

    const { data: currentProfile, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (profileError || !currentProfile?.is_admin) {
      alert("Erişim reddedildi: Admin değilsiniz.")
      router.push('/')
      return
    }

    const { data: profileList, error: fetchError } = await supabase
      .from('profiles')
      .select('id, full_name, username, is_admin')

    if (fetchError) {
      console.error(fetchError)
      return
    }

    setProfiles(profileList)
    setLoading(false)

    // ✅ Bu satır burada olacak
    await fetchQuestions(1, '')
  }

  // ✅ async fonksiyon burada çağrılacak
  fetchData()
}, [])


  const toggleAdmin = async (id: string, makeAdmin: boolean) => {
    await supabase.from('profiles').update({ is_admin: makeAdmin }).eq('id', id)
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_admin: makeAdmin } : p))
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-black">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h1>

      <div className="flex justify-end mb-4">
  <button
    onClick={() => setShowAddReferralModal(true)}
    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
  >
    Referans Kodu Ekle
  </button>
</div>


        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-3 text-gray-800">Full Name</th>
              <th className="p-3 text-gray-800">Username</th>
              <th className="p-3 text-center text-gray-800">Is Admin</th>
              <th className="p-3 text-center text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-gray-700">{profile.full_name}</td>
                <td className="p-3 text-gray-700">@{profile.username}</td>
                <td className="p-3 text-center">
                  {profile.is_admin ? '✅' : '❌'}
                </td>
                <td className="p-3 text-center space-x-2">
 <button
   onClick={() => {
     if (profile.is_admin) {
       const confirmRevoke = window.confirm(`${profile.full_name} adlı kullanıcının admin yetkisini kaldırmak istediğine emin misin?`)
       if (!confirmRevoke) return
     }
     toggleAdmin(profile.id, !profile.is_admin)
   }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-semibold"
                  >
                    {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
      <div className="mb-4 flex items-center gap-4">
    <input
      type="text"
      placeholder="Soru içinde ara..."
      value={searchTerm}
onChange={(e) => {
    setSearchTerm(e.target.value)
    fetchQuestions(1, e.target.value) // canlı arama
  }}
      className="px-4 py-2 border border-gray-300 rounded w-full max-w-md placeholder-gray-400 text-black"
    />
    <button
 onClick={() => {
   setCurrentPage(1)
   fetchQuestions(1, searchTerm)
 }}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Ara
    </button>
  </div>
    <button
      onClick={() => {
    setNewQuestion({
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: '',
      explanation: '',
      difficulty: 1,
    });
    setShowNewModal(true);
  }}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Yeni Soru Ekle
    </button>
  </div>

  <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
    <table className="w-full text-sm text-left text-gray-700 table-auto">
      <thead className="bg-gray-100 border-b border-gray-300">
  <tr>
    <th className="p-3 text-gray-800">ID</th>
    <th className="p-3 text-gray-800">Soru</th>
    <th className="p-3 text-gray-800">Zorluk</th>
    <th className="p-3 text-gray-800">A</th>
    <th className="p-3 text-gray-800">B</th>
    <th className="p-3 text-gray-800">C</th>
    <th className="p-3 text-gray-800">D</th>
    <th className="p-3 text-gray-800">Doğru Cevap</th>
    <th className="p-3 text-gray-800">Açıklama</th>
    <th className="p-3 text-gray-800">Oluşturma Tarihi</th>
    <th className="p-3 text-center text-gray-800">İşlemler</th>
  </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.id} className="border-t border-gray-200 hover:bg-gray-50">
      <td className="p-3">{q.id}</td>
      <td className="p-3 text-gray-700">{q.question_text.slice(0, 100)}...</td>
      <td className="p-3">{q.difficulty}</td>
      <td className="p-3">{q.option_a}</td>
      <td className="p-3">{q.option_b}</td>
      <td className="p-3">{q.option_c}</td>
      <td className="p-3">{q.option_d}</td>
      <td className="p-3">{q.correct_option}</td>
      <td className="p-3 text-gray-700">{q.explanation?.slice(0, 100)}...</td>
      <td className="p-3">{new Date(q.created_at).toLocaleDateString()}</td>
<td className="p-3 text-center">
  <div className="flex flex-col items-center space-y-2">
    <button
       onClick={() => {
  setEditingQuestion({
    id: q.id,
    question_text: q.question_text,
    option_a: q.option_a,
    option_b: q.option_b,
    option_c: q.option_c,
    option_d: q.option_d,
    correct_option: q.correct_option,
    explanation: q.explanation,
    difficulty: q.difficulty,
  });
  setShowModal(true);
}}


      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
    >
      Düzenle
    </button>
    <button
      onClick={async () => {
        const confirm = window.confirm("Bu soruyu silmek istediğinizden emin misiniz?")
        if (!confirm) return
        await supabase.from('questions').delete().eq('id', q.id)
        fetchQuestions(currentPage, searchTerm)
      }}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
    >
      Sil
    </button>
  </div>
</td>

          </tr>
        ))}
         {questions.length === 0 && (
   <tr>
     <td colSpan={3} className="text-center py-4 text-gray-500">
       Eşleşen soru bulunamadı.
     </td>
   </tr>
 )}
      </tbody>
    </table>
  </div>

  <div className="mt-4 flex justify-center gap-4">
    <button
      onClick={() => fetchQuestions(currentPage - 1, searchTerm)}
      disabled={currentPage === 1}
      className="px-3 py-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
    >
      Önceki
    </button>
    <span className="text-gray-700">Sayfa {currentPage}</span>
    <button
      onClick={() => fetchQuestions(currentPage + 1, searchTerm)}
      className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
    >
      Sonraki
    </button>
  </div>
</div>

{showModal && editingQuestion && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Soruyu Düzenle</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Soru</label>
          <textarea
            value={editingQuestion.question_text}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, question_text: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="Soru metni"
            rows={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Zorluk</label>
            <input
              type="number"
              value={editingQuestion.difficulty}
              onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="Zorluk (1-5)"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Doğru Seçenek</label>
            <input
              type="text"
              value={editingQuestion.correct_option}
              onChange={(e) => setEditingQuestion({ ...editingQuestion, correct_option: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="A, B, C, D"
            />
          </div>
        </div>

        {['a', 'b', 'c', 'd'].map((key) => (
          <div key={key}>
            <label className="block text-gray-700 mb-1">Seçenek {key.toUpperCase()}</label>
            <input
              type="text"
              value={editingQuestion[`option_${key}`]}
              onChange={(e) =>
                setEditingQuestion({ ...editingQuestion, [`option_${key}`]: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder={`Seçenek ${key.toUpperCase()}`}
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 mb-1">Açıklama</label>
          <textarea
            value={editingQuestion.explanation}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="Açıklama"
            rows={6}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Vazgeç
        </button>
        <button
          onClick={async () => {
            const { id, ...updatedData } = editingQuestion
            await supabase.from('questions').update(updatedData).eq('id', id)
            setShowModal(false)
            fetchQuestions(currentPage, searchTerm)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Kaydet
        </button>
      </div>
    </div>
  </div>
)}

{showNewModal && newQuestion && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Yeni Soru Ekle</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Soru</label>
          <textarea
            value={newQuestion.question_text}
            onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="Soru metni"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Zorluk</label>
            <input
              type="number"
              value={newQuestion.difficulty}
              onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="Zorluk (1-5)"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Doğru Seçenek</label>
            <input
              type="text"
              value={newQuestion.correct_option}
              onChange={(e) => setNewQuestion({ ...newQuestion, correct_option: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="A, B, C, D"
            />
          </div>
        </div>

        {['a', 'b', 'c', 'd'].map((key) => (
          <div key={key}>
            <label className="block text-gray-700 mb-1">Seçenek {key.toUpperCase()}</label>
            <input
              type="text"
              value={newQuestion[`option_${key}`]}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, [`option_${key}`]: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder={`Seçenek ${key.toUpperCase()}`}
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 mb-1">Açıklama</label>
          <textarea
            value={newQuestion.explanation}
            onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="Açıklama"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowNewModal(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Vazgeç
        </button>
        <button
          onClick={async () => {
            await supabase.from('questions').insert([newQuestion]);
            setShowNewModal(false);
            fetchQuestions(currentPage, searchTerm);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Kaydet
        </button>
      </div>
    </div>
  </div>
)}

    {showAddReferralModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Yeni Referans Kodu Ekle</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">E-posta Adresi</label>
          <input
            type="email"
            value={referralEmail}
            onChange={(e) => setReferralEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Referans Kodu</label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
            placeholder="Örn: TARIQ-2025"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={() => setShowAddReferralModal(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Vazgeç
        </button>
        <button
          onClick={async () => {
            if (!referralEmail || !referralCode) {
              alert("Tüm alanları doldurmalısınız.")
              return
            }
            const { error } = await supabase.from('referral_codes').insert({
              email: referralEmail,
              code: referralCode,
              used: false
            })
            if (error) {
              alert("Bir hata oluştu: " + error.message)
            } else {
              alert("Başarıyla eklendi!")
              setReferralEmail("")
              setReferralCode("")
              setShowAddReferralModal(false)
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ekle
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}
