'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  Bell,
  LogOut,
  Plus,
  MoreHorizontal
} from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'

export default function TeacherDashboard() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Mock data - nanti bisa diganti dengan data real dari API
  const stats = [
    { label: 'Total Kelas', value: 5, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Total Siswa', value: 127, icon: Users, color: 'bg-green-500' },
    { label: 'Ujian Aktif', value: 3, icon: FileText, color: 'bg-purple-500' },
    { label: 'Rata-rata Nilai', value: '78.5', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  const recentExams = [
    { id: 1, title: 'Ujian Matematika Semester 1', class: 'XII RPL 1', date: '2024-01-15', status: 'active' },
    { id: 2, title: 'Ujian Bahasa Indonesia', class: 'XII RPL 2', date: '2024-01-18', status: 'scheduled' },
    { id: 3, title: 'Ujian Fisika Dasar', class: 'XI TKJ 1', date: '2024-01-20', status: 'completed' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ExamFilQs</h1>
                <p className="text-xs text-gray-500">Teacher Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Guru'}</p>
                  <p className="text-xs text-gray-500">Guru Matematika</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'G'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Selamat Datang, {user?.name?.split(' ')[0] || 'Guru'}! 👋
          </h2>
          <p className="text-gray-600 mt-1">
            Berikut adalah ringkasan aktivitas pembelajaran hari ini.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Exams */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Ujian Terbaru</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Lihat Semua
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-12 rounded-full ${
                        exam.status === 'active' ? 'bg-green-500' : 
                        exam.status === 'scheduled' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                        <p className="text-sm text-gray-500">{exam.class} • {exam.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exam.status === 'active' ? 'bg-green-100 text-green-700' : 
                        exam.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {exam.status === 'active' ? 'Aktif' : 
                         exam.status === 'scheduled' ? 'Terjadwal' : 'Selesai'}
                      </span>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Buat Ujian Baru</h3>
              <p className="text-blue-100 text-sm mb-4">
                Buat ujian baru untuk kelas Anda dengan mudah dan cepat.
              </p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Buat Ujian
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Kelola Siswa</p>
                    <p className="text-xs text-gray-500">Tambah/edit data siswa</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bank Soal</p>
                    <p className="text-xs text-gray-500">Kelola kumpulan soal</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Jadwal Ujian</p>
                    <p className="text-xs text-gray-500">Atur jadwal ujian</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}