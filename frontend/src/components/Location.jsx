import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiLocationMarker, HiClock, HiOfficeBuilding } from 'react-icons/hi'
import { FaCar, FaSubway, FaPlane } from 'react-icons/fa'

const locationFeatures = [
  {
    icon: <FaCar />,
    title: '5 phút',
    description: 'Đến trung tâm thị trấn Phố Nối',
  },
  {
    icon: <HiOfficeBuilding />,
    title: '10 phút',
    description: 'Đến KCN Phố Nối A & B',
  },
  {
    icon: <FaSubway />,
    title: '25 phút',
    description: 'Đến trung tâm TP. Hưng Yên',
  },
  {
    icon: <FaPlane />,
    title: '35 phút',
    description: 'Đến sân bay Nội Bài',
  },
]

const nearbyPlaces = [
  'Bệnh viện Đa khoa Phố Nối',
  'Trung tâm thương mại GO! Mall',
  'Trường Đại học Sư phạm Kỹ thuật HY',
  'Chợ Phố Nối',
  'Công viên trung tâm',
  'Khu công nghiệp Phố Nối',
]

export default function Location() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="location" className="pt-32 pb-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-gold font-semibold uppercase tracking-wider">
            Vị trí đắc địa
          </span>
          <h2 className="section-title mt-2">
            Trung Tâm Kết Nối <span className="text-accent-gold">Vùng Kinh Tế</span>
          </h2>
          <p className="section-subtitle mt-4">
            Tọa lạc tại vị trí trung tâm thị trấn Phố Nối, kết nối thuận tiện đến 
            các khu công nghiệp, trung tâm thương mại và các tiện ích công cộng.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map/Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/images/location/location-1.png"
              alt="Vị trí ATERA Phố Nối"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-gold rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-accent-gold text-white p-4 rounded-full shadow-lg">
                  <HiLocationMarker className="text-3xl" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Travel Times */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {locationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="text-accent-gold text-3xl mb-3">{feature.icon}</div>
                  <div className="text-2xl font-bold text-dark-900">{feature.title}</div>
                  <div className="text-gray-600">{feature.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Nearby Places */}
            <div className="bg-accent-gold/10 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                <HiLocationMarker className="text-accent-gold" />
                Tiện ích lân cận
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-accent-gold rounded-full"></div>
                    {place}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
