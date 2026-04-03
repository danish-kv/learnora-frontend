# Learnora Frontend

Welcome to the Learnora Frontend repository! This is the client-side application for Learnora, an innovative e-learning platform that provides an interactive and engaging learning experience for students, tutors, and administrators.

## Features

### User Experience
- Responsive design for all devices
- Intuitive course browsing and management
- Real-time video conferencing and chat
- Interactive learning tools and assessments
- Progress tracking and analytics visualization

### Key Components
- **Authentication System**: Secure login with JWT and Google OAuth
- **Course Marketplace**: Browse, purchase, and access educational content
- **Live Communication**: Real-time chat and video calls using ZegoCloud
- **Interactive Learning**: MCQ contests, discussions, and community features
- **Data Visualization**: Charts and progress tracking using Recharts
- **File Management**: AWS S3 integration for file uploads
- **Payment Processing**: Secure payments via Stripe integration

## Tech Stack

### Core Technologies
- **Framework**: React.js
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with components from:
  - Radix UI
  - shadcn/ui
  - Tailwind 

### UI/UX Libraries
- **Icons**: 
  - Font Awesome
  - Lucide React
  - React Icons
- **Animations**: Framer Motion
- **Charts**: 
  - Recharts
  - Chart.js with react-chartjs-2
- **Forms**: 
  - Formik
  - Yup (validation)
- **Date Handling**: date-fns
- **Notifications**: 
  - React Hot Toast
  - SweetAlert2

### Additional Features
- **Video Player**: React Player
- **PDF Generation**: jspdf with html2canvas
- **Data Tables**: React Table
- **Progress Indicators**: 
  - React Circular Progressbar
  - Loading Indicators

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/danish-kv/learnora-frontend
cd learnora-frontend
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_backend_api_url
VITE_API_WS_URL=your_backend_ws_api_url
VITE_CLIENT_ID=your_google_client_id
VITE_ZEGO_APP_ID=your_zegocloud_app_id
VITE_ZEGO_SECRET_KEY=your_zegocloud_server_secret
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

## Project Structure
```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── features/        # Feature-specific components
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── lib/            # Utility functions
├── pages/          # Route components
├── services/       # API services
├── store/          # Redux store configuration
├── styles/         # Global styles
└── utils/          # Miscellaneous utility functions

```

## Related Projects

- [Learnora Backend](https://github.com/danish-kv/learnora-backend)
