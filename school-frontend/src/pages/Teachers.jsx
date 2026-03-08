import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/teachers')
      .then(res => setTeachers(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👨‍🏫 Professeurs</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Spécialité</th>
                <th className="pb-3">Téléphone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {teachers.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{t.user?.name}</td>
                  <td className="py-3 text-gray-500 text-sm">{t.user?.email}</td>
                  <td className="py-3 text-gray-500 text-sm">{t.specialty || '—'}</td>
                  <td className="py-3 text-gray-500 text-sm">{t.phone || '—'}</td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-gray-400">Aucun professeur</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}