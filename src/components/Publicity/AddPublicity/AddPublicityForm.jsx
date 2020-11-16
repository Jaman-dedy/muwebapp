/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Image,
  TextArea,
  Label,
} from 'semantic-ui-react';
import './AddPublicity.scss';
import { FileDrop } from 'react-file-drop';
import Loader from 'components/common/Loader';
import uploadImage from 'assets/images/upload-image.png';
import Img from 'components/common/Img';

const AddPublicityForm = ({ createCampaing }) => {
  const {
    onImageChange,
    campaingData,
    handleInputChange,
    errors,
    handleSubmit,
    addPublicity,
    imageLoading,
  } = createCampaing;
  const {
    CampaignID,
    Link,
    Title,
    SubTitle,
    Detail,
    ItemID,
    PictureURL,
  } = campaingData;

  const imageInputRef = useRef(null);

  const handleImageChange = ({ target }) => {
    const { name, files } = target;
    if (target.files[0]) {
      onImageChange({
        target: {
          name: name || 'PictureURL',
          value: files[0],
        },
      });
    }
  };

  return (
    <div className="add-publicity-modal" key={ItemID}>
      <div className="content">
        <Form className="content-form">
          {CampaignID && (
            <span>{global.translate('Title', 609)}</span>
          )}
          <Form.Input
            name="Title"
            onChange={handleInputChange}
            value={Title || ''}
            error={errors.Title || false}
            placeholder={`${global.translate('Title', 609)} *`}
          />
          {CampaignID && (
            <span>{global.translate('Subtitle', 1569)}</span>
          )}
          <Form.Input
            name="SubTitle"
            onChange={handleInputChange}
            value={SubTitle || ''}
            error={errors.SubTitle || false}
            placeholder={`${global.translate('Subtitle', 1569)} *`}
          />
          <div className="small-v-padding">
            <span>
              {global.translate(
                'Click or drop your cover image here',
                1570,
              )}
            </span>
          </div>
          <div className="publicity-image">
            <Img
              src={PictureURL}
              onImageChange={handleImageChange}
              name="PictureURL"
              className="publicity-cover cursor-pointer"
              camStyle={{
                width: 30,
                height: 20,
              }}
              not_rounded
              hasError
              alt={
                imageLoading ? (
                  <div className="image-loader flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  <div
                    className="publicity-cover-placeholder"
                    style={{ width: 100, height: 83 }}
                    onClick={() => imageInputRef.current.click()}
                  >
                    <FileDrop
                      onDrop={files =>
                        onImageChange({
                          target: {
                            name: 'PictureURL',
                            value: files,
                          },
                        })
                      }
                    >
                      <Image src={uploadImage} width={40} />
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        name="PictureURL"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </FileDrop>
                  </div>
                )
              }
            />
          </div>

          <div className="small-v-padding">
            <span>
              {global.translate(
                'More details about your campaign',
                1571,
              )}
            </span>
          </div>

          <TextArea
            rows={4}
            value={Detail}
            error={errors.Detail || ''}
            placeholder={`${global.translate('Detail', 1883)} *`}
            name="Detail"
            onChange={handleInputChange}
            style={{ minHeight: 60 }}
          />
          {errors.Detail && (
            <Form.Field style={{ marginTop: '-10px' }}>
              <Label pointing prompt>
                {global.translate(errors.Detail)}
              </Label>
            </Form.Field>
          )}
          {CampaignID && (
            <span>
              {global.translate('Link for more details', 1572)}
            </span>
          )}
          <Form.Input
            name="Link"
            onChange={handleInputChange}
            value={Link || ''}
            error={errors.Link || false}
            placeholder={global.translate(
              'Link for more details',
              1572,
            )}
          />

          <Button
            loading={addPublicity.loading}
            onClick={() => !addPublicity.loading && handleSubmit()}
            primary
            content={global.translate('Submit', 55)}
          />
        </Form>
      </div>
    </div>
  );
};

AddPublicityForm.propTypes = {
  handleInputChange: PropTypes.func,
  onImageChange: PropTypes.func,
  createCampaing: PropTypes.instanceOf(Object),
};

AddPublicityForm.defaultProps = {
  handleInputChange: () => null,
  onImageChange: () => null,
  createCampaing: {},
};

export default AddPublicityForm;
