import { Hono } from 'hono';
import { HistoryManager } from '../utils/history';
import { HistoryResponse, ErrorResponse } from '../types/index';

const historyRouter = new Hono();

historyRouter.get('/history', (c) => {
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');

  if (limit < 1 || limit > 100) {
    return c.json(
      {
        error: 'Invalid limit',
        code: 'INVALID_PARAMETER',
        message: 'Limit must be between 1 and 100',
      } as ErrorResponse,
      400
    );
  }

  if (offset < 0) {
    return c.json(
      {
        error: 'Invalid offset',
        code: 'INVALID_PARAMETER',
        message: 'Offset must be non-negative',
      } as ErrorResponse,
      400
    );
  }

  const items = HistoryManager.getHistory(limit, offset);
  const total = HistoryManager.getHistoryCount();

  const response: HistoryResponse = {
    total,
    items,
  };

  return c.json(response, 200);
});

historyRouter.get('/history/stats', (c) => {
  const stats = HistoryManager.getStatistics();
  return c.json(stats, 200);
});

historyRouter.get('/history/operation/:operation', (c) => {
  const operation = c.req.param('operation');
  const items = HistoryManager.getHistoryByOperation(operation);

  const response: HistoryResponse = {
    total: items.length,
    items,
  };

  return c.json(response, 200);
});

historyRouter.delete('/history', (c) => {
  HistoryManager.clearHistory();
  return c.json({ message: 'History cleared' }, 200);
});

historyRouter.delete('/history/:id', (c) => {
  const id = c.req.param('id');
  const deleted = HistoryManager.deleteEntry(id);

  if (!deleted) {
    return c.json(
      {
        error: 'Not found',
        code: 'NOT_FOUND',
        message: `History entry with id ${id} not found`,
      } as ErrorResponse,
      404
    );
  }

  return c.json({ message: 'History entry deleted' }, 200);
});

export default historyRouter;
