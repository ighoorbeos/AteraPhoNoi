import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const apartmentTypes = [
  {
    src: '/images/design/ds5.png',
    type: 'CĂN MẪU 1 PHÒNG NGỦ',
    area: '52m2',
    name: 'Scandinavian Modernity',
    target: 'Người sáng tạo',
    description: 'Không gian tĩnh giản, tinh tế – nơi mỗi chi tiết khơi dậy nguồn cảm hứng sáng tạo bất tận.',
    gallery: [
      '/images/design/ds5.png',
      '/images/design/ds1.png',
      '/images/design/ds2.png',
    ],
    detailName: 'The Nomad Studio',
    designStory: 'Tự do sống, tự do tạo lập',
    designDescription: 'Trong nhịp sống của một đô thị đang bứt phá, The Nomad Studio là không gian dành cho người trẻ toàn cầu – những cá nhân dịch chuyển liên tục giữa các thành phố, nhưng luôn giữ một nơi chốn để trở về và tái tạo năng lượng.',
    targetBuyers: 'NGƯỜI SÁNG TẠO',
    careers: 'Designer, kiến trúc sư, content creator, freelancer, nghệ sĩ, start-up founder...',
    lifestyle: 'Tìm kiếm không gian tối giản, thoáng sáng, truyền cảm hứng, giúp nuôi dưỡng ý tưởng. Tính cách: Coi trọng cái đẹp, yêu thích sự tinh tế, giản dị nhưng cá tính.',
    interiorFeatures: [
      { title: 'Chất liệu', desc: 'Gỗ sáng tự nhiên (sàn, bàn, ghế) → tạo cảm giác ấm áp, gần gũi, bền vững. Vải linen, cotton thô, len dệt nhẹ → đúng tinh thần Bắc Âu, đơn giản mà tinh tế.' },
      { title: 'Thiết kế', desc: 'Đường nét tối giản, ít chi tiết thừa, ưu tiên công năng. Sofa, bàn ăn, tủ đều có form gọn gàng, nhẹ nhàng, dễ biến tấu cho nhiều mục đích.' },
      { title: 'Góc làm việc', desc: 'Bàn dài đa năng → tận dụng ánh sáng studio, lý tưởng cho người làm sáng tạo.' },
      { title: 'Trang trí & điểm nhấn', desc: 'Tranh treo tường nghệ thuật tối giản (abstract, hình khối, thiên nhiên). Đèn sàn/đèn thả tone đen hoặc kim loại mờ → vừa là công năng vừa là decor.' },
    ],
  },
  {
    src: '/images/design/ds6.png',
    type: 'CĂN MẪU 2 PHÒNG NGỦ',
    area: '75m2',
    name: 'Contemporary Symphony',
    target: 'Người sống kiến tạo',
    description: 'Hòa quyện hiện đại và cân bằng, tôn vinh phong cách sống năng động, kiến tạo giá trị bền vững.',
    gallery: [
      '/images/design/ds6.png',
      '/images/design/ds7.png',
      '/images/design/ds8.png',
    ],
    detailName: 'The Balance Home',
    designStory: 'Cân bằng giữa công việc và cuộc sống',
    designDescription: 'Không gian được thiết kế cho những gia đình trẻ năng động, nơi mọi thành viên đều tìm thấy góc riêng của mình trong một tổng thể hài hòa.',
    targetBuyers: 'NGƯỜI SỐNG KIẾN TẠO',
    careers: 'Quản lý cấp trung, chuyên gia tài chính, bác sĩ, luật sư, doanh nhân trẻ...',
    lifestyle: 'Coi trọng sự cân bằng giữa công việc và gia đình. Ưa thích không gian đa chức năng, linh hoạt, phù hợp cho cả làm việc tại nhà và thư giãn.',
    interiorFeatures: [
      { title: 'Chất liệu', desc: 'Kết hợp gỗ tự nhiên và kim loại mạ đồng, tạo nên sự sang trọng nhưng vẫn ấm áp.' },
      { title: 'Thiết kế', desc: 'Phòng khách liên thông bếp mở, tối ưu không gian sinh hoạt chung. Phòng ngủ master có walk-in closet nhỏ gọn.' },
      { title: 'Góc làm việc', desc: 'Khu vực work-from-home tích hợp, có thể đóng mở linh hoạt khi cần riêng tư.' },
      { title: 'Trang trí & điểm nhấn', desc: 'Cây xanh indoor, đèn LED âm trần tạo không gian ấm cúng và hiện đại.' },
    ],
  },
  {
    src: '/images/design/ds4.png',
    type: 'CĂN MẪU 3 PHÒNG NGỦ',
    area: '100m2',
    name: 'Metropolitan Grandeur',
    target: 'Công Dân Toàn Cầu',
    description: 'Chuẩn mực sống đẳng cấp, sang trọng và hiện đại – phản chiếu phong thái quốc tế, nơi bạn tận hưởng cuộc sống.',
    gallery: [
      '/images/design/ds4.png',
      '/images/design/ds9.png',
      '/images/design/ds10.png',
    ],
    detailName: 'The Executive Suite',
    designStory: 'Đẳng cấp và phong thái quốc tế',
    designDescription: 'Căn hộ dành cho những người thành đạt, mong muốn không gian sống phản ánh vị thế xã hội và gu thẩm mỹ tinh tế của mình.',
    targetBuyers: 'CÔNG DÂN TOÀN CẦU',
    careers: 'CEO, giám đốc điều hành, chuyên gia nước ngoài, doanh nhân thành đạt...',
    lifestyle: 'Thường xuyên di chuyển quốc tế, coi trọng sự riêng tư và tiện nghi cao cấp. Ưa thích thiết kế mang hơi thở quốc tế, dịch vụ đẳng cấp.',
    interiorFeatures: [
      { title: 'Chất liệu', desc: 'Đá marble tự nhiên, gỗ óc chó cao cấp, da thật và kim loại mạ vàng đồng.' },
      { title: 'Thiết kế', desc: 'Phòng khách rộng rãi với view panorama, phòng master có phòng tắm riêng biệt kiểu spa.' },
      { title: 'Không gian riêng', desc: 'Phòng làm việc riêng biệt với cách âm, phòng giải trí đa phương tiện.' },
      { title: 'Trang trí & điểm nhấn', desc: 'Tranh nghệ thuật original, đèn chùm crystal, rèm tự động và hệ thống smart home.' },
    ],
  },
]

export default function Design() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (apartment) => {
    setSelectedApartment(apartment)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedApartment(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedApartment) {
      setCurrentImageIndex((prev) => 
        prev === selectedApartment.gallery.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedApartment) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedApartment.gallery.length - 1 : prev - 1
      )
    }
  }

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
            Căn Hộ <span className="text-accent-gold">Mẫu</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mỗi căn hộ tại ATERA CENTRAL đều được thiết kế tỉ mỉ, 
            mang đến không gian sống hoàn hảo phù hợp với từng phong cách sống.
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
            {apartmentTypes.map((item, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="bg-white rounded-2xl overflow-hidden text-dark-900 cursor-pointer hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
                  onClick={() => openModal(item)}
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    {/* Type & Area Overlay */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 text-center">
                      <h4 className="text-white font-bold text-lg">{item.type}</h4>
                      <p className="text-gray-200 text-sm">Diện tích: {item.area}</p>
                    </div>
                    {/* Click hint */}
                    <div className="absolute bottom-2 right-2 bg-accent-gold text-white text-xs px-2 py-1 rounded">
                      Xem chi tiết
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 text-center flex-1 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold mb-2">
                      <span className="text-dark-900">{item.name.split(' ')[0]}</span>{' '}
                      <span className="text-accent-gold italic">{item.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-accent-gold font-semibold mb-4">{item.target}</p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 min-h-[80px]">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedApartment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-dark-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <HiX className="text-2xl" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image Gallery */}
                <div className="relative">
                  <img
                    src={selectedApartment.gallery[currentImageIndex]}
                    alt={selectedApartment.name}
                    className="w-full h-80 md:h-full object-cover"
                  />
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                  >
                    <HiChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                  >
                    <HiChevronRight className="text-2xl" />
                  </button>

                  {/* Thumbnails */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedApartment.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                          idx === currentImageIndex ? 'border-accent-gold' : 'border-white/30'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 text-white overflow-y-auto max-h-[80vh]">
                  <div className="mb-3">
                    <span className="text-accent-gold text-sm font-semibold">{selectedApartment.type}</span>
                    <span className="text-gray-400 text-sm ml-2">• Diện tích: {selectedApartment.area}</span>
                  </div>
                  
                  {/* Main Title */}
                  <h3 className="text-3xl font-heading font-bold mb-1">
                    <span className="text-white">{selectedApartment.name.split(' ')[0]}</span>{' '}
                    <span className="text-accent-gold italic">{selectedApartment.name.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  
                  {/* Detail Name & Design Story */}
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white">{selectedApartment.detailName}</h4>
                    <p className="text-accent-gold italic">Câu chuyện thiết kế: {selectedApartment.designStory}</p>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-5 text-sm">{selectedApartment.designDescription}</p>

                  {/* Target Buyers */}
                  <div className="bg-dark-700/50 rounded-xl p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent-gold">👤</span>
                      <span className="text-accent-gold font-bold">TARGET BUYERS:</span>
                      <span className="text-white font-semibold">{selectedApartment.targetBuyers}</span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><span className="text-gray-400">Nghề nghiệp:</span> {selectedApartment.careers}</p>
                      <p><span className="text-gray-400">Giá trị sống:</span> {selectedApartment.lifestyle}</p>
                    </div>
                  </div>

                  {/* Interior Features */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-accent-gold">🏠</span>
                      <h4 className="font-bold text-accent-gold">YẾU TỐ NỘI THẤT</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      {selectedApartment.interiorFeatures?.map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-accent-gold font-semibold min-w-[100px]">{feature.title}:</span>
                          <span className="text-gray-300">{feature.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
