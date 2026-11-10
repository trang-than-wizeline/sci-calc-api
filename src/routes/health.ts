import { Hono } from 'hono';
import { HealthResponse, StatusResponse } from '../types/index';

const healthRouter = new Hono();
const startTime = Date.now();

healthRouter.get('/health', (c) => {
  const uptime = (Date.now() - startTime) / 1000;
  const response: HealthResponse = {
    status: 'healthy',
    uptime,
    timestamp: new Date().toISOString(),
  };
  return c.json(response);
});

healthRouter.get('/status', (c) => {
  const uptime = (Date.now() - startTime) / 1000;
  const response: StatusResponse = {
    version: '1.0.0',
    status: 'operational',
    uptime,
    timestamp: new Date().toISOString(),
    features: {
      arithmetic: true,
      trigonometric: true,
      statistical: true,
      scientific: true,
    },
  };
  return c.json(response);
});

export default healthRouter;
