/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import uploadFile from 'helpers/uploadImages/uploadFile';
import addPublicityAction, {
  restoreAddPublicity,
} from 'redux/actions/publicity/addPublicity';
import isFileImage from 'utils/isFileImage';

export default ({
  currentPublicity,
  setCurrentPublicity,
  setActiveTabIndex,
}) => {
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [campaingData, setCampaingData] = useState({
    Link: '',
    CampaignType: '',
    Title: '',
    SubTitle: '',
    Detail: '',
    ItemID: '',
    PictureURL: '',
  });

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { addPublicity } = useSelector(({ publicity }) => publicity);

  const ItemID = location.state && location.state.ItemID;
  const CampaignType = location.state && location.state.CampaignType;

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    clearError(name);
    setCampaingData({
      ...campaingData,
      [name]: value,
    });
  };

  const onImageChange = async ({
    target: { name = 'PictureURL', value },
  }) => {
    clearError(name);

    if (isFileImage(value)) {
      setImageLoading(true);
      const { status, data } = await uploadFile({ [name]: value });

      if (status) {
        setCampaingData({
          ...campaingData,
          PictureURL: data[0].url,
        });

        return setImageLoading(false);
      }
      return setImageLoading(false);
    }
    return toast.error(
      global.translate(
        'Please, choose a image for the profile picture',
      ),
    );
  };

  const validateURL = url => {
    const pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    if (pattern.test(url) || url === '') {
      return true;
    }
    return false;
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const TitleError = campaingData.Title
      ? ''
      : global.translate('The  campaign title cannot be empty.', 387);

    const SubTitleError = campaingData.SubTitle
      ? ''
      : global.translate(
          'Please provide the subtitle for your campaign',
        );
    const DetailError = campaingData.Detail
      ? ''
      : global.translate(
          'Please provide the detail for your campaign',
          1579,
        );

    const LinkError = validateURL(campaingData.Link)
      ? ''
      : `${global.translate(
          'Please provide a valid url',
          1580,
        )} (http://www.mysite.com/...)`;

    setErrors({
      ...errors,
      Title: TitleError,
      SubTitle: SubTitleError,
      Detail: DetailError,
      Link: LinkError,
    });
    return !(TitleError || SubTitleError || DetailError || LinkError);
  };

  const handleSubmit = () => {
    if (!validate()) {
      return false;
    }
    addPublicityAction(
      campaingData,
      !!campaingData.CampaignID,
    )(dispatch);

    return true;
  };

  useEffect(() => {
    if (currentPublicity && currentPublicity.ID) {
      setCampaingData({
        ...currentPublicity,
        CampaignID: currentPublicity.ID,
      });
    } else {
      setCampaingData({
        ...campaingData,
        ItemID,
        CampaignType: CampaignType && CampaignType.toString(),
      });
    }
  }, [currentPublicity]);

  useEffect(() => {
    if (addPublicity.success) {
      // push the publicity detail route
      if (addPublicity.isEditing) {
        // change the tab from setting to Details
        toast.success(
          global.translate('Your campaign is updated', 390),
        );
        setCurrentPublicity({
          ...currentPublicity,
          ...campaingData,
        });
        setActiveTabIndex(0);
      } else
        history.push({
          pathname: '/publicity-details',
          state: {
            publicityID: addPublicity.CampaignID,
            CampaignType,
            ItemID,
            publicity: addPublicity,
            campaingData,
          },
        });
      restoreAddPublicity()(dispatch);
    }
  }, [addPublicity]);

  return {
    onImageChange,
    handleSubmit,
    campaingData,
    imageLoading,
    errors,
    handleInputChange,
    addPublicity,
  };
};
