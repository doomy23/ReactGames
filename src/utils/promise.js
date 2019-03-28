export const PromiseWithTimeout = (ms, callback) => {
  return new Promise(function(resolve, reject) {
    // Set up the real work
    callback(resolve, reject);

    // Set up the timeout
    setTimeout(function() {
        reject(`Timeout after ${ms} ms`);
    }, ms);
  });
};
