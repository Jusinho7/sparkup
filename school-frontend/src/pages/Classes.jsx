import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Classes() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/classes')
      .then(res => setClasses(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🏫 Classes</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Niveau</th>
                <th className="pb-3">Professeur principal</th>
                <th className="pb-3">Élèves</th>
                <th className="pb-3">Capacité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {classes.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="py-3 text-gray-500">{c.level}</td>
                  <td className="py-3 text-gray-500 text-sm">{c.teacher?.user?.name || '—'}</td>
                  <td className="py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {c.students?.length || 0} élèves
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 text-sm">{c.capacity}</td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-400">Aucune classe</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}