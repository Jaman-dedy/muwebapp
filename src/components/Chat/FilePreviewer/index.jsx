/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Image, Input, Button, Modal } from 'semantic-ui-react';
import './style.scss';
import PDFViewer from 'mgr-pdf-viewer-react';
import isFilePreviewable from 'utils/isFilePreviewable';
import getFileTypeIcon from 'utils/getFileTypeIcon';
import FilePickerList from './PickedList';

const FilePreview = ({
  visible,
  setVisible,
  files,
  setFiles,
  handleSendFileMessage,
  ...props
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prevFiles, setPrevFiles] = useState([]);
  const [fileToRemove, setFileToRemove] = useState(null);

  useEffect(() => {
    if (files) {
      const currentFile = { file: files[0], ...{ caption: '' } };
      setSelectedFile(currentFile);
      setPrevFiles([currentFile, ...prevFiles]);
    }
  }, [files]);

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFile(prevFiles[0]);
    }

    if (prevFiles.length === 0) {
      setVisible(false);
    }
  }, [prevFiles]);

  const onChange = (e, { name, value }) => {
    setSelectedFile({ ...selectedFile, caption: value });
    setPrevFiles(
      prevFiles.map(file =>
        file.file?.id === name ? { ...file, caption: value } : file,
      ),
    );
  };

  return (
    <Modal
      {...props}
      className="sidebar-preview"
      closeIcon
      onClose={() => {
        setVisible(false);
        setPrevFiles([]);
      }}
      open={visible}
    >
      <Modal.Header className="modal-title">
        {global.translate('Preview', 1462)}
      </Modal.Header>
      <Modal.Content className="preview-segment" padded={false}>
        <div className="body">
          {selectedFile?.file?.type?.startsWith(
            'application/pdf',
          ) && (
            <>
              <PDFViewer
                css="customViewer"
                hideNavbar
                navigation={{
                  css: {
                    previousPageBtn: 'customPrevBtn',
                    nextPageBtn: 'customNextBtn',
                    pages: 'customPages',
                    wrapper: 'customWrapper',
                  },
                }}
                document={{
                  url: selectedFile?.file?.preview,
                }}
              />
              <div className="input-section">
                <Input
                  placeholder={global.translate('Add Caption', 1995)}
                  value={selectedFile?.caption || ''}
                  name={selectedFile?.file?.id}
                  onChange={onChange}
                />
              </div>
            </>
          )}

          {selectedFile?.file?.type?.startsWith('image') && (
            <>
              <Image src={selectedFile?.file?.preview} height={250} />
              <div className="input-section">
                <Input
                  placeholder={global.translate('Add caption', 1995)}
                  value={selectedFile?.caption || ''}
                  name={selectedFile?.file?.id}
                  onChange={onChange}
                />
              </div>
            </>
          )}

          {!isFilePreviewable(selectedFile) && (
            <>
              <div
                style={{
                  display: 'flex',
                  height: 250,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={getFileTypeIcon(selectedFile?.file)}
                  size="huge"
                />
                <p>{selectedFile?.file?.name}</p>
              </div>

              <div className="input-section">
                <Input
                  placeholder={global.translate('Add caption', 1995)}
                  value={selectedFile?.caption || ''}
                  name={selectedFile?.file?.id}
                  onChange={onChange}
                />
              </div>
            </>
          )}
        </div>
        <Button
          content="Send"
          basic
          color="orange"
          onClick={() => {
            handleSendFileMessage(prevFiles.reverse());
            setVisible(false);
            setPrevFiles([]);
          }}
          className="sendBtn"
        />

        <FilePickerList
          prevFiles={prevFiles}
          setPrevFiles={setPrevFiles}
          setFiles={setFiles}
          setFileToRemove={setFileToRemove}
          fileToRemove={fileToRemove}
          setVisible={setVisible}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
      </Modal.Content>
    </Modal>
  );
};
FilePreview.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  files: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setFiles: PropTypes.func,
  handleSendFileMessage: PropTypes.func,
};

FilePreview.defaultProps = {
  visible: false,
  setVisible: () => null,
  files: null,
  setFiles: () => null,
  handleSendFileMessage: () => null,
};
export default FilePreview;
