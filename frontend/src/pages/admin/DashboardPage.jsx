import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UsersIcon, 
  EnvelopeIcon, 
  CheckCircleIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { contactService, chatService } from '../../services';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0
  });
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    loadContacts();
    loadUnreadChatCount();
  }, []);

  const loadUnreadChatCount = async () => {
    try {
      const response = await chatService.getUnreadCount();
      if (response.data.success) {
        setUnreadChatCount(response.data.count);
      }
    } catch (error) {
      console.error('Failed to load unread chat count:', error);
    }
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAll();
      // Backend returns: { success: true, data: { content: [...], page: 0, ... } }
      const contactList = response.data?.content || [];
      setContacts(contactList);
      
      // Calculate stats
      const stats = {
        total: contactList.length,
        new: contactList.filter(c => c.status === 'NEW').length,
        contacted: contactList.filter(c => c.status === 'CONTACTED').length,
        converted: contactList.filter(c => c.status === 'CONVERTED').length
      };
      setStats(stats);
    } catch (error) {
      console.error('Failed to load contacts:', error);
      setContacts([]);
      setStats({ total: 0, new: 0, contacted: 0, converted: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await contactService.updateStatus(contactId, newStatus);
      loadContacts();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Không thể cập nhật trạng thái');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'NEW': 'bg-blue-100 text-blue-800',
      'CONTACTED': 'bg-yellow-100 text-yellow-800',
      'INTERESTED': 'bg-green-100 text-green-800',
      'MEETING_SCHEDULED': 'bg-purple-100 text-purple-800',
      'CONVERTED': 'bg-green-600 text-white',
      'NOT_INTERESTED': 'bg-gray-100 text-gray-800',
      'SPAM': 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const texts = {
      'NEW': 'Mới',
      'CONTACTED': 'Đã liên hệ',
      'INTERESTED': 'Quan tâm',
      'MEETING_SCHEDULED': 'Hẹn gặp',
      'CONVERTED': 'Đã chuyển đổi',
      'NOT_INTERESTED': 'Không quan tâm',
      'SPAM': 'Spam'
    };
    return texts[status] || status;
  };

  const filteredContacts = selectedStatus 
    ? contacts.filter(c => c.status === selectedStatus)
    : contacts;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ATERA - Quản lý tin nhắn</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Xin chào, <span className="font-semibold">{user?.username}</span>
              </span>
              <Link
                to="/admin/chat"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-accent-gold hover:bg-amber-600 relative"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                Chat
                {unreadChatCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadChatCount}
                  </span>
                )}
              </Link>
              <a
                href="/"
                target="_blank"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Trang chủ
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng liên hệ</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <UsersIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
               onClick={() => setSelectedStatus(selectedStatus === 'NEW' ? '' : 'NEW')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mới</p>
                <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <EnvelopeIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
               onClick={() => setSelectedStatus(selectedStatus === 'CONTACTED' ? '' : 'CONTACTED')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã liên hệ</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.contacted}</p>
              </div>
              <ClockIcon className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
               onClick={() => setSelectedStatus(selectedStatus === 'CONVERTED' ? '' : 'CONVERTED')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chuyển đổi</p>
                <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh sách liên hệ
              {selectedStatus && ` - ${getStatusText(selectedStatus)}`}
            </h2>
            {selectedStatus && (
              <button
                onClick={() => setSelectedStatus('')}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Đang tải...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Không có liên hệ nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Họ tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Liên hệ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quan tâm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tin nhắn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.phone}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.interestType || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {contact.message || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(contact.status)} border-0 cursor-pointer focus:ring-2 focus:ring-indigo-500`}
                        >
                          <option value="NEW">Mới</option>
                          <option value="CONTACTED">Đã liên hệ</option>
                          <option value="INTERESTED">Quan tâm</option>
                          <option value="MEETING_SCHEDULED">Hẹn gặp</option>
                          <option value="CONVERTED">Đã chuyển đổi</option>
                          <option value="NOT_INTERESTED">Không quan tâm</option>
                          <option value="SPAM">Spam</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleString('vi-VN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
