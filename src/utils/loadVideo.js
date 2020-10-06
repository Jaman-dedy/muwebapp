export default file =>
  new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        resolve(this);
      };

      video.onerror = () => {
        reject(
          new Error(
            global.translate(
              'Invalid video. Please select a video file.',
            ),
          ),
        );
      };

      video.src = window.URL.createObjectURL(file);
    } catch (e) {
      reject(e);
    }
  });
