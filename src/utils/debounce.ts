export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
