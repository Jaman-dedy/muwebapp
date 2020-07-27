import React from 'react';

import { Button, Modal, Embed } from 'semantic-ui-react';
import VideoTourImage from 'assets/images/tourVideo.png';

const VideoTour = ({ open, setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal size="small" open={open} onClose={handleCloseModal}>
        <Modal.Header style={{ textAlign: 'center' }}>
          2u money video tour
        </Modal.Header>
        <Modal.Content>
          <Embed
            aspectRatio="4:3"
            id="125292332"
            placeholder={VideoTourImage}
            source="vimeo"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            basic
            color="orange"
            content="Close"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default VideoTour;
