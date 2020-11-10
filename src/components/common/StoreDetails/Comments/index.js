import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';
import { Button, Segment, Form, TextArea } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Message from 'components/common/Message';

/* import ToggleSwitch from 'components/common/ToggleButton'; */

import Thumbnail from 'components/common/Thumbnail';

import LoaderComponent from 'components/common/Loader';
import Pagination from 'components/common/Pagination';

const Comments = ({
  comments,
  postCommentFn,
  handleInputChange,
  form,
}) => {
  const [commentsToShow, setCommentsToShow] = useState([]);
  const [hasError, setHasError] = useState(false);
  const onPageChange = itemsToShow => {
    setCommentsToShow(itemsToShow);
  };

  const { userData } = useSelector(({ user }) => user);

  const postCommentHelper = () => {
    const today = new Date();
    const newComment = {
      Name: `${userData?.data?.FirstName} ${userData?.data?.LastName}`,
      PictureURL: userData?.data?.PictureURL,
      Comment: form.Comment,
      Date: `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`,
    };

    commentsToShow.splice(0, 0, newComment);
    commentsToShow.pop();

    postCommentFn();
  };

  return (
    <>
      <div className="Comments">
        <div className="commentThreads">
          {comments && comments.loading && (
            <Segment style={{ marginTop: '10px' }}>
              <LoaderComponent
                loaderContent={global.translate('Working...', 412)}
              />
            </Segment>
          )}

          {comments &&
            comments?.data &&
            comments?.data[0] &&
            comments?.data[0]?.CanComment === 'YES' && (
              <div>
                <div className="comments-title">
                  {global.translate('Comments')}
                </div>{' '}
                <div className="comments-container">
                  <div className="flex flex-column commentBox">
                    <Form>
                      <div className="commentBox__item">
                        <div className="comment-lebel">
                          {global.translate(
                            'What do you think about this store?',
                            1741,
                          )}
                        </div>
                        <TextArea
                          className="commentForm"
                          value={form.Comment}
                          name="Comment"
                          onChange={handleInputChange}
                        />

                        <Button
                          disabled={
                            !form.Comment ||
                            form.Comment?.trim() === ''
                          }
                          className="submitComment"
                          style={{ marginTop: '5px', float: 'right' }}
                          onClick={() => postCommentHelper()}
                        >
                          {global.translate('Comment', 488)}
                        </Button>
                      </div>
                    </Form>
                  </div>
                  {commentsToShow &&
                    commentsToShow.map(item => (
                      <span className="commentThread">
                        <span>
                          <Thumbnail
                            avatar={item.PictureURL || 'N/A'}
                            name={item.Name || 'Unknown'}
                            secondName={item.Name || 'User'}
                            style={{ height: '50px', width: '50px' }}
                            hasError={hasError}
                            setHasError={setHasError}
                          />
                        </span>
                        <span className="commentInfo flex flex-column">
                          <span className="flex flex-row">
                            <span className="commentUser">
                              {item.Name}
                            </span>
                            <span className="commentTime">
                              {item.Date}
                            </span>
                          </span>
                          <span>{item.Comment}</span>
                        </span>
                      </span>
                    ))}{' '}
                </div>
              </div>
            )}

          {comments &&
            comments.data &&
            comments.data[0] &&
            comments.data[0].Error === '2016' && (
              <Message
                error={false}
                message={global.translate('No comment', 871)}
                style={{
                  width: '95%',
                  margin: 'auto',
                  marginTop: '10px',
                }}
              />
            )}

          {comments &&
            comments.data &&
            comments.data[0] &&
            comments.data[0].Comments && (
              <Pagination
                data={comments.data[0].Comments}
                onPageChange={onPageChange}
                itemsPerPage={5}
                className="pagination"
              />
            )}
        </div>
      </div>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.objectOf(PropTypes.any),
  postCommentFn: PropTypes.func,
  handleInputChange: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
};

Comments.defaultProps = {
  comments: {},
  postCommentFn: () => {},
  handleInputChange: () => {},
  form: {},
};

export default Comments;
