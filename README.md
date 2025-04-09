## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS + Dark Mode
- **Charting**: Recharts
- **APIs**:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [CoinGecko](https://www.coingecko.com/en/api/documentation)

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/crypto-weather-nexus.git
cd crypto-weather-nexus
```

### 2. Install dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npm install clsx uuid react-hot-toast framer-motion lucide-react @reduxjs/toolkit react-redux redux-thunk recharts redux-persist
```

### 3. Create .env

```bash
touch .env
```

And add the environment variables 

```
NEXT_PUBLIC_WEATHER_API = ""
NEXT_PUBLIC_CRYPTO_API = ""
NEXT_PUBLIC_NEWS_API = ""
```

### 4. Run the dev server

```bash
npm run dev
```

### 5. Lint and Format

```bash
npm run lint
npm run format
```

## 🧠 Design Decisions

1. **State Management**: Redux Toolkit was chosen for its simplicity and integration with Redux DevTools. Persisted state is used for user preferences to maintain data across sessions.
2. **WebSocket Integration**: A dedicated WebSocket utility handles real-time updates for cryptocurrency prices, with automatic reconnection logic for reliability. Due to the unavailability of the websocket, this is unmounted. On discovery of a new websocket of similar use, it can be remounted.
3. **API Abstraction**: API calls are abstracted into utility functions to ensure separation of concerns and reusability.
4. **Dynamic Routing**: Next.js dynamic routes are used for detail pages (e.g., `/weather/[city]` and `/crypto/[id]`) to provide a clean and scalable URL structure.
5. **Notification System**: A centralized notification system is implemented using Redux and `react-hot-toast` for real-time alerts.
6. **Charting**: Recharts was selected for its ease of use and responsive design, ensuring compatibility with various screen sizes.

## 🧗 Challenges and Resolutions

1. **WebSocket Reliability**: The WebSocket for cryptocurrency price updates was unreliable. To address this, a reconnection mechanism was implemented, and the WebSocket feature was temporarily unmounted until a more stable service is identified.
2. **State Persistence**: Ensuring user preferences persist across sessions was challenging. This was resolved by integrating `redux-persist` to store preferences locally.
3. **Dynamic API Data Handling**: Handling dynamic API responses for weather and cryptocurrency data required robust error handling and fallback mechanisms to ensure the app remains functional even when APIs fail.
4. **Responsive Design**: Ensuring charts and UI components adapt to various screen sizes was achieved using Recharts and Tailwind CSS's responsive utilities.
5. **Notification Overload**: To prevent overwhelming users with notifications, a limit of 10 notifications was enforced, and older notifications are automatically removed.

## 📤 Deployment

```bash 
npm run build
npm start
```

