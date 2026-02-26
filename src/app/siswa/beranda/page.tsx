'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Clock, 
  Calendar,
  Award,
  Bell,
  LogOut,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'

export default function StudentHome() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Mock data
  const upcomingExams = [
    { 
      id: 1, 
      subject: 'Matematika', 
      title: 'Ujian Semester 1 - Aljabar',
      date: '15 Jan 2024', 
      time: '08:00 - 10:00',
      duration: '120 menit',
      status: 'upcoming',
      teacher: 'Pak Budi'
    },
    { 
      id: 2, 
      subject: 'Bahasa Indonesia', 
      title: 'Ujian Tengah Semester',
      date: '18 Jan 2024', 
      time: '10:00 - 12:00',
      duration: '120 menit',
      status: 'upcoming',
      teacher: 'Bu Siti'
    },
  ]

  const completedExams = [
    {
      id: 3,
      subject: 'Fisika',
      title: 'Ujian Fisika Dasar',
      date: '10 Jan 2024',
      score: 85,
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ExamFilQs</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Siswa'}</p>
                  <p className="text-xs text-gray-500">Kelas XII RPL 1</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || 'S'}
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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Halo, {user?.name?.split(' ')[0] || 'Siswa'}! 👋
            </h2>
            <p className="text-green-100 text-lg">
              Siap untuk menyelesaikan ujian hari ini? Tetap semangat dan kerjakan dengan teliti!
            </p>
            
            <div className="flex gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <p className="text-xs text-green-100">Ujian Mendatang</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <p className="text-xs text-green-100">Ujian Selesai</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <p className="text-xs text-green-100">Rata-rata Nilai</p>
                <p className="text-2xl font-bold">82.5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Exams */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Ujian Mendatang
              </h3>
              <span className="text-sm text-gray-500">{upcomingExams.length} ujian</span>
            </div>

            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                        {exam.subject.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{exam.title}</h4>
                        <p className="text-gray-500">{exam.subject} • {exam.teacher}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exam.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exam.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                        {exam.duration}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Mulai
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Completed Exams */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Ujian Selesai
              </h3>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {completedExams.map((exam, index) => (
                  <div key={exam.id} className={`p-6 flex items-center justify-between ${
                    index !== completedExams.length - 1 ? 'border-b border-gray-100' : ''
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                        <p className="text-sm text-gray-500">{exam.subject} • {exam.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Nilai</p>
                        <p className="text-2xl font-bold text-green-600">{exam.score}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Award className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Jadwal Hari Ini
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-2 h-12 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Matematika</p>
                    <p className="text-sm text-gray-600">08:00 - 10:00</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-200 text-purple-700 rounded-lg text-xs font-medium">
                    Ujian
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl opacity-60">
                  <div className="w-2 h-12 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Bahasa Inggris</p>
                    <p className="text-sm text-gray-600">13:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Pengumuman</h4>
                  <p className="text-sm text-orange-100">
                    Ujian Semester 1 akan dimulai pada tanggal 15 Januari 2024. Pastikan Anda sudah mempersiapkan diri dengan baik!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistik</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Tingkat Kehadiran</span>
                    <span className="font-semibold text-gray-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Rata-rata Kelas</span>
                    <span className="font-semibold text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}