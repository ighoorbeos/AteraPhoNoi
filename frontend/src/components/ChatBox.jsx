import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX, HiPaperAirplane, HiRefresh } from 'react-icons/hi'
import { chatService } from '../services/modules/chat.service'

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visitorInfo, setVisitorInfo] = useState({
    name: '',
    phone: ''
  })
  const [showInfoForm, setShowInfoForm] = useState(true)
  const [conversationId, setConversationId] = useState(null)
  const [isRecovered, setIsRecovered] = useState(false)
  const messagesEndRef = useRef(null)
  const pollIntervalRef = useRef(null)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load existing conversation when chat opens
  useEffect(() => {
    if (isOpen) {
      loadConversation()
      // Poll for new messages every 5 seconds
      pollIntervalRef.current = setInterval(loadConversation, 5000)
    } else {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [isOpen])

  const loadConversation = async () => {
    try {
      const response = await chatService.getVisitorMessages()
      if (response.data.success && response.data.data) {
        const conversation = response.data.data
        setConversationId(conversation.id)
        setMessages(conversation.messages || [])
        
        // Check if visitor info exists
        if (conversation.visitorName || conversation.visitorPhone) {
          setShowInfoForm(false)
          setVisitorInfo({
            name: conversation.visitorName || '',
            phone: conversation.visitorPhone || ''
          })
        }
      }
    } catch (error) {
      console.log('No existing conversation')
    }
  }

  // Recover conversation by phone number
  const handleRecoverByPhone = async () => {
    if (!visitorInfo.phone || visitorInfo.phone.length < 10) {
      alert('Vui lòng nhập số điện thoại hợp lệ')
      return
    }
    
    setIsLoading(true)
    try {
      // Call getOrCreateConversation with phone to recover
      const response = await chatService.getOrCreateConversation(
        visitorInfo.name,
        visitorInfo.phone
      )
      
      if (response.data.success && response.data.data) {
        const conversation = response.data.data
        setConversationId(conversation.id)
        setMessages(conversation.messages || [])
        
        if (conversation.messages && conversation.messages.length > 0) {
          setIsRecovered(true)
          setShowInfoForm(false)
          // Update name from recovered conversation
          if (conversation.visitorName) {
            setVisitorInfo(prev => ({ ...prev, name: conversation.visitorName }))
          }
        }
      }
    } catch (error) {
      console.error('Error recovering conversation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    // Require name and phone for first message
    if (showInfoForm && (!visitorInfo.name || !visitorInfo.phone)) {
      return
    }

    setIsLoading(true)
    try {
      const response = await chatService.sendVisitorMessage(
        newMessage,
        visitorInfo.name,
        visitorInfo.phone
      )
      
      if (response.data.success) {
        setMessages(prev => [...prev, response.data.data])
        setNewMessage('')
        setShowInfoForm(false)
        setIsRecovered(false)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-accent-gold rounded-full shadow-lg flex items-center justify-center text-white hover:bg-amber-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <HiX className="text-2xl" /> : <HiChat className="text-2xl" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-dark-900 to-dark-800 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center">
                  <HiChat className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold">Hỗ trợ trực tuyến</h3>
                  <p className="text-xs text-gray-300">ATERA CENTRAL</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
              {/* Recovered Message */}
              {isRecovered && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                  <p className="text-sm text-green-700">
                    ✅ Đã khôi phục cuộc trò chuyện của bạn!
                  </p>
                </div>
              )}

              {/* Welcome Message */}
              {messages.length === 0 && !isRecovered && (
                <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                  <p className="text-sm text-gray-600">
                    Xin chào! 👋 Chúng tôi rất vui được hỗ trợ bạn. Hãy để lại thông tin và câu hỏi, chúng tôi sẽ phản hồi sớm nhất!
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    💡 Nếu đã chat trước đó, nhập đúng SĐT để khôi phục cuộc trò chuyện.
                  </p>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`mb-3 flex ${msg.senderType === 'VISITOR' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.senderType === 'VISITOR'
                        ? 'bg-accent-gold text-white'
                        : 'bg-white shadow-sm text-gray-800'
                    }`}
                  >
                    {msg.senderType === 'ADMIN' && (
                      <p className="text-xs font-semibold text-accent-gold mb-1">
                        {msg.senderName}
                      </p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderType === 'VISITOR' ? 'text-amber-200' : 'text-gray-400'
                    }`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Visitor Info Form (shown only for first message) */}
            {showInfoForm && (
              <div className="p-3 bg-gray-100 border-t space-y-2">
                <input
                  type="text"
                  placeholder="Họ tên *"
                  value={visitorInfo.name}
                  onChange={(e) => setVisitorInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Số điện thoại *"
                    value={visitorInfo.phone}
                    onChange={(e) => setVisitorInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleRecoverByPhone}
                    disabled={isLoading || !visitorInfo.phone}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg text-xs hover:bg-gray-700 disabled:opacity-50 flex items-center gap-1"
                    title="Khôi phục cuộc trò chuyện cũ"
                  >
                    <HiRefresh className="text-sm" />
                  </button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim() || (showInfoForm && (!visitorInfo.name || !visitorInfo.phone))}
                className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiPaperAirplane className="text-lg transform rotate-90" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
