// wraps value in closure or returns closure
export const closure = value => {
  if (typeof value === 'function') return value;

  return function closure() {
    return value;
  };
};
