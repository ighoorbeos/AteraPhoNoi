import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiCheckCircle } from 'react-icons/hi'

const highlights = [
  'Vị trí đắc địa - Trung tâm thị trấn Phố Nối',
  'Thiết kế hiện đại, phong cách châu Âu',
  'Hệ thống tiện ích đẳng cấp 5 sao',
  'Pháp lý minh bạch, sổ đỏ từng lô',
  'Tiềm năng tăng giá cao',
  'Cộng đồng cư dân văn minh, đẳng cấp',
]

export default function Overview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="overview" className="pt-32 pb-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/overview/overview-1.png"
                alt="ATERA Phố Nối Overview"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img
                src="/images/overview/overview-2.png"
                alt="ATERA Phố Nối View"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent-gold text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">15.2 ha</div>
              <div className="text-sm">Tổng diện tích</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-accent-gold font-semibold uppercase tracking-wider">
              Tổng quan dự án
            </span>
            <h2 className="section-title mt-2 mb-6">
              ATERA PHỐ NỐI - <br />
              <span className="text-accent-gold">Nơi An Cư Lý Tưởng</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              ATERA PHỐ NỐI là khu đô thị sinh thái cao cấp được phát triển bởi những 
              chủ đầu tư uy tín hàng đầu Việt Nam. Với quy mô 15.2 hecta và mật độ 
              xây dựng chỉ 35%, dự án mang đến không gian sống xanh mát, hiện đại 
              và đẳng cấp ngay tại trung tâm thị trấn Phố Nối, Hưng Yên.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <HiCheckCircle className="text-accent-gold text-xl flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <button className="btn-primary">
              Tìm hiểu thêm
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
