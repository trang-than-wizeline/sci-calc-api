import { CalculationRequest, ValidationError } from '../types/index';
import { Calculator } from './calculator';

export class Validators {
  static validateCalculationRequest(req: CalculationRequest): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!req.operation || typeof req.operation !== 'string') {
      errors.push({
        field: 'operation',
        message: 'Operation must be a non-empty string',
      });
    }

    if (!Array.isArray(req.operands)) {
      errors.push({
        field: 'operands',
        message: 'Operands must be an array',
      });
    } else if (req.operands.length === 0) {
      errors.push({
        field: 'operands',
        message: 'Operands array cannot be empty',
      });
    } else {
      const invalidOperands = req.operands.filter(op => typeof op !== 'number' || !isFinite(op));
      if (invalidOperands.length > 0) {
        errors.push({
          field: 'operands',
          message: 'All operands must be finite numbers',
        });
      }
    }

    if (req.precision !== undefined) {
      if (typeof req.precision !== 'number' || req.precision < 0 || req.precision > 28) {
        errors.push({
          field: 'precision',
          message: 'Precision must be a number between 0 and 28',
        });
      }
    }

    if (req.angleUnit !== undefined) {
      if (req.angleUnit !== 'degrees' && req.angleUnit !== 'radians') {
        errors.push({
          field: 'angleUnit',
          message: 'Angle unit must be either "degrees" or "radians"',
        });
      }
    }

    const operationList = Calculator.getOperationList();
    if (!operationList[req.operation.toLowerCase()]) {
      errors.push({
        field: 'operation',
        message: `Unknown operation: ${req.operation}. See /api/operations for available operations`,
      });
    } else {
      const expectedOperands = operationList[req.operation.toLowerCase()].operands;
      if (expectedOperands !== -1 && req.operands.length !== expectedOperands) {
        errors.push({
          field: 'operands',
          message: `Operation ${req.operation} expects ${expectedOperands} operands, got ${req.operands.length}`,
        });
      }
    }

    return errors;
  }

  static validateBatchSize(calculations: unknown[]): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!Array.isArray(calculations)) {
      errors.push({
        field: 'calculations',
        message: 'Calculations must be an array',
      });
    } else if (calculations.length === 0) {
      errors.push({
        field: 'calculations',
        message: 'Calculations array cannot be empty',
      });
    } else if (calculations.length > 100) {
      errors.push({
        field: 'calculations',
        message: 'Maximum 100 calculations per batch',
      });
    }

    return errors;
  }

  static isValidNumber(value: unknown): boolean {
    return typeof value === 'number' && isFinite(value);
  }

  static isValidOperation(operation: string): boolean {
    const operationList = Calculator.getOperationList();
    return !!operationList[operation.toLowerCase()];
  }

  static sanitizeNumber(value: number, precision: number = 10): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

  static formatError(error: unknown): { message: string; code: string } {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'CALCULATION_ERROR',
      };
    }
    return {
      message: String(error),
      code: 'UNKNOWN_ERROR',
    };
  }
}
