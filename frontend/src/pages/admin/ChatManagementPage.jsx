import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  HiChat, 
  HiUser, 
  HiPhone, 
  HiMail, 
  HiClock,
  HiPaperAirplane,
  HiRefresh,
  HiX,
  HiCheck
} from 'react-icons/hi'
import { chatService } from '../../services/modules/chat.service'

export default function ChatManagementPage() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const pollIntervalRef = useRef(null)

  // Load conversations
  const loadConversations = async () => {
    try {
      const response = await chatService.getAllConversations()
      if (response.data.success) {
        setConversations(response.data.data)
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  // Load messages for selected conversation
  const loadMessages = async (conversationId) => {
    try {
      const response = await chatService.getConversationById(conversationId)
      if (response.data.success) {
        setMessages(response.data.data.messages || [])
        setSelectedConversation(response.data.data)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  useEffect(() => {
    loadConversations()
    // Poll for new conversations every 10 seconds
    pollIntervalRef.current = setInterval(loadConversations, 10000)
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [])

  // Poll messages when a conversation is selected
  useEffect(() => {
    let messagesPollInterval
    if (selectedConversation) {
      messagesPollInterval = setInterval(() => {
        loadMessages(selectedConversation.id)
      }, 5000)
    }
    
    return () => {
      if (messagesPollInterval) {
        clearInterval(messagesPollInterval)
      }
    }
  }, [selectedConversation?.id])

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)
    loadMessages(conversation.id)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    setIsSending(true)
    try {
      const response = await chatService.sendAdminMessage(
        selectedConversation.id,
        newMessage,
        'Admin'
      )
      
      if (response.data.success) {
        setMessages(prev => [...prev, response.data.data])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleCloseConversation = async (conversationId) => {
    try {
      await chatService.closeConversation(conversationId)
      loadConversations()
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null)
        setMessages([])
      }
    } catch (error) {
      console.error('Error closing conversation:', error)
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Chat</h1>
            <p className="text-gray-600">Trò chuyện với khách hàng</p>
          </div>
          <button
            onClick={loadConversations}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <HiRefresh className="text-lg" />
            Làm mới
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                <HiChat className="text-accent-gold" />
                Cuộc trò chuyện ({conversations.length})
              </h2>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <HiChat className="text-4xl mx-auto mb-2 opacity-30" />
                  <p>Chưa có cuộc trò chuyện nào</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-amber-50 border-l-4 border-l-accent-gold' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <HiUser className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {conv.visitorName || 'Khách'}
                          </p>
                          <p className="text-xs text-gray-500">{conv.visitorPhone}</p>
                        </div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 truncate">
                      {conv.lastMessage || 'Bắt đầu trò chuyện...'}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conv.status === 'OPEN' ? 'bg-green-100 text-green-600' :
                        conv.status === 'CLOSED' ? 'bg-gray-100 text-gray-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {conv.status === 'OPEN' ? 'Đang mở' : 
                         conv.status === 'CLOSED' ? 'Đã đóng' : 'Chờ xử lý'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[700px]">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center text-white">
                      <HiUser />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedConversation.visitorName || 'Khách'}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {selectedConversation.visitorPhone && (
                          <span className="flex items-center gap-1">
                            <HiPhone /> {selectedConversation.visitorPhone}
                          </span>
                        )}
                        {selectedConversation.visitorEmail && (
                          <span className="flex items-center gap-1">
                            <HiMail /> {selectedConversation.visitorEmail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedConversation.status === 'OPEN' && (
                      <button
                        onClick={() => handleCloseConversation(selectedConversation.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 text-sm"
                      >
                        <HiCheck /> Đóng
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id || index}
                      className={`mb-3 flex ${msg.senderType === 'ADMIN' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.senderType === 'ADMIN'
                            ? 'bg-accent-gold text-white'
                            : 'bg-white shadow-sm text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.senderType === 'ADMIN' ? 'text-amber-200' : 'text-gray-400'
                        }`}>
                          {formatMessageTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                {selectedConversation.status === 'OPEN' ? (
                  <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-3">
                    <input
                      type="text"
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                      disabled={isSending}
                    />
                    <button
                      type="submit"
                      disabled={isSending || !newMessage.trim()}
                      className="px-6 py-2 bg-accent-gold text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <HiPaperAirplane className="transform rotate-90" />
                      Gửi
                    </button>
                  </form>
                ) : (
                  <div className="p-4 bg-gray-100 text-center text-gray-500">
                    Cuộc trò chuyện đã đóng
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <HiChat className="text-6xl mx-auto mb-4 opacity-30" />
                  <p>Chọn một cuộc trò chuyện để bắt đầu</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
