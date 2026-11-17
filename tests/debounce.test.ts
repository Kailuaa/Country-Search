import { afterEach, describe, it, expect, vi } from 'vitest';
import { debounce } from '../src/debounce';

describe('debounce', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should call function after specified delay', () => {
    vi.useFakeTimers();

    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 400);

    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(400);
    expect(mockFn).toHaveBeenCalledOnce();
  });

  it('should reset timer when called again', () => {
    vi.useFakeTimers();

    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 400);

    debouncedFn();
    vi.advanceTimersByTime(200);

    debouncedFn();
    vi.advanceTimersByTime(200);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledOnce();
  });

  it('should use the latest arguments', () => {
    vi.useFakeTimers();

    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 400);

    debouncedFn('one');
    debouncedFn('two');
    debouncedFn('three');

    vi.advanceTimersByTime(400);
    expect(mockFn).toHaveBeenCalledExactlyOnceWith('three');
  });
});
