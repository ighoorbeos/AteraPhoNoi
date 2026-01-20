import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  HiHome, 
  HiAcademicCap, 
  HiShoppingBag,
  HiShieldCheck,
  HiSun,
  HiHeart
} from 'react-icons/hi'
import { FaSwimmingPool, FaRunning, FaTree, FaChild } from 'react-icons/fa'

import { MdLocalMovies } from 'react-icons/md'

const amenities = [
  {
    icon: <MdLocalMovies />,
    name: 'Rạp chiếu phim',
    description: 'Rạp phim cao cấp với âm thanh vòm hiện đại',
    image: '/images/overview/cinema.png',
  },
  {
    icon: <FaSwimmingPool />,
    name: 'Hồ bơi 4 mùa',
    description: 'Bể bơi hiện đại với hệ thống lọc nước tiên tiến',
    image: '/images/amenities/amenities-1.png',
  },
  {
    icon: <FaRunning />,
    name: 'Gym & Spa',
    description: 'Trung tâm thể thao đa năng và spa thư giãn',
    image: '/images/amenities/amenities-2.png',
  },
  {
    icon: <FaTree />,
    name: 'Công viên cây xanh',
    description: 'Không gian xanh mát rộng 2ha',
    image: '/images/amenities/amenities-3.png',
  },
  {
    icon: <HiAcademicCap />,
    name: 'Trường liên cấp',
    description: 'Hệ thống giáo dục chất lượng cao',
    image: '/images/amenities/amenities-4.png',
  },
  {
    icon: <HiShoppingBag />,
    name: 'TTTM nội khu',
    description: 'Mua sắm, ẩm thực và giải trí',
    image: '/images/amenities/amenities-5.png',
  },
  {
    icon: <FaChild />,
    name: 'Khu vui chơi',
    description: 'Sân chơi an toàn cho trẻ em',
    image: '/images/amenities/amenities-6.png',
  },
  {
    icon: <HiShieldCheck />,
    name: 'An ninh 24/7',
    description: 'Hệ thống camera và bảo vệ thông minh',
    image: '/images/amenities/amenities-7.png',
  },
]

export default function Amenities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="amenities" className="pt-32 pb-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-gold font-semibold uppercase tracking-wider">
            Tiện ích đẳng cấp
          </span>
          <h2 className="section-title mt-2">
            Hệ Thống Tiện Ích <span className="text-accent-gold">5 Sao</span>
          </h2>
          <p className="section-subtitle mt-4">
            Trải nghiệm cuộc sống đỉnh cao với hệ thống tiện ích đa dạng, 
            đáp ứng mọi nhu cầu của cư dân từ nghỉ ngơi, vui chơi đến mua sắm.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-3xl mb-2">{amenity.icon}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-accent-gold transition-colors">
                  {amenity.name}
                </h3>
                <p className="text-gray-600 text-sm">{amenity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 hidden"
        >
        </motion.div>
      </div>
    </section>
  )
}
