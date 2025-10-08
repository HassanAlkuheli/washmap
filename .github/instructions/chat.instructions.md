# AI Development Instructions and Constraints

These instructions guide the overall approach and non-functional requirements for building the WashMap application. They must be strictly followed and supersede any contradictory general coding practices.

## 1. Project Philosophy & Stack Enforcement
1.  **Strict Stack Adherence:** Use *only* the defined stack: **React Native (with Expo), Redux Toolkit, NativeWind, Express.js, MongoDB (with Mongoose)**. Do not introduce other libraries unless absolutely necessary for a core requirement (e.g., `react-native-maps`).
2.  **Expo First:** Prioritize the **Expo Managed Workflow**. Avoid using custom native modules (`expo prebuild` or `npx react-native init`) unless a core feature is impossible otherwise.
3.  **Simplicity & Documentation:** Code must be clear, well-commented, and use modern, simple patterns (e.g., Functional Components with Hooks, `createSlice` for Redux). Avoid overly complex abstractions.

## 2. Frontend (UI/UX) Requirements
1.  **Modern and Beautiful UI/UX:** The application must adopt a clean, professional, and modern aesthetic.
    * **Color Palette:** Use a clean, trustworthy primary color (e.g., deep blue or teal) contrasted with bright white and dark gray for text. Use green for confirmed status/available slots and red/orange for high queue/busy status.
    * **Typography:** Use a clean, sans-serif font (Expo default is acceptable).
    * **Component Design:** Utilize sleek cards, gentle shadows, and meaningful icons. Ensure generous padding and margin (whitespace) for a premium feel.
2.  **NativeWind Usage:** All styling must be done using **NativeWind utility classes**. Do not use standard `StyleSheet.create`.
3.  **Core Screens:** Focus on the following main screens for the MVP:
    * `MapScreen` (Default/Home)
    * `FacilityDetailScreen` (Modal or full screen)
    * `BookingScreen`
    * `LoginScreen` / `RegisterScreen`

## 3. Backend & Data Requirements
1.  **API Design:** Create a simple, robust RESTful API using Express.js. API endpoints should be clear and follow standard REST conventions (e.g., `GET /api/facilities`, `POST /api/bookings`).
2.  **Data Mocking:** Since the final application is being built in a single block, create **in-memory data structures** (mock data) for the initial state of the MongoDB database (Facilities and Services) and one initial mock user. Do not attempt a real MongoDB connection, but structure the code as if Mongoose/MongoDB were connected.
3.  **Queue Logic:** The `queueCount` for each facility should be displayed clearly on the map marker/card. This count is a critical real-time piece of data.

## 4. Single-Prompt Output Format
1.  **File Structure:** Provide the complete code by separating files clearly using Markdown code blocks with the file name and language specified (e.g., `### File: App.js (react-native)`).
2.  **Completeness:** The provided code block must be runnable on a local machine (after necessary `npm install` for the declared stack).
3.  **Focus Areas:** Ensure the `MapScreen` with interactive markers and the `FacilityDetailScreen` with service booking logic are the most polished components.