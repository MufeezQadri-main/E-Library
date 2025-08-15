# E-Library

A modern digital library application built with React, TypeScript, and Vite, featuring a clean UI powered by Tailwind CSS.

## Features

- 📚 Browse and search through digital books
- 👤 User authentication (Login/Register)
- 📝 Book details view
- 📤 Upload new books
- 📱 Responsive design
- 🎯 Dashboard with analytics
- 🔍 Advanced search functionality

## Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Code Quality:** ESLint

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd E-Library-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/        # React components
│   ├── BookDetail.tsx
│   ├── Dashboard.tsx
│   ├── Homepage.tsx
│   ├── Library.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── UploadBook.tsx
├── utils/            # Utility functions
│   └── storage.ts
├── App.tsx          # Main application component
├── main.tsx        # Application entry point
└── types.ts        # TypeScript type definitions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.