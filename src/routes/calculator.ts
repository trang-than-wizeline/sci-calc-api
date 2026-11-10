import { Hono } from 'hono';
import { Calculator } from '../utils/calculator';
import { Validators } from '../utils/validators';
import { HistoryManager } from '../utils/history';
import { CalculationRequest, CalculationResponse, BatchCalculationRequest, ErrorResponse } from '../types/index';

const calculatorRouter = new Hono();

calculatorRouter.post('/calculate', async (c) => {
  const startTime = performance.now();

  try {
    const body = await c.req.json() as CalculationRequest;
    const errors = Validators.validateCalculationRequest(body);

    if (errors.length > 0) {
      return c.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          message: 'One or more validation errors occurred',
          details: { errors },
        } as ErrorResponse,
        400
      );
    }

    const result = Calculator.execute(
      body.operation,
      body.operands,
      body.angleUnit || 'radians'
    );

    const executionTime = performance.now() - startTime;
    const precision = body.precision || 10;
    const sanitizedResult = Validators.sanitizeNumber(result, precision);

    const historyEntry = HistoryManager.addEntry(
      body.operation,
      body.operands,
      sanitizedResult,
      precision
    );

    const response: CalculationResponse = {
      operation: body.operation,
      operands: body.operands,
      result: sanitizedResult,
      precision,
      angleUnit: body.angleUnit,
      timestamp: new Date().toISOString(),
      executionTime,
    };

    return c.json(response, 200);
  } catch (error) {
    const { message, code } = Validators.formatError(error);
    return c.json(
      {
        error: 'Calculation error',
        code,
        message,
      } as ErrorResponse,
      400
    );
  }
});

calculatorRouter.post('/batch', async (c) => {
  const startTime = performance.now();

  try {
    const body = await c.req.json() as BatchCalculationRequest;
    const batchErrors = Validators.validateBatchSize(body.calculations);

    if (batchErrors.length > 0) {
      return c.json(
        {
          error: 'Batch validation failed',
          code: 'BATCH_VALIDATION_ERROR',
          message: 'Batch validation errors occurred',
          details: { errors: batchErrors },
        } as ErrorResponse,
        400
      );
    }

    const results: CalculationResponse[] = [];
    let successCount = 0;
    let failureCount = 0;

    for (const calc of body.calculations) {
      try {
        const errors = Validators.validateCalculationRequest(calc);
        if (errors.length > 0) {
          failureCount++;
          continue;
        }

        const result = Calculator.execute(
          calc.operation,
          calc.operands,
          calc.angleUnit || 'radians'
        );

        const precision = calc.precision || 10;
        const sanitizedResult = Validators.sanitizeNumber(result, precision);

        HistoryManager.addEntry(
          calc.operation,
          calc.operands,
          sanitizedResult,
          precision
        );

        results.push({
          operation: calc.operation,
          operands: calc.operands,
          result: sanitizedResult,
          precision,
          angleUnit: calc.angleUnit,
          timestamp: new Date().toISOString(),
          executionTime: 0,
        });

        successCount++;
      } catch {
        failureCount++;
      }
    }

    const totalExecutionTime = performance.now() - startTime;

    return c.json(
      {
        results,
        totalExecutionTime,
        successCount,
        failureCount,
      },
      200
    );
  } catch (error) {
    const { message, code } = Validators.formatError(error);
    return c.json(
      {
        error: 'Batch calculation error',
        code,
        message,
      } as ErrorResponse,
      400
    );
  }
});

calculatorRouter.get('/operations', (c) => {
  const operations = Calculator.getOperationList();
  return c.json(operations, 200);
});

export default calculatorRouter;
