import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {
  it('should calculate total from comma-separated values', () => {
    expect(calculateTotal('10, 20, 30')).toBe(60)
    expect(calculateTotal('10.5, 20.25, 30')).toBe(60.75)
  })

  it('should calculate total from newline-separated values', () => {
    expect(calculateTotal('10\n20\n30')).toBe(60)
    expect(calculateTotal('10.5\n20.25\n30')).toBe(60.75)
  })

  it('should handle mixed comma and newline separators', () => {
    expect(calculateTotal('10,20\n30')).toBe(60)
    expect(calculateTotal('10\n20,30')).toBe(60)
  })

  it('should handle multiple consecutive separators', () => {
    expect(calculateTotal('10,,20')).toBe(30)
    expect(calculateTotal('10\n\n20')).toBe(30)
    expect(calculateTotal('10,,\n,20')).toBe(30)
  })

  it('should handle whitespace around values', () => {
    expect(calculateTotal(' 10 , 20 , 30 ')).toBe(60)
    expect(calculateTotal('  10  \n  20  \n  30  ')).toBe(60)
  })

  it('should return 0 for empty string', () => {
    expect(calculateTotal('')).toBe(0)
  })

  it('should return 0 for strings with only separators', () => {
    expect(calculateTotal(',')).toBe(0)
    expect(calculateTotal('\n')).toBe(0)
    expect(calculateTotal(',,,\n\n')).toBe(0)
  })

  it('should return 0 when any value is invalid', () => {
    expect(calculateTotal('10, invalid, 20')).toBe(0)
    expect(calculateTotal('10, , 20')).toBe(30) // empty string filtered out
    expect(calculateTotal('10, abc, 20')).toBe(0)
  })

  it('should handle single values', () => {
    expect(calculateTotal('42')).toBe(42)
    expect(calculateTotal('3.14')).toBe(3.14)
  })

  it('should handle negative numbers', () => {
    expect(calculateTotal('-10, 20, -5')).toBe(5)
    expect(calculateTotal('-10\n20\n-5')).toBe(5)
  })

  it('should handle zero values', () => {
    expect(calculateTotal('0, 10, 0')).toBe(10)
    expect(calculateTotal('0')).toBe(0)
  })

  it('should handle decimal values', () => {
    expect(calculateTotal('1.1, 2.2, 3.3')).toBeCloseTo(6.6)
    expect(calculateTotal('0.1, 0.2, 0.3')).toBeCloseTo(0.6)
  })
})

