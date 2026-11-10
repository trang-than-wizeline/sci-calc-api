import Decimal from 'decimal.js';

Decimal.set({ precision: 28, rounding: 1 });

export class Calculator {
  private static readonly PI = Math.PI;
  private static readonly E = Math.E;

  static add(a: number, b: number): number {
    return new Decimal(a).plus(b).toNumber();
  }

  static subtract(a: number, b: number): number {
    return new Decimal(a).minus(b).toNumber();
  }

  static multiply(a: number, b: number): number {
    return new Decimal(a).times(b).toNumber();
  }

  static divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return new Decimal(a).dividedBy(b).toNumber();
  }

  static modulo(a: number, b: number): number {
    if (b === 0) throw new Error('Modulo by zero');
    return new Decimal(a).modulo(b).toNumber();
  }

  static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  static squareRoot(n: number): number {
    if (n < 0) throw new Error('Cannot calculate square root of negative number');
    return Math.sqrt(n);
  }

  static cubeRoot(n: number): number {
    return Math.cbrt(n);
  }

  static nthRoot(n: number, root: number): number {
    if (root === 0) throw new Error('Root cannot be zero');
    if (n < 0 && root % 2 === 0) throw new Error('Cannot calculate even root of negative number');
    return Math.pow(n, 1 / root);
  }

  static ln(n: number): number {
    if (n <= 0) throw new Error('Logarithm undefined for non-positive numbers');
    return Math.log(n);
  }

  static log10(n: number): number {
    if (n <= 0) throw new Error('Logarithm undefined for non-positive numbers');
    return Math.log10(n);
  }

  static logBase(n: number, base: number): number {
    if (n <= 0 || base <= 0) throw new Error('Logarithm undefined for non-positive numbers');
    if (base === 1) throw new Error('Logarithm base cannot be 1');
    return Math.log(n) / Math.log(base);
  }

  static exponential(n: number): number {
    return Math.exp(n);
  }

  static sine(angle: number, angleUnit: 'degrees' | 'radians' = 'radians'): number {
    const radians = angleUnit === 'degrees' ? (angle * Math.PI) / 180 : angle;
    return Math.sin(radians);
  }

  static cosine(angle: number, angleUnit: 'degrees' | 'radians' = 'radians'): number {
    const radians = angleUnit === 'degrees' ? (angle * Math.PI) / 180 : angle;
    return Math.cos(radians);
  }

  static tangent(angle: number, angleUnit: 'degrees' | 'radians' = 'radians'): number {
    const radians = angleUnit === 'degrees' ? (angle * Math.PI) / 180 : angle;
    return Math.tan(radians);
  }

  static arcsine(n: number): number {
    if (n < -1 || n > 1) throw new Error('Arcsine domain: [-1, 1]');
    return Math.asin(n);
  }

  static arccosine(n: number): number {
    if (n < -1 || n > 1) throw new Error('Arccosine domain: [-1, 1]');
    return Math.acos(n);
  }

  static arctangent(n: number): number {
    return Math.atan(n);
  }

  static atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  static sinh(n: number): number {
    return Math.sinh(n);
  }

  static cosh(n: number): number {
    return Math.cosh(n);
  }

  static tanh(n: number): number {
    return Math.tanh(n);
  }

  static absoluteValue(n: number): number {
    return Math.abs(n);
  }

  static factorial(n: number): number {
    if (n < 0) throw new Error('Factorial undefined for negative numbers');
    if (!Number.isInteger(n)) throw new Error('Factorial requires integer input');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  static mean(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot calculate mean of empty array');
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
  }

  static median(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot calculate median of empty array');
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  static mode(numbers: number[]): number[] {
    if (numbers.length === 0) throw new Error('Cannot calculate mode of empty array');
    const frequency: Record<number, number> = {};
    numbers.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency)
      .filter(k => frequency[parseInt(k)] === maxFreq)
      .map(Number);
  }

  static standardDeviation(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot calculate std dev of empty array');
    const variance = this.variance(numbers);
    return Math.sqrt(variance);
  }

  static variance(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot calculate variance of empty array');
    const mean = this.mean(numbers);
    const squaredDiffs = numbers.map(n => Math.pow(n - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  }

  static sum(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
  }

  static product(numbers: number[]): number {
    return numbers.reduce((a, b) => a * b, 1);
  }

  static min(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot find min of empty array');
    return Math.min(...numbers);
  }

  static max(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Cannot find max of empty array');
    return Math.max(...numbers);
  }

  static permutations(n: number, r: number): number {
    if (n < 0 || r < 0 || r > n) throw new Error('Invalid permutation parameters');
    if (!Number.isInteger(n) || !Number.isInteger(r)) throw new Error('Permutation requires integers');
    return this.factorial(n) / this.factorial(n - r);
  }

  static combinations(n: number, r: number): number {
    if (n < 0 || r < 0 || r > n) throw new Error('Invalid combination parameters');
    if (!Number.isInteger(n) || !Number.isInteger(r)) throw new Error('Combination requires integers');
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }

  static gcd(a: number, b: number): number {
    if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('GCD requires integers');
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  static lcm(a: number, b: number): number {
    if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('LCM requires integers');
    return Math.abs(a * b) / this.gcd(a, b);
  }

  static isPrime(n: number): boolean {
    if (!Number.isInteger(n)) throw new Error('Prime check requires integer');
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }

  static fibonacci(n: number): number {
    if (!Number.isInteger(n) || n < 0) throw new Error('Fibonacci requires non-negative integer');
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }

  static getOperationList(): Record<string, { operands: number; category: string }> {
    return {
      add: { operands: 2, category: 'arithmetic' },
      subtract: { operands: 2, category: 'arithmetic' },
      multiply: { operands: 2, category: 'arithmetic' },
      divide: { operands: 2, category: 'arithmetic' },
      modulo: { operands: 2, category: 'arithmetic' },
      power: { operands: 2, category: 'arithmetic' },
      sqrt: { operands: 1, category: 'arithmetic' },
      cbrt: { operands: 1, category: 'arithmetic' },
      nthRoot: { operands: 2, category: 'arithmetic' },
      ln: { operands: 1, category: 'arithmetic' },
      log10: { operands: 1, category: 'arithmetic' },
      logBase: { operands: 2, category: 'arithmetic' },
      exp: { operands: 1, category: 'arithmetic' },
      sin: { operands: 1, category: 'trigonometric' },
      cos: { operands: 1, category: 'trigonometric' },
      tan: { operands: 1, category: 'trigonometric' },
      asin: { operands: 1, category: 'trigonometric' },
      acos: { operands: 1, category: 'trigonometric' },
      atan: { operands: 1, category: 'trigonometric' },
      atan2: { operands: 2, category: 'trigonometric' },
      sinh: { operands: 1, category: 'hyperbolic' },
      cosh: { operands: 1, category: 'hyperbolic' },
      tanh: { operands: 1, category: 'hyperbolic' },
      abs: { operands: 1, category: 'arithmetic' },
      factorial: { operands: 1, category: 'scientific' },
      mean: { operands: -1, category: 'statistical' },
      median: { operands: -1, category: 'statistical' },
      mode: { operands: -1, category: 'statistical' },
      stdDev: { operands: -1, category: 'statistical' },
      variance: { operands: -1, category: 'statistical' },
      sum: { operands: -1, category: 'statistical' },
      product: { operands: -1, category: 'statistical' },
      min: { operands: -1, category: 'statistical' },
      max: { operands: -1, category: 'statistical' },
      permutations: { operands: 2, category: 'scientific' },
      combinations: { operands: 2, category: 'scientific' },
      gcd: { operands: 2, category: 'scientific' },
      lcm: { operands: 2, category: 'scientific' },
      isPrime: { operands: 1, category: 'scientific' },
      fibonacci: { operands: 1, category: 'scientific' },
    };
  }

  static execute(operation: string, operands: number[], angleUnit: 'degrees' | 'radians' = 'radians'): number {
    switch (operation.toLowerCase()) {
      case 'add':
        return this.add(operands[0], operands[1]);
      case 'subtract':
        return this.subtract(operands[0], operands[1]);
      case 'multiply':
        return this.multiply(operands[0], operands[1]);
      case 'divide':
        return this.divide(operands[0], operands[1]);
      case 'modulo':
        return this.modulo(operands[0], operands[1]);
      case 'power':
        return this.power(operands[0], operands[1]);
      case 'sqrt':
        return this.squareRoot(operands[0]);
      case 'cbrt':
        return this.cubeRoot(operands[0]);
      case 'nthroot':
        return this.nthRoot(operands[0], operands[1]);
      case 'ln':
        return this.ln(operands[0]);
      case 'log10':
        return this.log10(operands[0]);
      case 'logbase':
        return this.logBase(operands[0], operands[1]);
      case 'exp':
        return this.exponential(operands[0]);
      case 'sin':
        return this.sine(operands[0], angleUnit);
      case 'cos':
        return this.cosine(operands[0], angleUnit);
      case 'tan':
        return this.tangent(operands[0], angleUnit);
      case 'asin':
        return this.arcsine(operands[0]);
      case 'acos':
        return this.arccosine(operands[0]);
      case 'atan':
        return this.arctangent(operands[0]);
      case 'atan2':
        return this.atan2(operands[0], operands[1]);
      case 'sinh':
        return this.sinh(operands[0]);
      case 'cosh':
        return this.cosh(operands[0]);
      case 'tanh':
        return this.tanh(operands[0]);
      case 'abs':
        return this.absoluteValue(operands[0]);
      case 'factorial':
        return this.factorial(operands[0]);
      case 'mean':
        return this.mean(operands);
      case 'median':
        return this.median(operands);
      case 'mode':
        return this.mode(operands)[0];
      case 'stddev':
        return this.standardDeviation(operands);
      case 'variance':
        return this.variance(operands);
      case 'sum':
        return this.sum(operands);
      case 'product':
        return this.product(operands);
      case 'min':
        return this.min(operands);
      case 'max':
        return this.max(operands);
      case 'permutations':
        return this.permutations(operands[0], operands[1]);
      case 'combinations':
        return this.combinations(operands[0], operands[1]);
      case 'gcd':
        return this.gcd(operands[0], operands[1]);
      case 'lcm':
        return this.lcm(operands[0], operands[1]);
      case 'isprime':
        return this.isPrime(operands[0]) ? 1 : 0;
      case 'fibonacci':
        return this.fibonacci(operands[0]);
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }
}
