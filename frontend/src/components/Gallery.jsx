import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const galleryImages = [
  { src: '/images/gallery/gallery-23.jpg', category: 'exterior', title: 'Tổng quan dự án' },
  { src: '/images/gallery/gallery-24.jpg', category: 'exterior', title: 'Phối cảnh dự án' },
  { src: '/images/gallery/gallery-25.jpg', category: 'exterior', title: 'Khu biệt thự' },
  { src: '/images/gallery/gallery-26.jpg', category: 'exterior', title: 'Cảnh quan nội khu' },
  { src: '/images/gallery/gallery-27.jpg', category: 'exterior', title: 'Đường nội khu' },
  { src: '/images/gallery/gallery-28.jpg', category: 'exterior', title: 'Khu nhà phố' },
  { src: '/images/overview/overview-5.jpg', category: 'interior', title: 'Nội thất cao cấp' },
  { src: '/images/overview/overview-6.jpg', category: 'interior', title: 'Phòng khách' },
  { src: '/images/overview/overview-7.jpg', category: 'interior', title: 'Không gian sống' },
  { src: '/images/amenities/amenities-1.png', category: 'amenity', title: 'Tiện ích nội khu' },
  { src: '/images/amenities/amenities-2.png', category: 'amenity', title: 'Khu vui chơi' },
  { src: '/images/amenities/amenities-3.png', category: 'amenity', title: 'Công viên xanh' },
  { src: '/images/amenities/amenities-4.png', category: 'amenity', title: 'Hồ bơi' },
  { src: '/images/amenities/amenities-5.png', category: 'amenity', title: 'Gym & Spa' },
  { src: '/images/design/design-1.png', category: 'interior', title: 'Thiết kế căn hộ' },
  { src: '/images/design/design-2.png', category: 'interior', title: 'Mẫu nhà phố' },
]

const categories = [
  { id: 'all', label: 'Tất cả' },
  { id: 'exterior', label: 'Ngoại thất' },
  { id: 'interior', label: 'Nội thất' },
  { id: 'amenity', label: 'Tiện ích' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section id="gallery" className="pt-32 pb-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-gold font-semibold uppercase tracking-wider">
            Thư viện ảnh
          </span>
          <h2 className="section-title mt-2">
            Khám Phá <span className="text-accent-gold">ATERA PHỐ NỐI</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-accent-gold text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">{image.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-4xl hover:text-accent-gold"
              >
                <HiX />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 text-white text-4xl hover:text-accent-gold"
              >
                <HiChevronLeft />
              </button>

              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={filteredImages[currentImageIndex]?.src}
                alt={filteredImages[currentImageIndex]?.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 text-white text-4xl hover:text-accent-gold"
              >
                <HiChevronRight />
              </button>

              <div className="absolute bottom-4 text-white text-center">
                <p className="text-lg">{filteredImages[currentImageIndex]?.title}</p>
                <p className="text-sm text-gray-400">{currentImageIndex + 1} / {filteredImages.length}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
