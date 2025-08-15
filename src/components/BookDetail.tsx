import React from 'react';
import { ArrowLeft, Download, BookOpen, User, Calendar, Tag, FileText, Eye } from 'lucide-react';
import { Book } from '../types';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onBack }) => {
  const handleDownload = () => {
    // In a real app, this would download the actual file
    alert('Download functionality would be implemented here. In a production app, this would serve the actual book file.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="aspect-w-3 aspect-h-4 mb-6">
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-24 w-24 text-blue-400" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Book</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Book Stats */}
              <div className="mt-6 space-y-3 text-sm">
                {book.fileSize && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-medium">{book.fileSize}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">{new Date(book.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <div className="flex items-center space-x-2 text-lg text-gray-600 mb-4">
                  <User className="h-5 w-5" />
                  <span>by {book.author}</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Category:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    {book.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">
                    {new Date(book.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  {book.description ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {book.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">
                      No description available for this book.
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Upload Date:</span>
                    <p className="font-medium">{new Date(book.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  {book.fileSize && (
                    <div>
                      <span className="text-gray-600">File Size:</span>
                      <p className="font-medium">{book.fileSize}</p>
                    </div>
                  )}
                  {book.pages && (
                    <div>
                      <span className="text-gray-600">Number of Pages:</span>
                      <p className="font-medium">{book.pages} pages</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium">{book.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Books Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Books</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              Similar book recommendations would be displayed here based on category and author.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;