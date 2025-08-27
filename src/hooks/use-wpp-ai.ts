import { useState, useCallback, useEffect } from 'react';
import WPPOpenAIService, { WPPAIEvent, WPPAIResponse } from '../services/wpp-ai-service';

interface UseWPPAIState {
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  healthStatus: any;
  userInfo: any;
}

interface UseWPPAI {
  state: UseWPPAIState;
  sendMessage: (message: string, model: string) => Promise<WPPAIResponse>;
  checkHealth: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  initializeConnection: () => Promise<void>;
}

// Mock Open OS context for development - replace with real Open OS integration
const useOpenOSContext = () => {
  const [isInOpenOS, setIsInOpenOS] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if we're running in Open OS environment
    const checkOpenOSEnvironment = () => {
      setIsChecking(true);
      
      // This is a simplified check - in real Open OS, you'd check for context
      const hasOpenOSContext = window.location.hostname.includes('os-dev.io') || 
                              window.location.hostname.includes('os.wpp.com');
      
      console.log('Open OS Environment Check:', {
        hostname: window.location.hostname,
        hasOpenOSContext,
        isLocalhost: window.location.hostname === 'localhost'
      });
      
      setIsInOpenOS(hasOpenOSContext);
      
      if (hasOpenOSContext) {
        // In real Open OS, you'd get this from context
        // For now, we'll simulate it
        setUserToken('mock-openos-user-token');
      } else {
        // For local development, we'll provide a mock token for testing
        setUserToken('dev-mock-token');
      }
      
      setIsChecking(false);
    };

    // Add a small delay to simulate the check
    const timer = setTimeout(checkOpenOSEnvironment, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return { isInOpenOS, userToken, isChecking };
};

export const useWPPAI = (): UseWPPAI => {
  const [state, setState] = useState<UseWPPAIState>({
    isLoading: false,
    error: null,
    isConnected: false,
    healthStatus: null,
    userInfo: null,
  });

  const [aiService, setAiService] = useState<WPPOpenAIService | null>(null);
  const { isInOpenOS, userToken, isChecking } = useOpenOSContext();

  const initializeConnection = useCallback(async () => {
    if (isChecking) {
      return; // Still checking, wait
    }

    if (!userToken) {
      setState(prev => ({ 
        ...prev, 
        error: 'No user token available. Please ensure you are properly authenticated.',
        isConnected: false 
      }));
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_APPS_FACADE_BASE || 'https://apps-facade-api-ch-stage.os-dev.io';
      
      console.log('Initializing WPP Open connection:', {
        baseUrl,
        isInOpenOS,
        hasToken: !!userToken
      });
      
      const service = new WPPOpenAIService({
        baseUrl,
        accessToken: userToken,
      });

      // Test connection with health check
      await service.getHealthCheck();
      
      setAiService(service);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isConnected: true,
        error: null 
      }));
    } catch (error) {
      console.error('Connection failed:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to WPP Open',
        isConnected: false 
      }));
    }
  }, [isInOpenOS, userToken, isChecking]);

  const sendMessage = useCallback(async (message: string, model: string): Promise<WPPAIResponse> => {
    if (!aiService) {
      throw new Error('Not connected to WPP Open. Please ensure you are running within the Open OS environment.');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const event: WPPAIEvent = {
        model,
        prompt: message,
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'wpp-open-chat',
          openOS: true
        }
      };

      const response = await aiService.sendAIEvent(event);
      
      setState(prev => ({ ...prev, isLoading: false, error: null }));
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  }, [aiService]);

  const checkHealth = useCallback(async () => {
    if (!aiService) {
      setState(prev => ({ ...prev, error: 'Not connected to WPP Open' }));
      return;
    }

    try {
      const health = await aiService.getHealthCheck();
      setState(prev => ({ ...prev, healthStatus: health, error: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Health check failed' 
      }));
    }
  }, [aiService]);

  const getUserInfo = useCallback(async () => {
    if (!aiService) {
      setState(prev => ({ ...prev, error: 'Not connected to WPP Open' }));
      return;
    }

    try {
      const userInfo = await aiService.getUserInfo();
      setState(prev => ({ ...prev, userInfo, error: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to get user info' 
      }));
    }
  }, [aiService]);

  // Auto-initialize connection when Open OS context is available
  useEffect(() => {
    if (!isChecking && userToken && !state.isConnected) {
      initializeConnection();
    }
  }, [isChecking, userToken, state.isConnected, initializeConnection]);

  return {
    state,
    sendMessage,
    checkHealth,
    getUserInfo,
    initializeConnection,
  };
};
