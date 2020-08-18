import React from 'react';
import { Popup, Header, Button } from 'semantic-ui-react';
import propTypes from 'prop-types';

const TourSteps = ({
  tourStep,
  setTourStep,
  trigger,
  content,
  open,
  setOpen,
  bodyContent,
}) => {
  return (
    <Popup
      popperDependencies={content}
      open={open}
      closeOnDocumentClick={false}
      position="top center"
      trigger={trigger}
    >
      <Header as="h2" content={content} />
      <p>{bodyContent}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            marginTop: '.7rem',
            marginRight: '1.3rem',
          }}
        >
          {`${tourStep}/7`}
        </span>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          basic
        >
          {global.translate(`Skip tour`)}
        </Button>
        <Button
          onClick={() => {
            setTourStep(tourStep + 1);
          }}
        >
          {global.translate(`Next`, 10)}
        </Button>
      </div>
    </Popup>
  );
};
TourSteps.propTypes = {
  tourStep: propTypes.number.isRequired,
  setTourStep: propTypes.func.isRequired,
  trigger: propTypes.instanceOf(Object).isRequired,
  content: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  bodyContent: propTypes.string.isRequired,
  setOpen: propTypes.func.isRequired,
};
export default TourSteps;
