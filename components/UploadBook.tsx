import React, { useState } from 'react';
import { Upload, X, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { Book, User } from '../types';

interface UploadBookProps {
  onUpload: (book: Book) => void;
  user: User;
  onCancel: () => void;
}

const UploadBook: React.FC<UploadBookProps> = ({ onUpload, user, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    pages: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'Biography',
    'History',
    'Philosophy',
    'Arts',
    'Business',
    'Education',
    'Health',
    'Self-Help',
    'Mystery',
    'Romance',
    'Fantasy',
    'Science Fiction',
  ];

  const allowedFileTypes = ['.pdf', '.epub', '.mobi', '.txt', '.doc', '.docx'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!formData.title || !formData.author || !formData.category) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!file) {
      setError('Please select a file to upload');
      setIsLoading(false);
      return;
    }

    // Create book object
    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      category: formData.category,
      uploadDate: new Date().toISOString(),
      uploadedBy: user.id,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      pages: formData.pages ? parseInt(formData.pages) : undefined,
    };

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    onUpload(newBook);
    setSuccess('Book uploaded successfully!');
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        title: '',
        author: '',
        description: '',
        category: '',
        pages: '',
      });
      setFile(null);
      setSuccess('');
      onCancel();
    }, 1500);

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setError(`Invalid file type. Please upload one of: ${allowedFileTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError('File size too large. Maximum size is 50MB');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload New Book</h1>
              <p className="text-gray-600 mt-1">Share your knowledge with the community</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-6">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-6">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book File *
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : file
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-center space-x-3">
                    <BookOpen className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-green-700 font-medium">{file.name}</p>
                      <p className="text-green-600 text-sm">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 mb-2">Drag and drop your book file here</p>
                    <p className="text-gray-500 text-sm mb-4">or</p>
                    <label className="cursor-pointer">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Choose File
                      </span>
                      <input
                        type="file"
                        accept={allowedFileTypes.join(',')}
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-4">
                      Supported formats: {allowedFileTypes.join(', ')} • Max size: 50MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter the book title"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter the author's name"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Pages
                </label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  min="1"
                  value={formData.pages}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter number of pages (optional)"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Provide a brief description of the book (optional)"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Book</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBook;