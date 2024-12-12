const _compare = (a, b) => {
  const timeA = parseFloat(a.time);
  const timeB = parseFloat(b.time);
  return timeA - timeB; // Ascending order
};

export const sortScores = arr => arr.sort(_compare);
