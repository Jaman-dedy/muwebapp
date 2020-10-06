/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import deletePublicityAction, {
  clearDeletePublicity,
} from 'redux/actions/publicity/deletePublicity';
import PublicityDetailsComponent from 'components/Publicity/PublicityDetailsComponent';
import getPublicitiesAction from 'redux/actions/publicity/getPublicities';
import executeCampaingAction from 'redux/actions/publicity/executeCampaing';
import customAudience from './customAudience';
import createCampaing from './createCampaign';

const PublicityDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { userData } = useSelector(({ user }) => user);
  const {
    publicities,
    executePublicity,
    deleteCampaign,
  } = useSelector(({ publicity }) => publicity);

  const [errors, setErrors] = useState({});
  const [currentPublicity, setCurrentPublicity] = useState({});
  const [executePublicityData, setExecutePublicityData] = useState({
    Age: ['1', '2', '3'],
    Gender: ['1', '2'],
  });
  const [open, setOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const publicityId = location.state && location.state.publicityID;
  const ItemID = location.state && location.state.ItemID;
  const CampaignType = location.state && location.state.CampaignType;
  const publicity = location.state && location.state.publicity;
  const detailTab = location.state && location.state.detailTab;
  const item = location.state && location.state.item;
  const campaingData = location.state && location.state.campaingData;

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = ({
    target: { name, value, checked },
  }) => {
    clearError(name);
    if (name === 'Age' || name === 'Gender') {
      let newValue = [];
      if (name === 'Gender') {
        if (value === '0') {
          if (checked) {
            newValue = executePublicityData[name].filter(
              el => el !== value,
            );
          } else {
            newValue = [value];
          }
        } else if (checked) {
          newValue = executePublicityData[name].filter(
            el => el !== value,
          );
        } else {
          newValue = executePublicityData[name].filter(
            el => el !== '0',
          );
          newValue = [...newValue, value];
        }
      } else if (checked) {
        newValue = executePublicityData[name].filter(
          el => el !== value,
        );
      } else {
        newValue = [...executePublicityData[name], value];
      }

      return setExecutePublicityData({
        ...executePublicityData,
        [name]: newValue,
      });
    }
    return setExecutePublicityData({
      ...executePublicityData,
      [name]: value,
    });
  };

  const executeCampaing = ({ item, PIN }) => {
    executeCampaingAction({
      ...executePublicityData,
      SourceWallet: userData.data && userData.data?.DefaultWallet,
      PIN,
      CampaignID: item.ID,
    })(dispatch);
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const SourceWalletError = executePublicityData.SourceWallet
      ? ''
      : global.translate(
          'Please select a wallet for the campaign',
          2079,
        );

    const BudgetError = executePublicityData.Budget
      ? ''
      : global.translate(
          'Please provide the budget for the campaign',
          2080,
        );
    const AudienceError = executePublicityData.Audience
      ? ''
      : global.translate(
          'Please provide the expected audience for your campaign',
          2081,
        );
    const AgeError = executePublicityData.Age.length
      ? ''
      : global.translate(
          'Please select at least one Age range',
          2082,
        );
    const GenderError = executePublicityData.Gender
      ? ''
      : global.translate('Please select at least one Gender', 2083);

    setErrors({
      ...errors,
      SourceWallet: SourceWalletError,
      Budget: BudgetError,
      Audience: AudienceError,
      Age: AgeError,
      Gender: GenderError,
    });
    return !(
      SourceWalletError ||
      BudgetError ||
      AudienceError ||
      AgeError ||
      GenderError
    );
  };

  const handleSubmit = () => {
    if (!validate()) {
      return false;
    }

    if (errors.Sample) {
      return false;
    }
    setOpen(true);
    return true;
  };

  useEffect(() => {
    if (publicities.data.length && !publicities.loading) {
      const currentPub = publicities.data.find(
        item => item.ID === publicityId,
      );
      if (!currentPub) {
        getPublicitiesAction({ ItemID })(dispatch);
      }

      if (currentPub && detailTab) {
        setActiveTabIndex(detailTab);
      }

      setCurrentPublicity(
        currentPub || {
          ID: (publicity && publicity.CampaignID) || '',
          Title: (publicity && publicity.Title) || '',
          SubTitle: (publicity && publicity.SubTitle) || '',
        },
      );
    }
  }, [publicities]);

  useEffect(() => {
    if (publicities.data.length === 0 && ItemID) {
      getPublicitiesAction({ ItemID, CampaignType })(dispatch);
    }
  }, []);

  useEffect(() => {
    if (deleteCampaign.data) {
      toast.success(global.translate('Campaign deleted', 987));

      history.replace({
        pathname: '/publicity',
        state: {
          CampaignType,
          ItemID,
          item: {
            ItemID,
            Name: item.Name,
          },
        },
      });

      clearDeletePublicity()(dispatch);
    }
  }, [deleteCampaign]);

  const deletePublicity = CampaignID => {
    deletePublicityAction({ CampaignID })(dispatch);
  };

  return (
    <PublicityDetailsComponent
      userData={userData}
      publicities={publicities}
      executePublicity={executePublicity}
      currentPublicity={currentPublicity}
      executeCampaing={executeCampaing}
      executePublicityData={executePublicityData}
      handleInputChange={handleInputChange}
      errors={errors}
      open={open}
      setOpen={setOpen}
      customAudience={customAudience({
        errors,
        setErrors,
        currentPublicity,
        clearError,
        executePublicityData,
        handleInputChange,
      })}
      createCampaing={createCampaing({
        currentPublicity,
        setCurrentPublicity,
        activeTabIndex,
        setActiveTabIndex,
      })}
      handleSubmit={handleSubmit}
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      deletePublicity={deletePublicity}
      deleteCampaignData={deleteCampaign}
      item={item}
    />
  );
};

export default PublicityDetail;
