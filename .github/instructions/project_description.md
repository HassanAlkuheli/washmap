# Project: WashMap

## 1. Simple Project Goal
WashMap is a cross-platform mobile application that provides users with a convenient, real-time map-based service for finding and booking car washing services in their city. 

The primary objective is to replace the need to drive around or wait in long queues by making the entire process digital, transparent, and location-aware.

## 2. Core Feature List (MVP - Minimum Viable Product)

| Feature Category    | User Requirement                           | Implementation Detail                                                                 |
|---------------------|-------------------------------------------|--------------------------------------------------------------------------------------|
| Mapping & Discovery  | Show car wash locations nearby.           | **Google Map Integration:** Main screen displays a map with markers for all facilities (using saved latitude/longitude). |
| Real-Time Data      | See how busy a location is.               | **Queue Status:** Each facility displays a simple integer value for "Cars in Queue" (e.g., 0 to 5+). |
| Facility Details    | See service options, prices, and reviews. | **Detail Screen:** Tapping a marker opens a dedicated screen showing all necessary facility data. |
| Booking             | Select a time and service to book a spot. | **Simple Slot Booking:** User selects a service package and an available time slot (e.g., 30-minute intervals). |
| User Management     | Log in and manage bookings.               | **User Auth:** Simple registration/login and a profile page to view past/upcoming bookings. |

## 3. Recommended Technology Stack
The stack is a robust, well-documented, JavaScript-centric solution built for speed and simplicity.

### A. Frontend (Mobile App - iOS & Android)

| Technology                | Purpose                                   | Why this choice (Simplicity/Speed)                                                                                       |
|---------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **React Native (with Expo)** | View Layer & Cross-Platform Codebase    | Develop once for both iOS and Android. Expo eliminates complex native setup, configuration, and build processes, making development extremely fast. |
| **Redux Toolkit (RTK)**   | State Management                          | The recommended and simplest way to use Redux. It reduces boilerplate code significantly and includes best practices out-of-the-box, keeping state predictable. |
| **NativeWind**            | Styling                                   | Allows developers to use highly intuitive Tailwind CSS utility classes directly in React Native components, speeding up UI development and ensuring a consistent design system. |
| **react-native-maps**     | Google Maps Integration                   | The standard, well-documented library for integrating high-performance maps into a React Native application. |

### B. Backend (API & Database)

| Technology                | Purpose                                   | Why this choice (Simplicity/Speed)                                                                                       |
|---------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| **Node.js**               | Runtime Environment                       | Executes JavaScript on the server. Unifies the language stack (JavaScript end-to-end), simplifying context switching for developers. |
| **Express.js**            | API Framework                            | A minimal and unopinionated framework for Node.js. It's easy to learn and is used to quickly set up robust RESTful APIs for communication between the app and the database. |
| **MongoDB (with Mongoose)** | Database                                 | A NoSQL document database. Its flexible schema allows for faster iterations and simpler data modeling compared to rigid SQL databases. Mongoose provides a simple, structured way to interact with MongoDB. |

## 4. Application Data Structure (Simplified Backend Schema)
The core application data will be stored in three main collections in MongoDB:

| Collection  | Key Data Fields                                           | Purpose                                                   |
|-------------|----------------------------------------------------------|----------------------------------------------------------|
| **Users**   | name, email, password, bookings (array of Booking IDs)  | Authentication and user profile management.              |
| **Facilities** | name, location (lat/lng), address, services (array of Service objects), reviews (array of Review IDs), queueCount (integer) | Stores all static and dynamic car wash business information. |
| **Bookings** | userId, facilityId, serviceName, price, startTime, status (e.g., Pending, Confirmed, Completed) | Manages the actual service reservations and time slot allocation. |

## Principles to Follow
- **DRY** (Don't Repeat Yourself)
- **KISS** (Keep It Simple, Stupid)
- **YAGNI** (You Aren't Gonna Need It)
- **SOLID** (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)

## Hosting
- Use **Docker Compose** for hosting.
- Avoid any external solutions.

## Google Maps API Key
Create a `.env` file with your Google Maps API key:
```
GOOGLE_MAPS_API_KEY=your_api_key_here
```
**Note:** Never commit API keys to version control!
