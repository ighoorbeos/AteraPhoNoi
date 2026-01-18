import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const designImages = [
  {
    src: '/images/design/design-1.png',
    title: 'Kiến trúc hiện đại',
    description: 'Thiết kế sang trọng theo phong cách châu Âu',
  },
  {
    src: '/images/design/design-2.png',
    title: 'Không gian xanh',
    description: 'Hòa mình với thiên nhiên trong lành',
  },
  {
    src: '/images/design/design-3.png',
    title: 'Nội thất cao cấp',
    description: 'Chất liệu và hoàn thiện đẳng cấp',
  },
  {
    src: '/images/design/design-4.png',
    title: 'View thoáng đãng',
    description: 'Tận hưởng tầm nhìn panorama',
  },
  {
    src: '/images/design/design-5.png',
    title: 'Chi tiết tinh tế',
    description: 'Chú trọng từng đường nét kiến trúc',
  },
]

export default function Design() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="design" className="pt-32 pb-20 bg-dark-900 text-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-gold font-semibold uppercase tracking-wider">
            Thiết kế kiến trúc
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-4">
            Kiệt Tác <span className="text-accent-gold">Kiến Trúc</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mỗi công trình tại ATERA PHỐ NỐI đều được chăm chút tỉ mỉ từ những chi tiết nhỏ nhất, 
            mang đến không gian sống hoàn hảo cho cư dân.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="design-swiper"
          >
            {designImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Design Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { title: 'Phong cách Châu Âu', desc: 'Thiết kế tinh tế, sang trọng' },
            { title: 'Vật liệu cao cấp', desc: 'Sử dụng 100% vật liệu nhập khẩu' },
            { title: 'Tối ưu công năng', desc: 'Không gian sống tiện nghi, thông minh' },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 border border-gray-700 rounded-xl hover:border-accent-gold transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <span className="text-accent-gold text-2xl font-bold">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
