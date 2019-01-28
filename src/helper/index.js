export function sleep(duration = 3000, payload) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(payload);
    }, duration);
  });
}
