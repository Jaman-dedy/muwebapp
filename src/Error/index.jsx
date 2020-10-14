import React from 'react';
import { Image } from 'semantic-ui-react';
import errorImg from 'assets/images/404-or-500.svg';

function ErrorFallback({ error, resetErrorBoundary }) {
  const onAddClick = () => {
    window.location.reload();
    resetErrorBoundary();
  };
  console.log('error', error);
  console.log('error', error.message);
  return (
    <div style={{ marginTop: '150px' }} className="empty-store">
      <Image src={errorImg} />
      <h2>{global.translate(`Looks like something went wrong`)} </h2>
      <div>
        {global.translate(
          `Our team is currently working on this issue`,
        )}
      </div>

      <button to="/" type="button" onClick={onAddClick}>
        {global.translate(`Refresh`, 134)}
      </button>
    </div>
  );
}

export default ErrorFallback;
