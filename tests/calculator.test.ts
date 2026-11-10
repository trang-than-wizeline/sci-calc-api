import { describe, it, expect, beforeEach } from 'bun:test';
import { Calculator } from '../src/utils/calculator';
import { Validators } from '../src/utils/validators';
import { HistoryManager } from '../src/utils/history';

describe('Calculator', () => {
  describe('Basic Arithmetic', () => {
    it('should add two numbers', () => {
      expect(Calculator.add(2, 3)).toBe(5);
      expect(Calculator.add(-1, 1)).toBe(0);
      expect(Calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should subtract two numbers', () => {
      expect(Calculator.subtract(5, 3)).toBe(2);
      expect(Calculator.subtract(0, 5)).toBe(-5);
    });

    it('should multiply two numbers', () => {
      expect(Calculator.multiply(3, 4)).toBe(12);
      expect(Calculator.multiply(-2, 3)).toBe(-6);
      expect(Calculator.multiply(0, 100)).toBe(0);
    });

    it('should divide two numbers', () => {
      expect(Calculator.divide(10, 2)).toBe(5);
      expect(Calculator.divide(1, 2)).toBe(0.5);
    });

    it('should throw on division by zero', () => {
      expect(() => Calculator.divide(10, 0)).toThrow('Division by zero');
    });

    it('should calculate modulo', () => {
      expect(Calculator.modulo(10, 3)).toBe(1);
      expect(Calculator.modulo(7, 2)).toBe(1);
    });

    it('should throw on modulo by zero', () => {
      expect(() => Calculator.modulo(10, 0)).toThrow('Modulo by zero');
    });
  });

  describe('Powers and Roots', () => {
    it('should calculate power', () => {
      expect(Calculator.power(2, 3)).toBe(8);
      expect(Calculator.power(5, 0)).toBe(1);
      expect(Calculator.power(2, -1)).toBe(0.5);
    });

    it('should calculate square root', () => {
      expect(Calculator.squareRoot(4)).toBe(2);
      expect(Calculator.squareRoot(9)).toBe(3);
    });

    it('should throw on negative square root', () => {
      expect(() => Calculator.squareRoot(-1)).toThrow();
    });

    it('should calculate cube root', () => {
      expect(Calculator.cubeRoot(8)).toBe(2);
      expect(Calculator.cubeRoot(27)).toBe(3);
    });

    it('should calculate nth root', () => {
      expect(Calculator.nthRoot(16, 2)).toBe(4);
      expect(Calculator.nthRoot(8, 3)).toBe(2);
    });
  });

  describe('Logarithms', () => {
    it('should calculate natural logarithm', () => {
      expect(Calculator.ln(Math.E)).toBeCloseTo(1);
      expect(Calculator.ln(1)).toBe(0);
    });

    it('should calculate base 10 logarithm', () => {
      expect(Calculator.log10(100)).toBe(2);
      expect(Calculator.log10(1)).toBe(0);
    });

    it('should calculate logarithm with custom base', () => {
      expect(Calculator.logBase(8, 2)).toBe(3);
      expect(Calculator.logBase(100, 10)).toBe(2);
    });

    it('should throw on invalid logarithm inputs', () => {
      expect(() => Calculator.ln(0)).toThrow();
      expect(() => Calculator.ln(-1)).toThrow();
    });
  });

  describe('Trigonometric Functions', () => {
    it('should calculate sine', () => {
      expect(Calculator.sine(0)).toBe(0);
      expect(Calculator.sine(Math.PI / 2)).toBeCloseTo(1);
    });

    it('should calculate cosine', () => {
      expect(Calculator.cosine(0)).toBe(1);
      expect(Calculator.cosine(Math.PI)).toBeCloseTo(-1);
    });

    it('should calculate tangent', () => {
      expect(Calculator.tangent(0)).toBe(0);
    });

    it('should convert degrees to radians', () => {
      expect(Calculator.sine(90, 'degrees')).toBeCloseTo(1);
      expect(Calculator.cosine(180, 'degrees')).toBeCloseTo(-1);
    });

    it('should calculate inverse trigonometric functions', () => {
      expect(Calculator.arcsine(0)).toBe(0);
      expect(Calculator.arccosine(1)).toBe(0);
      expect(Calculator.arctangent(0)).toBe(0);
    });

    it('should throw on invalid arcsine/arccosine inputs', () => {
      expect(() => Calculator.arcsine(2)).toThrow();
      expect(() => Calculator.arccosine(-2)).toThrow();
    });
  });

  describe('Hyperbolic Functions', () => {
    it('should calculate hyperbolic sine', () => {
      expect(Calculator.sinh(0)).toBe(0);
    });

    it('should calculate hyperbolic cosine', () => {
      expect(Calculator.cosh(0)).toBe(1);
    });

    it('should calculate hyperbolic tangent', () => {
      expect(Calculator.tanh(0)).toBe(0);
    });
  });

  describe('Factorial', () => {
    it('should calculate factorial', () => {
      expect(Calculator.factorial(0)).toBe(1);
      expect(Calculator.factorial(1)).toBe(1);
      expect(Calculator.factorial(5)).toBe(120);
      expect(Calculator.factorial(10)).toBe(3628800);
    });

    it('should throw on negative factorial', () => {
      expect(() => Calculator.factorial(-1)).toThrow();
    });

    it('should throw on non-integer factorial', () => {
      expect(() => Calculator.factorial(2.5)).toThrow();
    });
  });

  describe('Statistical Functions', () => {
    it('should calculate mean', () => {
      expect(Calculator.mean([1, 2, 3, 4, 5])).toBe(3);
      expect(Calculator.mean([10])).toBe(10);
    });

    it('should calculate median', () => {
      expect(Calculator.median([1, 2, 3, 4, 5])).toBe(3);
      expect(Calculator.median([1, 2, 3, 4])).toBe(2.5);
    });

    it('should calculate mode', () => {
      const mode = Calculator.mode([1, 1, 1, 2, 3]);
      expect(mode).toContain(1);
    });

    it('should calculate variance', () => {
      const variance = Calculator.variance([1, 2, 3, 4, 5]);
      expect(variance).toBeCloseTo(2);
    });

    it('should calculate standard deviation', () => {
      const stdDev = Calculator.standardDeviation([1, 2, 3, 4, 5]);
      expect(stdDev).toBeCloseTo(Math.sqrt(2));
    });

    it('should calculate sum', () => {
      expect(Calculator.sum([1, 2, 3, 4, 5])).toBe(15);
    });

    it('should calculate product', () => {
      expect(Calculator.product([2, 3, 4])).toBe(24);
    });

    it('should find min and max', () => {
      expect(Calculator.min([3, 1, 4, 1, 5])).toBe(1);
      expect(Calculator.max([3, 1, 4, 1, 5])).toBe(5);
    });
  });

  describe('Combinatorics', () => {
    it('should calculate permutations', () => {
      expect(Calculator.permutations(5, 2)).toBe(20);
      expect(Calculator.permutations(5, 5)).toBe(120);
    });

    it('should calculate combinations', () => {
      expect(Calculator.combinations(5, 2)).toBe(10);
      expect(Calculator.combinations(5, 0)).toBe(1);
    });

    it('should calculate GCD', () => {
      expect(Calculator.gcd(12, 8)).toBe(4);
      expect(Calculator.gcd(17, 19)).toBe(1);
    });

    it('should calculate LCM', () => {
      expect(Calculator.lcm(12, 8)).toBe(24);
      expect(Calculator.lcm(4, 6)).toBe(12);
    });
  });

  describe('Prime and Fibonacci', () => {
    it('should check if number is prime', () => {
      expect(Calculator.isPrime(2)).toBe(true);
      expect(Calculator.isPrime(17)).toBe(true);
      expect(Calculator.isPrime(1)).toBe(false);
      expect(Calculator.isPrime(4)).toBe(false);
    });

    it('should calculate fibonacci', () => {
      expect(Calculator.fibonacci(0)).toBe(0);
      expect(Calculator.fibonacci(1)).toBe(1);
      expect(Calculator.fibonacci(5)).toBe(5);
      expect(Calculator.fibonacci(10)).toBe(55);
    });
  });

  describe('Execute Method', () => {
    it('should execute operations by name', () => {
      expect(Calculator.execute('add', [2, 3])).toBe(5);
      expect(Calculator.execute('multiply', [4, 5])).toBe(20);
      expect(Calculator.execute('sqrt', [16])).toBe(4);
    });

    it('should throw on unknown operation', () => {
      expect(() => Calculator.execute('unknownOp', [1, 2])).toThrow();
    });
  });
});

describe('Validators', () => {
  it('should validate calculation requests', () => {
    const validRequest = {
      operation: 'add',
      operands: [2, 3],
    };
    expect(Validators.validateCalculationRequest(validRequest)).toHaveLength(0);
  });

  it('should reject invalid operations', () => {
    const invalidRequest = {
      operation: 'invalidOp',
      operands: [2, 3],
    };
    const errors = Validators.validateCalculationRequest(invalidRequest);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should reject empty operands', () => {
    const invalidRequest = {
      operation: 'add',
      operands: [],
    };
    const errors = Validators.validateCalculationRequest(invalidRequest);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate batch size', () => {
    const validBatch = Array(50).fill({ operation: 'add', operands: [1, 2] });
    expect(Validators.validateBatchSize(validBatch)).toHaveLength(0);

    const invalidBatch = Array(101).fill({ operation: 'add', operands: [1, 2] });
    expect(Validators.validateBatchSize(invalidBatch).length).toBeGreaterThan(0);
  });
});

describe('HistoryManager', () => {
  beforeEach(() => {
    HistoryManager.clearHistory();
  });

  it('should add entries to history', () => {
    HistoryManager.addEntry('add', [2, 3], 5);
    expect(HistoryManager.getHistoryCount()).toBe(1);
  });

  it('should retrieve history with pagination', () => {
    for (let i = 0; i < 10; i++) {
      HistoryManager.addEntry('add', [i, i + 1], i + i + 1);
    }
    const history = HistoryManager.getHistory(5, 0);
    expect(history).toHaveLength(5);
  });

  it('should get statistics', () => {
    HistoryManager.addEntry('add', [2, 3], 5);
    HistoryManager.addEntry('multiply', [4, 5], 20);
    const stats = HistoryManager.getStatistics();
    expect(stats.totalCalculations).toBe(2);
    expect(stats.operationCounts['add']).toBe(1);
    expect(stats.operationCounts['multiply']).toBe(1);
  });

  it('should delete entries', () => {
    const entry = HistoryManager.addEntry('add', [2, 3], 5);
    expect(HistoryManager.getHistoryCount()).toBe(1);
    HistoryManager.deleteEntry(entry.id);
    expect(HistoryManager.getHistoryCount()).toBe(0);
  });

  it('should clear all history', () => {
    HistoryManager.addEntry('add', [2, 3], 5);
    HistoryManager.addEntry('multiply', [4, 5], 20);
    HistoryManager.clearHistory();
    expect(HistoryManager.getHistoryCount()).toBe(0);
  });
});
