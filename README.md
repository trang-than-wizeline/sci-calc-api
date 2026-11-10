# Scientific Calculator API

A comprehensive Scientific Calculator API with 50+ mathematical operations, built with Hono and Bun.

## Features

- **35+ Mathematical Operations**
  - Arithmetic: add, subtract, multiply, divide, modulo, power, sqrt, cbrt, etc.
  - Trigonometric: sin, cos, tan, asin, acos, atan, atan2
  - Hyperbolic: sinh, cosh, tanh
  - Logarithmic: ln, log10, logBase
  - Statistical: mean, median, mode, variance, stdDev, sum, product, min, max
  - Scientific: factorial, permutations, combinations, GCD, LCM, isPrime, fibonacci

- **Batch Processing**: Process multiple calculations in a single request
- **Calculation History**: Track all calculations with timestamps and metadata
- **High Precision**: Support for up to 28 decimal places using Decimal.js
- **Angle Unit Support**: Convert between degrees and radians for trigonometric functions
- **RESTful API**: Clean and intuitive REST endpoints
- **OpenAPI Documentation**: Complete API specification included

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/trang-than-wizeline/sci-calc-api.git
cd sci-calc-api

# Install dependencies with Bun
bun install
```

### Running the Server

```bash
# Development mode with auto-reload
bun run dev

# Production mode
bun run start

# Build for production
bun run build
```

The server will start on `http://localhost:3000` by default.

### Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Available environment variables:
- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: 0.0.0.0)
- `NODE_ENV`: Environment (development/production)
- `LOG_LEVEL`: Logging level (info/debug/error)

## API Usage

### Basic Calculation

```bash
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "add",
    "operands": [2, 3],
    "precision": 10
  }'
```

Response:
```json
{
  "operation": "add",
  "operands": [2, 3],
  "result": 5,
  "precision": 10,
  "timestamp": "2026-11-10T08:30:00.000Z",
  "executionTime": 0.5
}
```

### Batch Calculations

```bash
curl -X POST http://localhost:3000/api/batch \
  -H "Content-Type: application/json" \
  -d '{
    "calculations": [
      {"operation": "add", "operands": [2, 3]},
      {"operation": "multiply", "operands": [4, 5]},
      {"operation": "sqrt", "operands": [16]}
    ]
  }'
```

### Get Available Operations

```bash
curl http://localhost:3000/api/operations
```

### View Calculation History

```bash
# Get last 50 calculations
curl http://localhost:3000/api/history?limit=50&offset=0

# Get statistics
curl http://localhost:3000/api/history/stats

# Get history for specific operation
curl http://localhost:3000/api/history/operation/add
```

### Health Check

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/status
```

## Supported Operations

### Arithmetic Operations
- `add` - Addition
- `subtract` - Subtraction
- `multiply` - Multiplication
- `divide` - Division
- `modulo` - Modulo operation
- `power` - Power/Exponentiation
- `sqrt` - Square root
- `cbrt` - Cube root
- `nthRoot` - Nth root
- `abs` - Absolute value

### Logarithmic Operations
- `ln` - Natural logarithm
- `log10` - Base 10 logarithm
- `logBase` - Logarithm with custom base
- `exp` - Exponential function

### Trigonometric Operations
- `sin` - Sine
- `cos` - Cosine
- `tan` - Tangent
- `asin` - Arc sine
- `acos` - Arc cosine
- `atan` - Arc tangent
- `atan2` - Two-argument arc tangent

### Hyperbolic Operations
- `sinh` - Hyperbolic sine
- `cosh` - Hyperbolic cosine
- `tanh` - Hyperbolic tangent

### Statistical Operations
- `mean` - Arithmetic mean
- `median` - Median value
- `mode` - Most frequent value
- `variance` - Variance
- `stdDev` - Standard deviation
- `sum` - Sum of values
- `product` - Product of values
- `min` - Minimum value
- `max` - Maximum value

### Scientific Operations
- `factorial` - Factorial
- `permutations` - Permutations (nPr)
- `combinations` - Combinations (nCr)
- `gcd` - Greatest common divisor
- `lcm` - Least common multiple
- `isPrime` - Prime number check
- `fibonacci` - Fibonacci number

## Testing

```bash
# Run tests
bun test

# Run tests in watch mode
bun run test:watch

# Generate coverage report
bun run test:coverage
```

## API Endpoints

### Health
- `GET /` - API information
- `GET /health` - Health status
- `GET /status` - API status with features

### Calculator
- `POST /calculate` - Single calculation
- `POST /batch` - Batch calculations
- `GET /operations` - List available operations

### History
- `GET /history` - Get calculation history (paginated)
- `GET /history/stats` - Get history statistics
- `GET /history/operation/:operation` - Get history for specific operation
- `DELETE /history` - Clear all history
- `DELETE /history/:id` - Delete specific history entry

## Error Handling

The API returns standard error responses:

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "message": "One or more validation errors occurred",
  "details": {
    "errors": [
      {
        "field": "operation",
        "message": "Unknown operation: invalidOp"
      }
    ]
  }
}
```

## Performance

- High-precision arithmetic using Decimal.js
- Efficient batch processing
- In-memory history storage (configurable limit)
- Sub-millisecond execution times for most operations

## Documentation

- **OpenAPI Specification**: See `openapi.yaml` for complete API documentation
- **Type Definitions**: TypeScript types in `src/types/index.ts`

## Project Structure

```
.
├── src/
│   ├── index.ts              # Main application entry point
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── utils/
│   │   ├── calculator.ts     # Calculator logic
│   │   ├── validators.ts     # Input validation
│   │   └── history.ts        # History management
│   └── routes/
│       ├── index.ts          # Route aggregation
│       ├── health.ts         # Health endpoints
│       ├── calculator.ts     # Calculator endpoints
│       └── history.ts        # History endpoints
├── tests/
│   └── calculator.test.ts    # Comprehensive test suite
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── bunfig.toml               # Bun configuration
├── openapi.yaml              # OpenAPI specification
└── README.md                 # This file
```

## Dependencies

- **hono**: Lightweight web framework
- **decimal.js**: High-precision decimal arithmetic
- **@types/bun**: Bun type definitions
- **typescript**: TypeScript compiler

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
