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
      onChange={(e) => setSearchTerm(e.target.value)}
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
      onClick={() => console.log("Yeni soru ekleme formu aç")}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Yeni Soru Ekle
    </button>
  </div>

  <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th className="p-3 w-1/2 text-gray-800">Soru</th>
          <th className="p-3 text-gray-800">Zorluk</th>
          <th className="p-3 text-center text-gray-800">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.id} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="p-3 text-gray-700">{q.question_text.slice(0, 100)}...</td>
            <td className="p-3">{q.difficulty}</td>
            <td className="p-3 text-center space-x-2">
              <button
                onClick={() => console.log("Düzenle:", q.id)}
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


    
    </div>
  )
}
