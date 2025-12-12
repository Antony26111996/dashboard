# Sales Dashboard

A modern, feature-rich sales analytics dashboard built with React and Material-UI. This application showcases a professional-grade admin panel with interactive widgets, real-time data visualization, and comprehensive export capabilities.

## Features

### Authentication
- Secure login page with form validation
- Protected routes with authentication context
- Session persistence via localStorage
- User profile display with logout functionality

### Dashboard Layout
- Responsive sidebar navigation (collapsible)
- Modern header with search, notifications, and user menu
- Mobile-friendly design with hamburger menu
- Smooth transitions and animations

### Interactive Widgets
- **Stats Cards** - Key metrics with animated counters and trend indicators
- **Revenue Chart** - Area/Bar chart with weekly/yearly toggle (Recharts)
- **Orders Table** - Sortable data table with status badges and pagination
- **Top Products** - Product performance with progress bars
- **Customer Insights** - Pie chart with segment breakdown
- **Activity Feed** - Real-time activity timeline

### Drag & Drop
- Fully customizable dashboard layout using @dnd-kit
- Drag widgets to reorder
- Remove/restore widgets as needed
- Layout persistence in localStorage

### Theme Support
- Dark mode (default) and Light mode
- Seamless theme switching
- Consistent styling across all components

### Data Export
- **CSV Export** - Export orders, products, and revenue data
- **JSON Export** - Full dashboard data export
- **PDF Export** - Charts exportable as PDF documents
- Individual widget export buttons

### Keyboard Shortcuts
- `Ctrl + K` - Open command palette



### Command Palette
- Quick navigation to any page
- Search functionality
- Action shortcuts
- Keyboard-friendly interface



## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v5** - Component library
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization
- **@dnd-kit** - Drag and drop functionality
- **html2canvas** - Screenshot capture for PDF export
- **jsPDF** - PDF generation
- **Fake Store API** - Mock product data

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── Layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── CommandPalette.jsx
│   └── Widgets/
│       ├── DraggableWidget.jsx
│       ├── StatsCard.jsx
│       ├── RevenueChart.jsx
│       ├── OrdersTable.jsx
│       ├── TopProducts.jsx
│       ├── CustomerInsights.jsx
│       └── ActivityFeed.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── DataContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationContext.jsx
├── hooks/
│   ├── useAnimatedCounter.js
│   └── useKeyboardShortcuts.js
├── pages/
│   ├── Analytics.jsx
│   ├── Users.jsx
│   ├── Settings.jsx
│   └── Reports.jsx
├── utils/
│   └── exportUtils.js
├── styles/
│   └── animations.css
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sales-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials
- **Email:** demo@example.com (or any email)
- **Password:** password123 (or any password)

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Key Highlights

- **No Backend Required** - All data is mocked/fetched from public APIs
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Accessibility** - Keyboard navigation and screen reader support
- **Performance** - Optimized with React best practices
- **Modern UI/UX** - Clean, professional design with attention to detail
- **Customizable** - Easy to extend and modify

## License

MIT License
