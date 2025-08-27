# 🤖 WPP Open AI Chat Assistant

A React-based AI chat application that integrates with the **WPP Open AI Assistant API** through the Open OS platform. This app automatically authenticates using your Open OS context and provides AI chat capabilities.

## ✨ Features

- **🔗 Open OS Integration**: Automatically connects using your Open OS authentication context
- **🤖 Multiple AI Models**: Choose from GPT-4, GPT-3.5 Turbo, Claude 3, and Gemini Pro
- **💬 Real-time Chat**: Send messages and receive AI responses via the WPP Open API
- **🔍 Health Monitoring**: Check API health and user information
- **🎨 Modern UI**: Beautiful, responsive interface with smooth animations
- **📱 Mobile Friendly**: Works seamlessly on all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Access to WPP Open platform

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (optional):**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Apps Facade base URL
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Launch from Open OS:**
   - **Important**: This app must run within the Open OS platform to access AI services
   - Navigate to the Open OS platform and launch this app from there
   - The app will automatically authenticate using your Open OS context

## 🔑 Open OS Authentication

### How It Works
- **No manual token input**: The app automatically gets your user token from Open OS context
- **Automatic connection**: When launched from Open OS, the app connects automatically
- **Secure by design**: Tokens are never stored in the browser or environment variables

### Running Outside Open OS
If you run this app standalone (e.g., on localhost:3000):
- AI services will not be available
- You'll see instructions to launch from Open OS
- This is the correct behavior for security

## 🌐 Environment Configuration

The app uses environment variables for the Apps Facade base URL:

- **Staging**: `https://apps-facade-api-ch-stage.os-dev.io`
- **Production**: `https://apps-facade-api-prd-one.os.wpp.com`

Set `VITE_APPS_FACADE_BASE` in your `.env.local` file if you need to override the default.

## 📡 API Endpoints Used

- **Health Check**: `GET /api/healthcheck`
- **User Info**: `GET /api/users/me`
- **AI Assistant**: `POST /api/ai-assistant/events`

## 🏗️ Architecture

```
src/
├── hooks/
│   └── use-wpp-ai.ts      # Open OS AI integration hook
├── services/
│   └── wpp-ai-service.ts  # WPP Open API client
├── config/
│   └── wpp-config.ts      # AI models and configuration
└── App.tsx                # Main application component
```

### Key Components

1. **Open OS Context Detection**: Automatically detects when running within Open OS
2. **Automatic Authentication**: Gets user tokens from Open OS context
3. **Apps Facade Integration**: Uses the official WPP Open API endpoints
4. **Real-time AI Chat**: Sends messages to `/api/ai-assistant/events`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with custom animations
- **State Management**: React Hooks
- **API Integration**: Fetch API with Open OS authentication

## 🚨 Troubleshooting

### Common Issues

- **"Not connected to WPP Open"**: Ensure you're running the app from within Open OS
- **"No user token available"**: Check that you're properly authenticated in Open OS
- **"Health check failed"**: Verify the Apps Facade base URL is correct

### Development Tips

- For local testing without Open OS, the app will show appropriate instructions
- Use the health check button to verify API connectivity
- Check the browser console for detailed error information

## 📚 WPP Open Documentation

This app integrates with the official WPP Open platform. For more information about:
- API endpoints and schemas
- Open OS integration
- Available AI models
- Platform features

Visit the [WPP Open Developer Hub](https://wpp.wpp-stage.os-dev.io/application/30b8e028-31bf-4590-a420-4b908a9c0e72/local-creative-studio)

## 🔒 Security Features

- **No client-side secrets**: Tokens are never stored in the browser
- **Open OS context only**: Authentication is handled by the platform
- **Automatic token rotation**: Uses fresh tokens from Open OS context
- **Secure API calls**: All requests use proper Authorization headers

## 🤝 Contributing

This is a demonstration app for WPP Open AI integration. Feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and modify for your own use

## 📄 License

This project is for demonstration purposes of WPP Open AI integration capabilities.
