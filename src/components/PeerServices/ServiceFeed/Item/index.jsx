import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Dropdown, Label } from 'semantic-ui-react';
import './style.scss';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import InlineActionItem from 'components/PeerServices/ServiceFeed/ActionItem';
import {
  ONE_TO_ONE,
  LOGIN_RETURN_URL,
  REPORT_SERVICE_COMMENT,
  REPORT_SERVICE,
  PEER_SERVICE_IMAGE,
  PEER_SERVICE_VIDEO,
} from 'constants/general';
import { setGlobalChat } from 'redux/actions/chat/globalchat';
import openImageGallery from 'redux/actions/imageGallery/openImageGallery';
import { openChatList } from 'redux/actions/dashboard/dashboard';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import openDeleteServiceModal from 'redux/actions/peerServices/openDeleteServiceModal ';

import openReportServiceOrComment from 'redux/actions/peerServices/openReportServiceOrComment';
import myServices from 'containers/PeerServices/myServices';
import Thumbnail from 'components/common/Thumbnail';
import CommentItem from '../Comment';
import AddCommentForm from '../Comment/AddComment';
import PricingSection from '../PricingSection';
import ImageSlider from './MediaSlider';
import ExternalLinkArea from '../ExternalLinkArea';
import Ratings from '../Ratings';

const Index = React.forwardRef(({ service, allowView }, ref) => {
  const {
    handleAddComment,
    handleSetStoreStatus,
    handleDeleteServiceComment,
    bookMarkService,
  } = myServices();

  const dispatch = useDispatch();
  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const handleOpenChat = ({ OwnerPID: ContactPID, ...rest }) => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: { ...rest, ContactPID },
      isChattingWithSingleUser: true,
    })(dispatch);
    openChatList(dispatch);
  };

  const openReportModal = ({
    type = 'Service',
    itemId,
    Body,
    itemType,
    itemNumber,
  }) => {
    openReportServiceOrComment({
      open: true,
      service: {
        ...service,
        type,
        itemId,
        Body,
        itemType,
        itemNumber,
      },
      type,
    })(dispatch);
  };

  const onStartChatClick = Owner => {
    if (user?.PID === Owner.OwnerPID) {
      openEditPricingModal({ open: true, service })(dispatch);
    } else if (!user?.PID) {
      localStorage.toOpenChat = '1';
      localStorage.lastServiceOwner = service.Owner.OwnerPID;

      history.push({
        pathname: `/login`,
        search: `${LOGIN_RETURN_URL}=${location.pathname}`,
        state: {
          [LOGIN_RETURN_URL]: location.pathname,
          service,
          toOpenChat: true,
        },
      });
    } else {
      handleOpenChat(service.Owner);
    }
  };

  useEffect(() => {
    if (user) {
      if (localStorage.toOpenChat === '1') {
        if (localStorage.lastServiceOwner !== user.PID) {
          handleOpenChat(service.Owner);
        }
        localStorage.toOpenChat = '0';
        localStorage.removeItem('lastServiceOwner');
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (localStorage.toReport === '1' && localStorage.reportItem) {
        if (localStorage.lastItemOwner !== user.PID) {
          openReportModal(localStorage.reportItem);
        }
        localStorage.toReport = '0';
        localStorage.removeItem('lastItemOwner');
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (localStorage.toOpenCreateForm === '1') {
        openCreateModal({ open: true })(dispatch);
        localStorage.toOpenCreateForm = '0';
      }
    }
  }, [user]);

  const serviceMedia = [
    ...(service.Media?.filter(item =>
      ['jpeg', 'png']?.includes(item.Extension?.toLowerCase()),
    ) || []),
    ...(service.ExternalMedia?.filter(
      item =>
        item.MediaType === PEER_SERVICE_IMAGE ||
        item.MediaType === PEER_SERVICE_VIDEO,
    ).map(({ Link: MediaURL, ...rest }) => ({ MediaURL, ...rest })) ||
      []),
  ];

  const handleImageClicked = useCallback(url => {
    const index = serviceMedia
      .map((item, index) => {
        if (item.MediaURL === url) {
          return index;
        }
        return undefined;
      })
      .filter(item => Number.isInteger(item))?.[0];

    const photos = serviceMedia.map(item => item.MediaURL);

    openImageGallery({
      open: true,
      activePhotoIndex: index || 0,
      photos,
    })(dispatch);
  }, []);

  const [form, setForm] = useState({});

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddComment('comment', form.comment, service);
    }
  };

  const commentForm = { form, onChange, handleKeyDown };

  const allMedia = [
    ...service.Media,
    ...service.ExternalMedia.map(({ Link: MediaURL, ...rest }) => ({
      MediaURL,
      ...rest,
    })),
  ];

  return (
    <div
      ref={ref}
      key={service.ServiceID}
      className={`feed-item  ${service.updating ? 'deleting' : ''}`}
    >
      <div className="header">
        <div
          className="image-thumb  cursor-pointer"
          onClick={() => {
            history.push(
              `/marketplace/user/${service.Owner?.OwnerPID.toLowerCase()}`,
            );
          }}
        >
          <Thumbnail
            avatar={service?.Owner?.PictureURL}
            size="small"
            name={service.Owner?.FirstName}
            secondName={service.Owner?.LastName}
            circular
            compress
            id="comment-author-image"
            style={{
              height: '49px',
              width: '49px',
              objectFit: 'cover',
              marginRight: '0px',
            }}
          />
        </div>
        <div
          className="bio cursor-pointer"
          onClick={() => {
            history.push(
              `/marketplace/user/${service.Owner?.OwnerPID.toLowerCase()}`,
            );
          }}
        >
          <span className="fullName">
            {service.Owner?.FirstName} {service.Owner?.LastName}{' '}
          </span>{' '}
          <span className="username">
            @{service.Owner?.OwnerPID?.toLowerCase()}
          </span>
          <p className="date">
            {moment(service.CreationDate).format('ll')}
          </p>
        </div>

        {allowView && (
          <Button
            color="red"
            basic
            className="to-detail-btn"
            content={global.translate('View')}
            onClick={() => {
              history.push({
                pathname: `/marketplace/${service.ServiceID}`,
                state: { service, user },
              });
            }}
          />
        )}
        <Icon
          name={
            service.UserReview?.Bookmark === 'YES'
              ? 'bookmark'
              : 'bookmark outline'
          }
          size="large"
          className="cursor-pointer"
          onClick={() => {
            if (!user?.PID) {
              history.push({
                pathname: `/login`,
                search: `${LOGIN_RETURN_URL}=${location.pathname}`,
                state: {
                  [LOGIN_RETURN_URL]: location.pathname,
                  service,
                  toReport: true,
                },
              });
            } else {
              bookMarkService(service);
            }
          }}
        />
        <div className="report-flag">
          {user?.PID === service.Owner?.OwnerPID ? (
            <Dropdown
              icon={{ name: 'ellipsis vertical', size: 'large' }}
            >
              <Dropdown.Menu direction="left">
                <Dropdown.Item
                  text={global.translate('Update', 368)}
                />
                <Dropdown.Item
                  icon="pencil"
                  text={global.translate('Details', 94)}
                  onClick={() => {
                    openCreateModal({
                      open: true,
                      service,
                      editMedia: false,
                    })(dispatch);
                  }}
                />
                <Dropdown.Item
                  icon="file"
                  text={global.translate('Media')}
                  onClick={() => {
                    openCreateModal({
                      open: true,
                      service,
                      editMedia: true,
                    })(dispatch);
                  }}
                />
                <Dropdown.Item
                  icon="money"
                  text={global.translate('Pricing')}
                  onClick={() => {
                    openEditPricingModal({ open: true, service })(
                      dispatch,
                    );
                  }}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  text={global.translate('Other options', 1846)}
                />
                <Dropdown.Item
                  icon="nintendo switch"
                  onClick={() => {
                    handleSetStoreStatus(service);
                  }}
                  text={
                    service.Available === 'YES'
                      ? global.translate('Turn off temporarily', 1879)
                      : global.translate('Turn on', 1880)
                  }
                />
                <Dropdown.Item
                  icon="trash"
                  text={global.translate('Remove service')}
                  onClick={() => {
                    openDeleteServiceModal({
                      open: true,
                      service,
                    })(dispatch);
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Icon
              name="flag"
              size="large"
              className="cursor-pointer"
              onClick={() => {
                if (!user?.PID) {
                  history.push({
                    pathname: `/login`,
                    search: `${LOGIN_RETURN_URL}=${location.pathname}`,
                    state: {
                      [LOGIN_RETURN_URL]: location.pathname,
                      service,
                      toReport: true,
                    },
                  });
                } else {
                  openReportModal({
                    type: global.translate('Service'),
                    itemId: service.ServiceID,
                    Body: service.Description,
                    itemType: REPORT_SERVICE,
                    itemNumber: '0',
                  });
                }
              }}
            />
          )}
        </div>
      </div>

      <div className="post-body">
        <div className="category-location">
          <div className="category">
            <InlineActionItem icon="th" text={service.CategoryText} />
          </div>
          <div className="location">
            <InlineActionItem
              icon="map marker"
              text={service.Address}
            />
          </div>
          {pathname.startsWith('/marketplace/') && (
            <div className="service-rate">
              <Ratings
                service={service}
                onRate={rate => {
                  handleAddComment('Rating', rate, service);
                }}
              />
            </div>
          )}
        </div>
        <p className="title">{service.Title}</p>
        <p className="description">{service.Body}</p>
        {pathname.startsWith('/marketplace/') && (
          <div className="tags-area">
            {service.Tags.map(item => (
              <Label key={item} as="a">
                {item}
              </Label>
            ))}
          </div>
        )}
        {serviceMedia.length > 0 && (
          <div className="cover-picture">
            <ImageSlider
              allMedia={allMedia}
              handleImageClicked={handleImageClicked}
            />
          </div>
        )}
        {service.PriceList.length > 0 && (
          <PricingSection
            service={service}
            onStartChatClick={() => onStartChatClick(service.Owner)}
          />
        )}
        {location.pathname.startsWith('/marketplace/') && (
          <>
            <div className="post-actions">
              <div className="normal">
                <InlineActionItem
                  onClick={() => {
                    handleAddComment('Like', '', service);
                  }}
                  icon="thumbs up"
                  style={
                    service.UserReview?.Like === 'YES'
                      ? { color: 'black' }
                      : {}
                  }
                  disabled={!user?.PID}
                  text={`${global.translate('Like')}  (${
                    service.Likes
                  })`}
                />
                <InlineActionItem
                  disabled={!user?.PID}
                  onClick={() => {
                    handleAddComment('DisLike', '', service);
                  }}
                  icon="thumbs down"
                  service={service}
                  style={
                    service.UserReview?.DisLike === 'YES'
                      ? { color: 'black' }
                      : {}
                  }
                  text={`${global.translate('Dislike')}  (${
                    service.DisLikes
                  })`}
                />
                <InlineActionItem
                  disabled={!user?.PID}
                  icon="comment"
                  iconClass="comments-icon"
                  text={`${global.translate('Comments')}  (${service
                    .Comments?.length || 0})`}
                />
              </div>

              <div className="main-call">
                {service.Owner?.OwnerPID !== user?.PID && (
                  <Button
                    icon
                    basic
                    color="orange"
                    onClick={() => {
                      onStartChatClick(service.Owner);
                    }}
                  >
                    {global.translate('Chat')}
                  </Button>
                )}
              </div>
            </div>

            {service.LinkURL !== '' && (
              <ExternalLinkArea service={service} />
            )}

            <div className="post-discussion">
              {service.Comments?.map(comment => (
                <CommentItem
                  comment={comment}
                  user={user}
                  key={comment.CommentNumber}
                  onDeleteComment={() => {
                    handleDeleteServiceComment({
                      ServiceID: service.ServiceID,
                      CommentNumber: comment.CommentNumber,
                    });
                  }}
                  onReportClick={() => {
                    if (user) {
                      openReportModal({
                        type: 'Comment',
                        itemId: service.ServiceID,
                        Body: comment.Comment,
                        itemType: REPORT_SERVICE_COMMENT,
                        itemNumber: comment.CommentNumber,
                      });
                    } else {
                      localStorage.toReport = '1';
                      localStorage.lastItemOwner =
                        comment.CommentOwnerPID;
                      localStorage.reportItem = JSON.stringify({
                        type: 'Comment',
                        itemId: service.ServiceID,
                        Body: comment.Comment,
                        itemType: REPORT_SERVICE_COMMENT,
                        itemNumber: comment.CommentNumber,
                      });
                      history.push({
                        pathname: `/login`,
                        search: `${LOGIN_RETURN_URL}=${location.pathname}`,
                        state: {
                          [LOGIN_RETURN_URL]: location.pathname,
                          service,
                          toReport: true,
                        },
                      });
                    }
                  }}
                />
              ))}
            </div>
            <div className="add-new">
              <AddCommentForm commentForm={commentForm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

Index.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
  allowView: PropTypes.bool,
};

Index.defaultProps = {
  allowView: true,
};
export default Index;
