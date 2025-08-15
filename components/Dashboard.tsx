import React from 'react';
import { BookOpen, Upload, Calendar, BarChart3 } from 'lucide-react';
import { User, Book } from '../types';

interface DashboardProps {
  user: User;
  books: Book[];
  onUpload: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, books, onUpload }) => {
  const stats = [
    { icon: BookOpen, label: 'Books Uploaded', value: books.length.toString(), color: 'bg-blue-500' },
    { icon: BarChart3, label: 'Total Views', value: '1,240', color: 'bg-green-500' },
    { icon: Calendar, label: 'Member Since', value: new Date(user.joinDate).getFullYear().toString(), color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
          <p className="text-gray-600 mt-2">Manage your digital library and track your contributions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onUpload}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload New Book</span>
            </button>
          </div>
        </div>

        {/* Recent Books */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Books</h2>
          {books.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books uploaded yet</h3>
              <p className="text-gray-600 mb-6">Start building your digital library by uploading your first book.</p>
              <button
                onClick={onUpload}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Upload Your First Book
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{book.title}</h3>
                    <p className="text-gray-600">by {book.author}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {book.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(book.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm text-gray-500">Uploaded</div>
                    <div className="text-xs text-gray-400">{new Date(book.uploadDate).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;