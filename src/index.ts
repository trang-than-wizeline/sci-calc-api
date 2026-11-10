import { Hono } from 'hono';
import { cors } from 'hono/cors';
import router from './routes/index';

const app = new Hono();

// Middleware
app.use(cors());

app.use(async (c, next) => {
  c.header('X-API-Version', '1.0.0');
  c.header('X-Powered-By', 'Hono + Bun');
  await next();
});

// Routes
app.route('/api', router);

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({
    error: 'Internal Server Error',
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
  }, 500);
});

const port = parseInt(process.env.PORT || '3000');
const host = process.env.HOST || '0.0.0.0';

console.log(`🚀 Scientific Calculator API is running`);
console.log(`📍 Server: http://${host}:${port}`);
console.log(`📚 API Docs: http://${host}:${port}/api`);

export default {
  port,
  hostname: host,
  fetch: app.fetch,
};
