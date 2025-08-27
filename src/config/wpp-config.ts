export const WPP_OPEN_CONFIG = {
  // WPP Open Staging Environment
  STAGING: {
    baseUrl: 'https://apps-facade-api-ch-stage.os-dev.io',
    applicationId: '30b8e028-31bf-4590-a420-4b908a9c0e72',
    environment: 'staging'
  },
  // WPP Open Production Environment (when ready)
  PRODUCTION: {
    baseUrl: 'https://apps-facade-api-ch.os-dev.io',
    applicationId: '30b8e028-31bf-4590-a420-4b908a9c0e72',
    environment: 'production'
  }
};

// Default to staging for development
export const DEFAULT_CONFIG = WPP_OPEN_CONFIG.STAGING;

// AI Models available in WPP Open
export const WPP_AI_MODELS = [
  { 
    id: 'gpt-4', 
    name: 'GPT-4', 
    description: 'Most capable model, best for complex tasks',
    available: true
  },
  { 
    id: 'gpt-3.5-turbo', 
    name: 'GPT-3.5 Turbo', 
    description: 'Fast and efficient, good for most tasks',
    available: true
  },
  { 
    id: 'claude-3', 
    name: 'Claude 3', 
    description: 'Excellent reasoning and analysis',
    available: true
  },
  { 
    id: 'gemini-pro', 
    name: 'Gemini Pro', 
    description: 'Great for creative and analytical tasks',
    available: true
  }
];
