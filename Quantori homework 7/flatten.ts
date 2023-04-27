function flatten<T>(arr: (T | T[])[]): T[] {
  const output: T[] = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      output.push(...flatten(item));
    } else {
      output.push(item);
    }
  });

  return output;
}
