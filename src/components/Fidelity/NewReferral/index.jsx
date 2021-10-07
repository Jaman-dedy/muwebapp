/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import victorImgLeft from 'assets/images/fidelity/GroupLeft.svg';
import victorImgRight from 'assets/images/fidelity/GroupRight.svg';
import envelopeImag from 'assets/images/fidelity/envelope.svg';
import line from 'assets/images/fidelity/line.svg';
import skipBtn from 'assets/images/fidelity/skipBtn.svg';
import './style.scss';
import '../../../assets/styles/spinner.scss';
import referral from 'redux/actions/referral';
import AlertDanger from 'components/common/Alert/Danger';
import locateUser from 'redux/actions/contacts/locateUser';

const Index = props => {
  const [copySuccess, setCopySuccess] = useState('');
  const [userPID, setUserPID] = useState('');
  const [userError, setUserError] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [userLoad, setUserLoad] = useState(true);

  const dispatch = useDispatch();

  const { addSponsoree } = useSelector(({ referral }) => referral);
  const {
    locateUser: { loading, error },
  } = useSelector(({ contacts }) => contacts);

  const { userData } = useSelector(({ user }) => user);

  const userName = userData && userData.data.PID;

  const referralURI = `${
    window.location.origin
  }/register?referrer=${userName?.toLowerCase()}`;

  const inputHandle = e => {
    e.preventDefault();
    setUserError('');
    setUserPID(e.target.value);
  };
  useEffect(() => {
    if (userName !== undefined) setUserLoad(false);
  }, [userName]);
  useEffect(() => {
    if (userPID.length >= 3) setDisableButton(false);
  }, [userPID]);
  useEffect(() => {
    if (error) {
      setUserError(error?.Description);
    }
  }, [error]);
  useEffect(() => {
    if (addSponsoree?.error) {
      setUserError(addSponsoree?.error?.[0]?.Description);
    }
  }, [addSponsoree?.error]);
  useEffect(() => {
    if (addSponsoree?.success === true) props.onClose();
  }, [props, addSponsoree?.success]);

  const addReferralHandle = () => {
    if (userPID) {
      locateUser({
        PID: userPID?.trim(),
      })(dispatch)(foundUserPID => {
        if (foundUserPID) {
          referral(userPID)(dispatch);
        }
      });
    }
  };
  const copyToClipBoard = async (e, CardNumber, message) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(CardNumber);
      setCopySuccess(message);
    } catch (err) {
      setCopySuccess(global.translate('Failed to copy!'), 2143);
    }
  };
  return (
    <div className="referral">
      {!userLoad && (
        <div className="referralContainer">
          <div className="referralHeader">
            <p className="no-margin">
              Hi
              <span>
                <strong> {userName}</strong>
              </span>
              , {global.translate('welcome')}. <br />
            </p>
            <p className="no-margin">
              {global.translate('Let’s get started')}
            </p>
          </div>
          <div className="banner referralBanner">
            <div>
              <Image src={victorImgLeft} />
            </div>

            <div className="referralEnvelope">
              <Image src={envelopeImag} />
            </div>
            <div>
              <Image src={victorImgRight} />
            </div>
          </div>

          <div className="referralTextCenter">
            <div>
              <p className="no-margin referralTitle">
                {global.translate('Who referred you to us?')}
              </p>
            </div>
            <form>
              <p className="referralLabel">
                {global.translate('Username of your referrer')}
              </p>
              <div className="rowDisplay">
                <div className="referralGrow">
                  <input
                    id="referrer"
                    type="text"
                    name="userPID"
                    onChange={inputHandle}
                    className="referralInput"
                    value={userPID}
                    placeholder="Type the username of your referrer"
                    required
                  />
                </div>
                <button
                  type="button"
                  alt="Submit Form"
                  className="addReferralBtn"
                  onClick={addReferralHandle}
                  disabled={disableButton}
                  style={{ opacity: userPID ? undefined : '0.7' }}
                >
                  {loading || addSponsoree?.loading ? (
                    <div className="loading-button loader" />
                  ) : (
                    global.translate('Add referrer')
                  )}
                </button>
              </div>
            </form>
            {userError && (
              <div className="referralAlert">
                <AlertDanger message={userError} />
              </div>
            )}
            <div className="referralLine">
              <Image src={line} />
            </div>

            <div className="rewardedLinkTitle">
              <p className="referralTitle referralMargin">
                {global.translate('Refer your friend & be rewarded')}
              </p>
            </div>
            <div className="referralFooter">
              <input
                type="textarea"
                className="rewaredTextLinkInput"
                value={referralURI}
                disabled
              />
              <div>
                <Popup
                  content={copySuccess}
                  on="click"
                  pinned
                  trigger={
                    <button
                      className="CopyLinkBtn"
                      onClick={e =>
                        copyToClipBoard(
                          e,
                          referralURI,
                          global.translate('Link copied!'),
                        )
                      }
                    >
                      {global.translate('Copy link')}
                    </button>
                  }
                />
              </div>
            </div>

            <div className="footerInput">
              <input type="image" src={skipBtn} alt="Copy Link " onClick={props?.onClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Index.propTypes = {
  onClose: PropTypes.objectOf(PropTypes.func).isRequired,
};
export default Index;
