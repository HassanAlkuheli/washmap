# 🚗 WashMap - Car Wash Booking Platform

<div align="center">

![WashMap Banner](https://img.shields.io/badge/WashMap-Car%20Wash%20Booking-0EA5E9?style=for-the-badge)

**A modern, cross-platform mobile application for finding and booking car washing services in real-time**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0-000020?logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

WashMap revolutionizes the car washing experience by providing users with a convenient, real-time map-based service for finding and booking car wash facilities. Say goodbye to driving around or waiting in long queues!

### ✨ Key Highlights

- 🗺️ **Real-time Map Integration** - Find nearby car wash facilities instantly
- 📊 **Live Queue Status** - See how busy each location is before you go
- 💳 **Easy Booking System** - Select service packages and time slots
- ⭐ **Reviews & Ratings** - Make informed decisions based on user feedback
- 📱 **Cross-Platform** - Works on iOS, Android, and Web

---

## 🎯 Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **🗺️ Interactive Map** | Google Maps integration showing all nearby car wash facilities |
| **📍 Location-Based** | Automatically finds facilities near your current location |
| **⏱️ Queue Management** | Real-time queue count display (Available Now, Low Wait, Busy) |
| **💰 Price Transparency** | View service packages with clear pricing |
| **⭐ Rating System** | User reviews and ratings for each facility |
| **📅 Booking System** | Reserve your spot with flexible time slots |
| **🎨 Modern UI/UX** | Beautiful, intuitive interface with smooth animations |
| **🌐 Web Support** | Access via browser on any device |

---

## 🛠️ Tech Stack

### Frontend

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

| Technology | Purpose | Why? |
|------------|---------|------|
| **React Native** | Cross-platform mobile framework | Write once, deploy to iOS & Android |
| **Expo** | Development toolchain | Simplifies build process and testing |
| **Redux Toolkit** | State management | Predictable state container with minimal boilerplate |
| **React Navigation** | Navigation library | Smooth screen transitions and routing |
| **Expo Vector Icons** | Icon library | Beautiful, consistent icons (FontAwesome5) |
| **Expo Linear Gradient** | Gradient backgrounds | Modern, eye-catching UI effects |
| **Google Maps API** | Map integration | Industry-standard mapping solution |

### Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

| Technology | Purpose | Why? |
|------------|---------|------|
| **Node.js** | Runtime environment | JavaScript everywhere (full-stack JS) |
| **Express.js** | Web framework | Minimal, fast, and unopinionated |
| **CORS** | Cross-Origin Resource Sharing | Secure API communication |
| **Body Parser** | Request body parsing | Handle JSON payloads |

### Development Tools

<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>

---

## 📁 Project Structure

```
washmap/
├── 📱 client/              # React Native Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens
│   │   ├── redux/          # State management
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions & constants
│   ├── App.js              # Root component
│   └── package.json
│
├── 🖥️ server/              # Express.js Backend
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── data/               # Mock data
│   ├── utils/              # Helper functions
│   ├── server.js           # Entry point
│   └── package.json
│
└── 📚 docs/                # Documentation
    ├── FOLDER_STRUCTURE.md
    ├── REFACTORING_SUMMARY.md
    └── SECURITY.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** (optional) - `npm install -g expo-cli`
- **Google Maps API Key** - [Get one here](https://console.cloud.google.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/HassanAlkuheli/washmap.git
cd washmap
```

### Step 2: Setup Environment Variables

#### Frontend Environment

```bash
cd client
cp .env.example .env
```

Edit `client/.env` and add your Google Maps API key:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
REACT_APP_API_BASE_URL=http://localhost:3000/api
```

#### Backend Environment

```bash
cd ../server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=3000
NODE_ENV=development
```

### Step 3: Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### Step 4: Run the Application

#### Start Backend Server

```bash
cd server
npm start
# Or: node server.js
```

Server will run on `http://localhost:3000`

#### Start Frontend App

```bash
cd client
npx expo start --web
```

For mobile development:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app

---

## 💻 Usage

### Web Application

1. Open browser to `http://localhost:19006` (after running `npx expo start --web`)
2. Click "Get Started" on the landing page
3. Browse car wash facilities on the interactive map
4. Click on facility cards to view details
5. Select a service and time slot
6. Confirm your booking

### Mobile Application

1. Install Expo Go on your device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Run `npx expo start` in the client directory
3. Scan the QR code with Expo Go
4. App will load on your device

---

## 📐 Architecture

### Design Principles

This project follows industry best practices:

- **SOLID** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY** - Don't Repeat Yourself
- **KISS** - Keep It Simple, Stupid
- **YAGNI** - You Aren't Gonna Need It

### Frontend Architecture

```
Presentation Layer (Screens)
         ↓
Component Layer (UI Components)
         ↓
Logic Layer (Custom Hooks)
         ↓
State Layer (Redux Store)
         ↓
API Layer (Axios/Fetch)
```

### Backend Architecture (MVC)

```
Routes → Controllers → Data Layer
   ↓         ↓            ↓
 API     Business      Mock DB
Endpoints  Logic      (Future: MongoDB)
```

For detailed architecture documentation, see [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)

---

## 🔒 Security

All sensitive information (API keys, secrets) is managed through environment variables and is **NOT** committed to the repository.

- ✅ API keys in `.env` files (not tracked)
- ✅ `.env.example` templates provided
- ✅ `.gitignore` configured properly
- ✅ Security guide available in [SECURITY.md](./SECURITY.md)

**⚠️ Important**: Never commit your `.env` files!

---

## 🗺️ API Endpoints

### Facilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/facilities` | Get all facilities |
| `GET` | `/api/facilities?lat=X&lng=Y` | Get facilities near location |
| `GET` | `/api/facilities/:id` | Get facility by ID |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create new booking |
| `GET` | `/api/bookings/:userId` | Get user's bookings |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health status |

---

## 📱 Screenshots

<div align="center">

### Landing Screen
*Beautiful gradient hero section with feature highlights*

### Map View
*Interactive Google Maps with facility markers and live queue status*

### Facility Details
*Comprehensive information with service packages, reviews, and booking*

</div>

---

## 🚧 Roadmap

- [x] MVP - Map view with facility cards
- [x] Booking system with time slots
- [x] Queue status indicators
- [x] Reviews and ratings display
- [ ] User authentication (Sign up/Login)
- [ ] User profile management
- [ ] Booking history
- [ ] MongoDB integration
- [ ] Push notifications
- [ ] Payment integration
- [ ] Loyalty rewards system
- [ ] Admin dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Hassan Alkuheli**

- GitHub: [@HassanAlkuheli](https://github.com/HassanAlkuheli)
- Repository: [washmap](https://github.com/HassanAlkuheli/washmap)

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - Amazing cross-platform framework
- [Expo](https://expo.dev/) - Simplifying mobile development
- [Google Maps Platform](https://developers.google.com/maps) - Powerful mapping solution
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management made easy
- [FontAwesome](https://fontawesome.com/) - Beautiful icon library

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Documentation](./docs/)
2. Open an [Issue](https://github.com/HassanAlkuheli/washmap/issues)
3. Contact via GitHub

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Hassan Alkuheli

</div>
