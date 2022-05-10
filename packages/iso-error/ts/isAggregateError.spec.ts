import { isAggregateError } from '.'

if (AggregateError) {
  it('returns true for AggregateError', () => {
    expect(isAggregateError(new AggregateError([]))).toBe(true)
  })
}

it('returns true for custom implementation of AggregateError as long as it has an array of errors',
  () => {
    class CustomAggregate extends Error {
      errors = []
    }

    expect(isAggregateError(new CustomAggregate())).toBe(true)
  }
)

it('returns false for non error', () => {
  expect(isAggregateError({ errors: [] } as any)).toBe(false)
})

it('returns false if the error does not have an errors field', () => {
  expect(isAggregateError(new Error())).toBe(false)
})
