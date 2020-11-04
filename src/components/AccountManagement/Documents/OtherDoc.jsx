import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Img from 'components/common/Img';
import checkImageExists from 'helpers/checkImageExists';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import './Documents.scss';
import DocPlaceholder from './DocPlaceholder';

const Documents = ({ userData, documents }) => {
  const { userDocs, onImageChange } = documents;

  const { data } = userData;

  const [open, setOpen] = useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');
  const [displayImages, setDisplayImages] = useState({
    UserExtraDoc1URL: false,
    UserExtraDoc2URL: false,
    UserExtraDoc3URL: false,
    UserExtraDoc4URL: false,
    UserExtraDoc5URL: false,
  });
  const [imgStatusCount, setImgStatusCount] = useState(0);

  useEffect(() => {
    if (data) {
      Array(5)
        .fill()
        .map((_, index) => {
          checkImageExists(data[`UserExtraDoc${index + 1}URL`]).then(
            data => {
              setDisplayImages(img => {
                return {
                  ...img,
                  [`UserExtraDoc${index + 1}URL`]: data,
                };
              });
            },
          );
        });
    }
  }, [data]);

  useEffect(() => {
    let count = 0;
    Object.values(displayImages).map(img => {
      if (img === true) {
        count += 1;
      }
    });
    setImgStatusCount(count);
  }, [
    displayImages.UserExtraDoc1URL,
    displayImages.UserExtraDoc2URL,
    displayImages.UserExtraDoc3URL,
    displayImages.UserExtraDoc4URL,
    displayImages.UserExtraDoc5URL,
  ]);

  return (
    <div className="documents-container">
      <ImagePreviewModal
        open={open}
        setOpen={setOpen}
        src={imagePreviewSrc}
      />
      <div className="doc-title">
        <span>
          {global.translate('Provide other supporting documents')}
        </span>
      </div>
      <span className="doc-sub-title">
        {global.translate(
          'This could be any official document bearing your name and your address such as utilities bill, bank statement, and landline telephone bill. In respect of close relatives or roommates living together, a certified statement of the person with the name on the document is required.',
          893,
        )}
      </span>
      <div className="other-docs">
        <div className="other-documents flex">
          {Array(5)
            .fill()
            .map((_, index) => {
              if (!displayImages[`UserExtraDoc${index + 1}URL`]) {
                return null;
              }
              return (
                <div className="other-doc">
                  <Img
                    hasError
                    compress
                    format="png"
                    height="130px"
                    width="160px"
                    src={
                      (userDocs[`UserExtraDoc${index + 1}URL`] &&
                        userDocs[`UserExtraDoc${index + 1}URL`]
                          .imageUrl) ||
                      (data && data[`UserExtraDoc${index + 1}URL`])
                    }
                    onImageChange={onImageChange}
                    name={`UserExtraDoc${index + 1}URL`}
                    className="other-doc__image cursor-pointer"
                    camStyle={{
                      width: 25,
                      height: 20,
                      right: '0%',
                      bottom: '-10%',
                    }}
                    onClick={() => {
                      setOpen(!open);
                      setImagePreviewSrc(
                        (userDocs[`UserExtraDoc${index + 1}URL`] &&
                          userDocs[`UserExtraDoc${index + 1}URL`]
                            .imageUrl) ||
                          (data &&
                            data[`UserExtraDoc${index + 1}URL`]),
                      );
                    }}
                  />
                </div>
              );
            })}
          {imgStatusCount < 5 && (
            <DocPlaceholder
              other
              name={`UserExtraDoc${imgStatusCount + 1}URL`}
              onChooseFile={onImageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Documents.propTypes = {
  userData: PropTypes.instanceOf(Object),
  documents: PropTypes.instanceOf(Object),
};

Documents.defaultProps = {
  userData: {},
  documents: {},
};

export default Documents;
