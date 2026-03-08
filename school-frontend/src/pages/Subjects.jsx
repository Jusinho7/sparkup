import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/subjects')
      .then(res => setSubjects(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📚 Matières</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Code</th>
                <th className="pb-3">Coefficient</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subjects.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">{s.code}</span>
                  </td>
                  <td className="py-3 text-gray-500">{s.coefficient}</td>
                </tr>
              ))}
              {subjects.length === 0 && (
                <tr><td colSpan={3} className="py-8 text-center text-gray-400">Aucune matière</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}