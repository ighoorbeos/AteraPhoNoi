import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiPhone, HiChat, HiX } from 'react-icons/hi'
import { FaFacebookMessenger } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

const contactOptions = [
  {
    icon: <HiPhone />,
    label: 'Gọi ngay',
    href: 'tel:0909888999',
    color: 'bg-green-500',
  },
  {
    icon: <SiZalo />,
    label: 'Zalo',
    href: 'https://zalo.me/0909888999',
    color: 'bg-blue-500',
  },
  {
    icon: <FaFacebookMessenger />,
    label: 'Messenger',
    href: 'https://m.me/ateraphonoivn',
    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
  },
]

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${option.color} hover:scale-105 transition-transform`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="font-medium whitespace-nowrap">{option.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white text-2xl ${
          isOpen ? 'bg-gray-600' : 'bg-accent-gold'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <HiX /> : <HiChat />}
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-accent-gold animate-ping opacity-75"></span>
      )}
    </div>
  )
}
