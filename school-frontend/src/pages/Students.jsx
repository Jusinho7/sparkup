import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    api.get('/students')
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false))
  }, [])

  const filtered = students.filter(s =>
    s.user?.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 Élèves</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <input
          type="text"
          placeholder="Rechercher un élève..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-blue-500"
        />

        {loading ? (
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Classe</th>
                <th className="pb-3">Téléphone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-all">
                  <td className="py-3 font-medium text-gray-800">{s.user?.name}</td>
                  <td className="py-3 text-gray-500 text-sm">{s.user?.email}</td>
                  <td className="py-3">
                    {s.school_class
                      ? <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{s.school_class.name}</span>
                      : <span className="text-gray-400 text-sm">—</span>
                    }
                  </td>
                  <td className="py-3 text-gray-500 text-sm">{s.phone || '—'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-gray-400">Aucun élève trouvé</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}