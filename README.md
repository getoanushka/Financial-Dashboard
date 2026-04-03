# Finance Dashboard

A modern React-based finance dashboard application built with Vite, featuring interactive charts, transaction management, and financial insights.

## Features

- **Dashboard Overview**: Summary cards, spending trends, and key metrics
- **Transaction Management**: View, add, and manage financial transactions
- **Interactive Charts**: Visual representation of spending by category and trends over time
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility
- **Smooth Animations**: Enhanced user experience with Framer Motion

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dash
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components
│   ├── transactions/  # Transaction-related components
│   └── ui/           # Reusable UI components
├── context/          # React context for state management
├── data/            # Mock data
├── pages/           # Main application pages
└── utils/           # Utility functions
```
