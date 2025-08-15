import React, { useState } from 'react';
import { Search, BookOpen, TrendingUp, Users, Clock } from 'lucide-react';
import { Book } from '../types';

interface HomepageProps {
  onSearch: () => void;
  books: Book[];
  onBookSelect: (book: Book) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSearch, books, onBookSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const featuredBooks = books.slice(0, 6);

  const stats = [
    { icon: BookOpen, label: 'Total Books', value: books.length.toString() },
    { icon: Users, label: 'Active Users', value: '1,240' },
    { icon: TrendingUp, label: 'Downloads', value: '12.5K' },
    { icon: Clock, label: 'Available 24/7', value: 'Always' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Digital Library
            <br />
            <span className="text-blue-600">Awaits</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover, upload, and share digital books in our minimalist library platform. 
            Built for readers, by readers.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Added</h2>
              <p className="text-lg text-gray-600">Discover the latest additions to our library</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookSelect(book)}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100"
                >
                  <div className="aspect-w-3 aspect-h-4 mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {book.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(book.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={onSearch}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Browse All Books
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Share Your Knowledge
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community of readers and contributors. Upload your books and help build 
            the world's most accessible digital library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </button>
            <button
              onClick={onSearch}
              className="px-8 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-colors font-medium"
            >
              Explore Library
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;