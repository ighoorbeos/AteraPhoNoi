import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram, FaCog } from 'react-icons/fa'

const footerLinks = {
  project: [
    { label: 'Tổng quan', to: 'overview' },
    { label: 'Vị trí', to: 'location' },
    { label: 'Thiết kế', to: 'design' },
    { label: 'Tiện ích', to: 'amenities' },
    { label: 'Mặt bằng', to: 'floorplans' },
  ],
  support: [
    { label: 'Chính sách bán hàng', href: '#' },
    { label: 'Phương thức thanh toán', href: '#' },
    { label: 'Hỗ trợ vay ngân hàng', href: '#' },
    { label: 'Câu hỏi thường gặp', href: '#' },
  ],
  legal: [
    { label: 'Điều khoản sử dụng', href: '#' },
    { label: 'Chính sách bảo mật', href: '#' },
    { label: 'Thông tin pháp lý', href: '#' },
  ],
}

const socialLinks = [
  { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <FaYoutube />, href: 'https://youtube.com', label: 'YouTube' },
  { icon: <FaTiktok />, href: 'https://www.tiktok.com/@ringnhibannha_1312', label: 'TikTok' },
  { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <FaCog />, href: '/admin/login', label: 'Admin', isAdmin: true },
]

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              ATERA <span className="text-accent-gold">PHỐ NỐI</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Khu đô thị sinh thái cao cấp tại trung tâm Phố Nối, Hưng Yên. 
              Điểm đến lý tưởng cho cuộc sống hiện đại và thịnh vượng.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                social.isAdmin ? (
                  <RouterLink
                    key={index}
                    to={social.href}
                    className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-gold hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </RouterLink>
                ) : (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 hover:bg-accent-gold hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Dự án</h4>
            <ul className="space-y-2">
              {footerLinks.project.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    smooth={true}
                    offset={-80}
                    className="text-gray-400 hover:text-accent-gold cursor-pointer transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Đăng ký nhận tin</h4>
            <p className="text-gray-400 mb-4">
              Nhận thông tin mới nhất về dự án và ưu đãi độc quyền.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-2 rounded-lg bg-dark-700 border border-dark-700 focus:outline-none focus:border-accent-gold text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent-gold text-white rounded-lg hover:bg-accent-gold-dark transition-colors"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 ATERA PHỐ NỐI. Bản quyền thuộc về chủ đầu tư.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-accent-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
