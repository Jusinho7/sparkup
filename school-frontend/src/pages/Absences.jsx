import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

export default function Absences() {
  const [absences, setAbsences] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/absences')
      .then(res => setAbsences(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 Absences</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b">
                <th className="pb-3">Élève</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Matière</th>
                <th className="pb-3">Justifiée</th>
                <th className="pb-3">Motif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {absences.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium">{a.student?.user?.name}</td>
                  <td className="py-3 text-gray-500 text-sm">{a.date}</td>
                  <td className="py-3 text-gray-500 text-sm">{a.subject?.name || '—'}</td>
                  <td className="py-3">
                    {a.justified
                      ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Oui</span>
                      : <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Non</span>
                    }
                  </td>
                  <td className="py-3 text-gray-500 text-sm">{a.reason || '—'}</td>
                </tr>
              ))}
              {absences.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-400">Aucune absence</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}