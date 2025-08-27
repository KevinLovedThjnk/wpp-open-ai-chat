export interface WPPAIEvent {
  model: string;
  prompt: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface WPPAIResponse {
  id: string;
  response: string;
  model: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface WPPOpenConfig {
  baseUrl: string;
  accessToken: string;
}

class WPPOpenAIService {
  private config: WPPOpenConfig;

  constructor(config: WPPOpenConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.accessToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`WPP Open API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async sendAIEvent(event: WPPAIEvent): Promise<WPPAIResponse> {
    try {
      const response = await this.makeRequest('/api/ai-assistant/events', {
        method: 'POST',
        body: JSON.stringify(event),
      });

      return response;
    } catch (error) {
      console.error('Error sending AI event:', error);
      throw error;
    }
  }

  async getHealthCheck(): Promise<any> {
    try {
      return await this.makeRequest('/api/healthcheck');
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  async getUserInfo(): Promise<any> {
    try {
      return await this.makeRequest('/api/users/me');
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  }
}

export default WPPOpenAIService;
