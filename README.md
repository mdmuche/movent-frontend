# 🎫 Movent - Frontend Client

Movent is a premium, feature-rich event and meal ticketing management system built with React, Vite, Tailwind CSS v4, and Redux Toolkit. It features a curated emerald-teal dark mode aesthetic (`#04201a`), interactive event mapping via Leaflet & Mapbox, detailed analytics dashboards using Recharts, and full role-based access control for Attendees, Organizers, and Admins.

---

## ✨ Features

### 👤 Attendee Portal
- **Browse & Search Events**: Filter by category, location, and search tags.
- **Ticket Booking & Selection**: Select standard or VIP tickets with live checkout state.
- **Custom Checkout Flow**: Smooth order summaries, promo code support, and dynamic payment success screens.
- **My Tickets & Profile**: View purchased tickets, cancel tickets, and manage user profile details and stats.

### 💼 Organizer Dashboard
- **Event Creation & Management**: Create and edit event details including location coordinates, dates, tickets, and description.
- **Attendees Tracking**: View registered users and ticketing status.
- **Performance Analytics**: Visualized revenue charts, total sales, page view KPIs, and attendee insights.

### 🛡️ Admin Management Suite
- **Event Queue & Approval**: Approve/reject pending event submissions from organizers.
- **User Registry**: Manage roles, register new users, and block/unblock accounts.
- **System Configuration**: Real-time management of global app configurations.
- **Audit Logs**: Access structured logs of important actions across the application.

### 🎨 Premium UI & Interactive Maps
- **Dark Emerald Theme**: Clean, professional HSL-based dark mode colors with beautiful hover animations and custom buttons.
- **Interactive Venue Maps**: Interactive maps powered by Leaflet and styled with Mapbox, featuring custom cyan markers for event locations.
- **Interactive Graphs**: Responsive line, bar, and area charts powered by Recharts for data analytics.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Slices & Async Thunks)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7 (React Router DOM)](https://reactrouter.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 📂 Project Structure

```text
movent/
├── public/                 # Static assets & graphics
├── src/
│   ├── api/                # Axios instance & API endpoints modules
│   │   ├── adminApi.js
│   │   ├── authApi.js
│   │   ├── checkoutApi.js
│   │   └── ...
│   ├── assets/             # Brand logos & icons
│   ├── components/         # Reusable UI & layout components
│   │   ├── common/         # Navbar, Footer
│   │   ├── ui/             # Form fields, buttons, badges
│   │   ├── VenueMap.jsx    # Leaflet-based interactive map
│   │   └── ...
│   ├── data/               # Static categories & Mock data
│   ├── pages/              # Routed pages grouped by role
│   │   ├── Admin/          # Admin dashboards, logs, system config
│   │   ├── attendee/       # Profiles, checkouts, tickets
│   │   ├── auth/           # Login, verification, password recovery
│   │   ├── organizer/      # Event creation, analytics, listings
│   │   └── public/         # Homepage, global search & event details
│   ├── store/              # Redux setup
│   │   ├── slices/         # Slices for state slices
│   │   ├── thunks/         # Redux Async Thunks for API integrations
│   │   └── store.js        # Redux store configurations
│   ├── App.jsx             # React Router routing configurations
│   ├── index.css           # Global Tailwind directives & styles
│   └── main.jsx            # React root component initialization
├── .env                    # Environment configurations
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite configurations
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/)

### 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mdmuche/movent.git
   cd movent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # API backend endpoint URL
   VITE_API_URL=http://localhost:5001

   # Mapbox integration access token
   VITE_MAP_ACCESS_TOKEN=your_mapbox_access_token_here
   ```

### 💻 Running Locally

Start the Vite local development server:
```bash
npm run dev
```
The application will run by default at `http://localhost:5173`.

### 🏗️ Building for Production

Compile and bundle the application assets for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```
