import { CalculationHistory } from '../types/index';
import { v4 as uuidv4 } from 'crypto';

export class HistoryManager {
  private static history: CalculationHistory[] = [];
  private static readonly MAX_ENTRIES = 1000;

  static addEntry(
    operation: string,
    operands: number[],
    result: number,
    precision: number = 10
  ): CalculationHistory {
    const entry: CalculationHistory = {
      id: this.generateId(),
      operation,
      operands,
      result,
      timestamp: new Date().toISOString(),
      precision,
    };

    this.history.unshift(entry);

    if (this.history.length > this.MAX_ENTRIES) {
      this.history = this.history.slice(0, this.MAX_ENTRIES);
    }

    return entry;
  }

  static getHistory(limit: number = 50, offset: number = 0): CalculationHistory[] {
    return this.history.slice(offset, offset + limit);
  }

  static getHistoryCount(): number {
    return this.history.length;
  }

  static clearHistory(): void {
    this.history = [];
  }

  static getHistoryByOperation(operation: string): CalculationHistory[] {
    return this.history.filter(h => h.operation.toLowerCase() === operation.toLowerCase());
  }

  static getHistoryByDateRange(startDate: Date, endDate: Date): CalculationHistory[] {
    return this.history.filter(h => {
      const entryDate = new Date(h.timestamp);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }

  static deleteEntry(id: string): boolean {
    const index = this.history.findIndex(h => h.id === id);
    if (index > -1) {
      this.history.splice(index, 1);
      return true;
    }
    return false;
  }

  static getStatistics(): {
    totalCalculations: number;
    operationCounts: Record<string, number>;
    averageOperands: number;
  } {
    const operationCounts: Record<string, number> = {};
    let totalOperands = 0;

    this.history.forEach(entry => {
      operationCounts[entry.operation] = (operationCounts[entry.operation] || 0) + 1;
      totalOperands += entry.operands.length;
    });

    return {
      totalCalculations: this.history.length,
      operationCounts,
      averageOperands: this.history.length > 0 ? totalOperands / this.history.length : 0,
    };
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
