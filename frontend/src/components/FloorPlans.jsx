import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineHome, HiOutlineScale, HiOutlineCurrencyDollar } from 'react-icons/hi'

const floorPlans = [
  {
    id: 1,
    type: 'shophouse',
    name: 'Shophouse',
    area: '80 - 120 m²',
    bedrooms: '3 - 4',
    price: 'Từ 3.5 tỷ',
    image: '/images/floorplans/floorplan-1.png',
    features: ['Mặt tiền kinh doanh', '2 mặt thoáng', 'Thiết kế linh hoạt'],
  },
  {
    id: 2,
    type: 'villa',
    name: 'Biệt thự đơn lập',
    area: '200 - 300 m²',
    bedrooms: '4 - 5',
    price: 'Từ 8 tỷ',
    image: '/images/floorplans/floorplan-2.png',
    features: ['Sân vườn riêng', 'Hồ bơi mini', 'Garage ô tô'],
  },
  {
    id: 3,
    type: 'townhouse',
    name: 'Liền kề',
    area: '75 - 90 m²',
    bedrooms: '3',
    price: 'Từ 2.8 tỷ',
    image: '/images/floorplans/floorplan-3.png',
    features: ['Thiết kế thông minh', 'Không gian tối ưu', 'Giá tốt nhất'],
  },
]

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'shophouse', label: 'Shophouse' },
  { id: 'villa', label: 'Biệt thự' },
  { id: 'townhouse', label: 'Liền kề' },
]

export default function FloorPlans() {
  const [activeTab, setActiveTab] = useState('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredPlans = activeTab === 'all' 
    ? floorPlans 
    : floorPlans.filter(plan => plan.type === activeTab)

  return (
    <section id="floorplans" className="pt-32 pb-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-gold font-semibold uppercase tracking-wider">
            Mặt bằng dự án
          </span>
          <h2 className="section-title mt-2">
            Đa Dạng <span className="text-accent-gold">Sản Phẩm</span>
          </h2>
          <p className="section-subtitle mt-4">
            Lựa chọn phong phú từ Shophouse, Biệt thự đến Liền kề 
            phù hợp với mọi nhu cầu và ngân sách.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent-gold text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Floor Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-gold text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {plan.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark-900 mb-4">{plan.name}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <HiOutlineScale className="text-accent-gold text-xl mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Diện tích</div>
                      <div className="font-semibold text-sm">{plan.area}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <HiOutlineHome className="text-accent-gold text-xl mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Phòng ngủ</div>
                      <div className="font-semibold text-sm">{plan.bedrooms}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <HiOutlineCurrencyDollar className="text-accent-gold text-xl mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Giá từ</div>
                      <div className="font-semibold text-sm">{plan.price}</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-accent-gold rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full btn-outline">
                    Xem chi tiết
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
