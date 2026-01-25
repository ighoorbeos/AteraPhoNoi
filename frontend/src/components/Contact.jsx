import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi'
import { contactService } from '../services/api'

const contactInfo = [
  {
    icon: <HiPhone />,
    title: 'Hotline',
    value: '0327 312 618',
    href: 'tel:0327312618',
  },
  {
    icon: <HiMail />,
    title: 'Email',
    value: 'contact@atera-phonoi.vn',
    href: 'mailto:contact@atera-phonoi.vn',
  },
  {
    icon: <HiLocationMarker />,
    title: 'Địa chỉ',
    value: 'Phố Nối, Văn Lâm, Hưng Yên',
    href: '#',
  },
  {
    icon: <HiClock />,
    title: 'Giờ làm việc',
    value: '8:00 - 21:00 (Tất cả các ngày)',
    href: '#',
  },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await contactService.submitContact(data)
      if (response.data.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    }
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(null), 5000)
  }

  return (
    <section id="contact" className="pt-32 pb-20 bg-dark-900 text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-gold font-semibold uppercase tracking-wider">
              Liên hệ với chúng tôi
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-6">
              Đăng Ký Nhận <br />
              <span className="text-accent-gold">Thông Tin Ưu Đãi</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Để lại thông tin để được tư vấn chi tiết về dự án ATERA PHỐ NỐI 
              và nhận những ưu đãi hấp dẫn nhất từ chủ đầu tư.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-800 hover:bg-dark-700 transition-colors"
                >
                  <div className="text-accent-gold text-2xl">{info.icon}</div>
                  <div>
                    <div className="text-gray-400 text-sm">{info.title}</div>
                    <div className="font-semibold">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 text-dark-900"
          >
            <h3 className="text-2xl font-bold mb-6">Đăng ký tư vấn miễn phí</h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                Đã có lỗi xảy ra. Vui lòng thử lại sau.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                  type="text"
                  placeholder="Họ và tên *"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-accent-gold`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('phone', { 
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value: /^(0|\+84)[0-9]{9,10}$/,
                      message: 'Số điện thoại không hợp lệ'
                    }
                  })}
                  type="tel"
                  placeholder="Số điện thoại *"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-accent-gold`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email', { 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email không hợp lệ'
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-accent-gold`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('interestedProduct')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-accent-gold text-gray-600"
                >
                  <option value="">Sản phẩm quan tâm</option>
                  <option value="shophouse">Shophouse</option>
                  <option value="apartment">Chung cư cao cấp</option>
                  <option value="townhouse">Liền kề</option>
                  <option value="all">Tất cả sản phẩm</option>
                </select>
              </div>

              <div>
                <textarea
                  {...register('message')}
                  rows="4"
                  placeholder="Nội dung tin nhắn..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-accent-gold resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Bằng việc gửi thông tin, bạn đồng ý với{' '}
                <a href="#" className="text-accent-gold hover:underline">
                  Điều khoản sử dụng
                </a>{' '}
                của chúng tôi.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
