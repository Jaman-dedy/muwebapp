import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import PDFViewer from 'mgr-pdf-viewer-react/dist/mgr-pdf-viewer-react';
import { Icon, Image } from 'semantic-ui-react';
import isFilePreviewable from 'utils/isFilePreviewable';
import FilePicker from 'components/Chat/FilePicker';
import getFileTypeIcon from 'utils/getFileTypeIcon';
import './style.scss';

const FilePickerList = ({
  prevFiles,
  setPrevFiles,
  setFiles,
  setFileToRemove,
  fileToRemove,
  setVisible,
  setSelectedFile,
  onFileRemoved,
  selectedFile,
  accept,
  disableAdd,
}) => {
  const getURL = useCallback(file => {
    if (file.external) {
      return [file?.preview];
    }

    if (file.file) {
      return [file?.file?.preview];
    }
    return [''];
  }, []);

  return (
    <div className="footer">
      <div size="tiny" className="images-section">
        {Array.isArray(prevFiles) &&
          prevFiles.map(file => {
            return (
              <>
                {!isFilePreviewable(file) && (
                  <div
                    key={file.file.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className="small-h-margin small-v-margin  single-file-container full-width center-align"
                    onMouseEnter={() => setFileToRemove(file)}
                    onMouseLeave={() => setFileToRemove(null)}
                    onClick={() => {
                      setSelectedFile(file);
                    }}
                  >
                    <Icon
                      name="close"
                      title={global.translate('Remove file')}
                      className="center"
                      style={{
                        visibility:
                          fileToRemove === file
                            ? 'visible'
                            : 'hidden',
                      }}
                      size="large"
                      onClick={() => {
                        setPrevFiles(
                          prevFiles.filter(
                            item => item.file.id !== file.file?.id,
                          ),
                        );
                        onFileRemoved(file);
                        if (file.file.id === selectedFile.file?.id) {
                          if (!prevFiles.length) {
                            setVisible(false);
                            setPrevFiles([]);
                          }
                        }
                        setSelectedFile(prevFiles[0]);
                      }}
                    />
                    <Icon
                      title={global.translate('Add a file')}
                      name={getFileTypeIcon(file.file)}
                      size="huge"
                    />
                  </div>
                )}
                {file?.file?.type?.startsWith('application/pdf') && (
                  <div
                    className="small-h-margin small-v-margin single-file-container full-width center-align"
                    onMouseEnter={() => setFileToRemove(file)}
                    onMouseLeave={() => setFileToRemove(null)}
                    onClick={() => {
                      setSelectedFile(file);
                    }}
                  >
                    <Icon
                      name="close"
                      title={global.translate('Remove file')}
                      className="center"
                      style={{
                        visibility:
                          fileToRemove === file
                            ? 'visible'
                            : 'hidden',
                      }}
                      size="large"
                      onClick={() => {
                        setPrevFiles(
                          prevFiles.filter(
                            item => item.file.id !== file.file.id,
                          ),
                        );
                        onFileRemoved(file);
                        if (file.file.id === selectedFile?.file?.id) {
                          if (!prevFiles.length) {
                            setVisible(false);
                            setPrevFiles([]);
                          }
                        }
                        setSelectedFile(prevFiles[0]);
                      }}
                    />
                    <PDFViewer
                      css="customViewer"
                      hideNavbar
                      navigation={{
                        css: {
                          wrapper: 'customMinPdfWrapper',
                        },
                      }}
                      document={{
                        url: file?.file?.preview,
                      }}
                    />
                  </div>
                )}
                {file?.file?.type?.startsWith('image') && (
                  <div
                    className="small-h-margin small-v-margin single-file-container full-width center-align"
                    onMouseEnter={() => setFileToRemove(file)}
                    onMouseLeave={() => setFileToRemove(null)}
                  >
                    <Icon
                      name="close"
                      title={global.translate('Remove file')}
                      style={{
                        visibility:
                          fileToRemove === file
                            ? 'visible'
                            : 'hidden',
                      }}
                      size="large"
                      onClick={() => {
                        setPrevFiles(
                          prevFiles.filter(
                            item => item.file.id !== file.file.id,
                          ),
                        );
                        onFileRemoved(file);
                        if (file.file.id === selectedFile?.file?.id) {
                          if (!prevFiles.length) {
                            setVisible(false);
                            setPrevFiles([]);
                          }
                        }
                        setSelectedFile(prevFiles[0]);
                      }}
                    />
                    <img
                      width={95}
                      src={
                        file.preview?.length > 5
                          ? file.preview
                          : file?.file?.preview
                      }
                      onClick={() => {
                        setSelectedFile(file);
                      }}
                    />
                  </div>
                )}

                {file?.file?.type?.startsWith('video') && (
                  <div
                    className="small-h-margin small-v-margin single-file-container full-width center-align"
                    onMouseEnter={() => setFileToRemove(file)}
                    onMouseLeave={() => setFileToRemove(null)}
                  >
                    <Icon
                      name="close"
                      title={global.translate('Remove file')}
                      style={{
                        visibility:
                          fileToRemove === file
                            ? 'visible'
                            : 'hidden',
                      }}
                      size="large"
                      onClick={() => {
                        setPrevFiles(
                          prevFiles.filter(
                            item => item.file.id !== file.file.id,
                          ),
                        );
                        onFileRemoved(file);
                        if (file.file.id === selectedFile?.file?.id) {
                          if (!prevFiles.length) {
                            setVisible(false);
                            setPrevFiles([]);
                          }
                        }
                        setSelectedFile(prevFiles[0]);
                      }}
                    />
                    <ReactPlayer
                      style={{
                        objectFit: 'cover',
                        maxHeight: '364px',
                      }}
                      controls
                      className="video-player"
                      url={getURL(file)}
                      width={200}
                      height={95}
                    />
                  </div>
                )}
              </>
            );
          })}
      </div>
      {!disableAdd && (
        <FilePicker
          accept={accept}
          onFilesSelected={newFiles => {
            setFiles(newFiles);
          }}
        >
          <div className="cursor-pointer add-more-btn">
            <Icon size="big" name="add" />
          </div>
        </FilePicker>
      )}
    </div>
  );
};

FilePickerList.propTypes = {
  onFileRemoved: PropTypes.func,
  disableAdd: PropTypes.bool,
};

FilePickerList.defaultProps = {
  onFileRemoved: () => {},
  disableAdd: false,
};

export default FilePickerList;
