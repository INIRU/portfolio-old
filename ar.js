function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

document.addEventListener('DOMContentLoaded', function () {
  const sceneEl = document.querySelector('a-scene');
  arSystem = sceneEl.systems['mindar-face-system'];
  const startButton = document.querySelector('.info-image-flexbox');
  const stopButton = document.querySelector('.ar-close');
  const switchCameraButton = document.querySelector('.ar-switch');
  startButton.addEventListener('click', async () => {
    document.querySelector('.ar-camera-container').style.visibility = 'visible';
    arSystem.start();
  });
  stopButton.addEventListener('click', () => {
    document.querySelector('.ar-camera-container').style.visibility = 'hidden';
    arSystem.stop();
  });
  switchCameraButton.addEventListener('click', () => {
    arSystem.switchCamera();
  });
});
