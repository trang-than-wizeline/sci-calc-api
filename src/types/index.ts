export interface CalculationRequest {
  operation: string;
  operands: number[];
  precision?: number;
  angleUnit?: 'degrees' | 'radians';
}

export interface CalculationResponse {
  operation: string;
  operands: number[];
  result: number;
  precision: number;
  angleUnit?: string;
  timestamp: string;
  executionTime: number;
}

export interface BatchCalculationRequest {
  calculations: CalculationRequest[];
}

export interface BatchCalculationResponse {
  results: CalculationResponse[];
  totalExecutionTime: number;
  successCount: number;
  failureCount: number;
}

export interface CalculationHistory {
  id: string;
  operation: string;
  operands: number[];
  result: number;
  timestamp: string;
  precision: number;
}

export interface HistoryResponse {
  total: number;
  items: CalculationHistory[];
}

export interface ErrorResponse {
  error: string;
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  timestamp: string;
}

export interface StatusResponse {
  version: string;
  status: 'operational' | 'maintenance';
  uptime: number;
  timestamp: string;
  features: {
    arithmetic: boolean;
    trigonometric: boolean;
    statistical: boolean;
    scientific: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface OperationMetadata {
  name: string;
  operandCount: number;
  description: string;
  category: 'arithmetic' | 'trigonometric' | 'statistical' | 'scientific' | 'hyperbolic';
}
