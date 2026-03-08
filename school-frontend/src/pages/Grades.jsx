import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Grades() {
  const [grades, setGrades]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/grades')
      .then(res => setGrades(res.data))
      .finally(() => setLoading(false))
  }, [])

  const getColor = (val) => {
    if (val >= 16) return 'text-green-600 font-bold'
    if (val >= 10) return 'text-blue-600'
    return 'text-red-500 font-bold'
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 Notes</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Chargement...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Élève</th>
                <th className="pb-3">Matière</th>
                <th className="pb-3">Note</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Période</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {grades.map(g => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{g.student?.user?.name}</td>
                  <td className="py-3 text-gray-500">{g.subject?.name}</td>
                  <td className={`py-3 text-lg ${getColor(g.value)}`}>{g.value}/20</td>
                  <td className="py-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{g.type}</span>
                  </td>
                  <td className="py-3 text-gray-500 text-sm">{g.period}</td>
                </tr>
              ))}
              {grades.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-400">Aucune note</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}