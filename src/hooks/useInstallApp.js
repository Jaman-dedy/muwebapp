import { useState, useEffect } from 'react';

const ReloadPageButton = () => {
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const beforeInstall = e => {
    e.preventDefault();
    const { navigator } = window;
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      navigator?.standalone === true
    ) {
      setShowInstallBtn(false);
    } else {
      setShowInstallBtn(true);
    }
    setDeferredPrompt(e);
  };

  const afterInstall = () => {
    setShowInstallBtn(false);
  };

  const installApp = beforeInstallPrompt => {
    if (beforeInstallPrompt) {
      beforeInstallPrompt.prompt();
      beforeInstallPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      });
    }
  };

  const cancelInstallApp = () => {
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  useEffect(() => {
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
