/**
 * Tests image load.
 * @param {String} url
 * @returns {Promise}
 */
export default function testImage(url) {
  // Define the promise
  const imgPromise = new Promise(function imgPromise(
    resolve,
    reject,
  ) {
    // Create the image
    const imgElement = new Image();

    // When image is loaded, resolve the promise
    imgElement.addEventListener('load', function imgOnLoad() {
      resolve(this);
    });

    // When there's an error during load, reject the promise
    imgElement.addEventListener('error', function imgOnError() {
      reject();
    });

    // Assign URL
    imgElement.src = url;
  });

  return imgPromise;
}
