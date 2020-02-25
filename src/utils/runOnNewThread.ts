export const runOnNewThread = (fun, delay) => {
  setTimeout(() => {
    fun();
  }, delay || 250);
};
