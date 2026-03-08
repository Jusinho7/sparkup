import { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Messages() {
  const { user }                          = useAuth()
  const [users, setUsers]                 = useState([])
  const [selectedUser, setSelectedUser]   = useState(null)
  const [conversation, setConversation]   = useState([])
  const [content, setContent]             = useState('')
  const [loading, setLoading]             = useState(false)
  const bottomRef                         = useRef(null)

  useEffect(() => {
    // Charge tous les messages pour extraire les contacts
    api.get('/messages').then(res => {
      const msgs = res.data
      const contactIds = new Set()
      const contacts = []
      msgs.forEach(m => {
        const contact = m.sender_id === user.id ? m.receiver : m.sender
        if (!contactIds.has(contact.id)) {
          contactIds.add(contact.id)
          contacts.push(contact)
        }
      })
      setUsers(contacts)
    })
  }, [])

  useEffect(() => {
    if (!selectedUser) return
    api.get(`/messages/conversation/${selectedUser.id}`)
      .then(res => setConversation(res.data))
  }, [selectedUser])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!content.trim() || !selectedUser) return
    setLoading(true)
    const res = await api.post('/messages', {
      receiver_id: selectedUser.id,
      content,
    })
    setConversation(prev => [...prev, res.data])
    setContent('')
    setLoading(false)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">💬 Messages</h1>

      <div className="bg-white rounded-xl shadow-sm flex h-[600px] overflow-hidden">
        {/* Liste contacts */}
        <div className="w-64 border-r border-gray-100 overflow-y-auto">
          <div className="p-4 border-b">
            <p className="text-sm font-semibold text-gray-600">Conversations</p>
          </div>
          {users.length === 0 && (
            <p className="text-center text-gray-400 text-sm p-4">Aucune conversation</p>
          )}
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all ${selectedUser?.id === u.id ? 'bg-blue-50' : ''}`}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {u.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-400">{u.role}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Zone conversation */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-gray-800">{selectedUser.name}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {conversation.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.sender_id === user.id
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={sendMessage} className="p-4 border-t flex gap-3">
                <input
                  type="text"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Écrire un message..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50"
                >
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-2">💬</p>
                <p>Sélectionne une conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}