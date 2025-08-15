import React, { useState, useEffect } from 'react';
import { Search, BookOpen, User, Upload, Menu, X } from 'lucide-react';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import UploadBook from './components/UploadBook';
import Library from './components/Library';
import BookDetail from './components/BookDetail';
import { User as UserType, Book } from './types';
import { getStoredUser, getStoredBooks } from './utils/storage';

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'upload' | 'library' | 'book-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedBooks = getStoredBooks();
    if (storedUser) setCurrentUser(storedUser);
    setBooks(storedBooks);
  }, []);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handleBookUpload = (book: Book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('book-detail');
  };

  const navigation = [
    { name: 'Home', page: 'home' as Page, icon: BookOpen },
    { name: 'Library', page: 'library' as Page, icon: Search },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onSearch={() => setCurrentPage('library')} books={books} onBookSelect={handleBookSelect} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <RegisterPage onRegister={handleLogin} onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'dashboard':
        return <Dashboard user={currentUser!} books={books.filter(book => book.uploadedBy === currentUser?.id)} onUpload={() => setCurrentPage('upload')} />;
      case 'upload':
        return <UploadBook onUpload={handleBookUpload} user={currentUser!} onCancel={() => setCurrentPage('dashboard')} />;
      case 'library':
        return <Library books={books} onBookSelect={handleBookSelect} />;
      case 'book-detail':
        return <BookDetail book={selectedBook!} onBack={() => setCurrentPage('library')} />;
      default:
        return <Homepage onSearch={() => setCurrentPage('library')} books={books} onBookSelect={handleBookSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors"
              >
                <BookOpen className="h-8 w-8" />
                <span className="font-semibold text-xl">E-Library</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              ))}

              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('upload')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setCurrentPage('register')}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCurrentPage(item.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.page
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                ))}

                {currentUser ? (
                  <>
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('upload');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 mt-4">
                    <button
                      onClick={() => {
                        setCurrentPage('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;