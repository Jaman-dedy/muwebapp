import DeviceDetector from 'device-detector-js';

export default () => {
  const deviceDetector = new DeviceDetector();
  const { userAgent } = navigator;
  const { os, client, device } = deviceDetector.parse(userAgent);
  const getDeviceType = () => {
    if (device.type === 'tablet') {
      return 2;
    }
    if (os.name === 'GNU/Linux') {
      return 6;
    }
    if (device.type === 'smartphone') {
      return 1;
    }
    if (os.name === 'Windows') {
      return 5;
    }
    if (os.name === 'Mac') {
      return 4;
    }
    return 0;
  };

  return {
    deviceType: getDeviceType(),
    deviceOs: os.name,
    clientName: client.name,
    clientVersion: client.version,
    osVersion: os.version,
  };
};
