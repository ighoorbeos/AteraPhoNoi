import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiPlay, HiChevronDown } from 'react-icons/hi'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/banner.jpg"
          alt="ATERA CENTRAL"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent-gold text-lg md:text-xl mb-4 tracking-widest uppercase">
            Khu tổ hợp cao cấp
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
            ATERA <span className="text-accent-gold">CENTRAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Điểm đến lý tưởng cho cuộc sống hiện đại và thịnh vượng
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="contact"
              smooth={true}
              className="btn-primary cursor-pointer flex items-center gap-2"
            >
              Đăng ký nhận thông tin
            </Link>
            
            <button className="btn-outline flex items-center gap-2">
              <HiPlay className="text-xl" />
              Xem video dự án
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '4,6', unit: 'Ha', label: 'Tổng diện tích' },
            { value: '840', unit: '', label: 'Căn hộ + Liền kề Shophouse' },
            { value: '40%', unit: '', label: 'Mật độ xây dựng' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-gold">
                {stat.value}<span className="text-xl">{stat.unit}</span>
              </div>
              <div className="text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <Link to="overview" smooth={true} className="cursor-pointer">
          <HiChevronDown className="text-4xl text-accent-gold" />
        </Link>
      </motion.div>
    </section>
  )
}
