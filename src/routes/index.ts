import { Hono } from 'hono';
import healthRouter from './health';
import calculatorRouter from './calculator';
import historyRouter from './history';

const router = new Hono();

// Mount routers
router.use(healthRouter);
router.use(calculatorRouter);
router.use(historyRouter);

// Root endpoint
router.get('/', (c) => {
  return c.json({
    name: 'Scientific Calculator API',
    version: '1.0.0',
    description: 'A comprehensive Scientific Calculator API with 50+ mathematical operations',
    endpoints: {
      health: {
        'GET /health': 'Check API health',
        'GET /status': 'Get API status and features',
      },
      calculator: {
        'POST /calculate': 'Perform a single calculation',
        'POST /batch': 'Perform multiple calculations in a batch',
        'GET /operations': 'List all available operations',
      },
      history: {
        'GET /history': 'Get calculation history (paginated)',
        'GET /history/stats': 'Get history statistics',
        'GET /history/operation/:operation': 'Get history for specific operation',
        'DELETE /history': 'Clear all history',
        'DELETE /history/:id': 'Delete specific history entry',
      },
    },
  });
});

export default router;
