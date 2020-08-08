import { useState, useEffect } from 'react';
import moment from 'moment';

const ReloadPageButton = () => {
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const toggleInstallBtn = (state = false) => {
    let hourInterval = moment().diff(
      moment(new Date(Number(localStorage.lastCancelInstallAppDate))),
      'hour',
    );

    hourInterval =
      Number.isInteger(hourInterval) &&
      localStorage.lastCancelInstallAppDate
        ? hourInterval
        : 1;

    if (state === false) {
      setShowInstallBtn(false);
    } else if (state === true && hourInterval >= 1) {
      setShowInstallBtn(true);
    }
  };

  const beforeInstall = e => {
    e.preventDefault();
    const { navigator } = window;

    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      navigator?.standalone === true
    ) {
      toggleInstallBtn(false);
    } else {
      toggleInstallBtn(true);
    }
    setDeferredPrompt(e);
  };

  const afterInstall = () => {
    toggleInstallBtn(false);
  };

  const installApp = beforeInstallPrompt => {
    if (beforeInstallPrompt) {
      beforeInstallPrompt.prompt();
      beforeInstallPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        toggleInstallBtn(false);
      });
    }
  };

  const cancelInstallApp = () => {
    setDeferredPrompt(null);
    toggleInstallBtn(false);
    localStorage.lastCancelInstallAppDate = Date.now();
  };

  useEffect(() => {
    toggleInstallBtn(true);
    window.addEventListener('beforeinstallprompt', beforeInstall);
    window.addEventListener('appinstalled', afterInstall);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstall,
      );
      window.removeEventListener('appinstalled', afterInstall);
    };
  }, []);

  return {
    showInstallBtn,
    deferredPrompt,
    installApp,
    cancelInstallApp,
  };
};

export default ReloadPageButton;
