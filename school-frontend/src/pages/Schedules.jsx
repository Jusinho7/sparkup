import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function Schedules() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    api.get('/schedules')
      .then(res => setSchedules(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Emploi du temps</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? <div className="text-center py-12 text-gray-400">Chargement...</div> : (
          <div className="grid grid-cols-6 gap-3">
            {DAYS.map(day => (
              <div key={day}>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center bg-gray-50 py-2 rounded-lg">{day}</h3>
                <div className="space-y-2">
                  {schedules.filter(s => s.day === day).map(s => (
                    <div key={s.id} className="bg-blue-50 border border-blue-100 rounded-lg p-2">
                      <p className="text-xs font-semibold text-blue-800">{s.subject?.name}</p>
                      <p className="text-xs text-blue-600">{s.start_time} - {s.end_time}</p>
                      <p className="text-xs text-gray-500">{s.teacher?.user?.name}</p>
                      {s.room && <p className="text-xs text-gray-400">Salle {s.room}</p>}
                    </div>
                  ))}
                  {schedules.filter(s => s.day === day).length === 0 && (
                    <p className="text-xs text-gray-300 text-center py-2">—</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}