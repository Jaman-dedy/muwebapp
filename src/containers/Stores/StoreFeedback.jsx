import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import StoreFeedbackComponent from 'components/Stores/StoreFeedback';
import postCommentAction from 'redux/actions/stores/postComment';
import getStoreComments from 'redux/actions/stores/getComments';

const StoreFeedback = () => {
  const dispatch = useDispatch();

  const { comments, postComment } = useSelector(
    ({ stores }) => stores,
  );

  const { selectedStore } = useSelector(state => state.voucher);

  useEffect(() => {
    getStoreComments({ StoreID: selectedStore.StoreID })(dispatch);
  }, []);

  const [form, setForm] = useState({
    whatIsChanging: '',
    Anonymous: 'No',
  });

  const handleInputChange = async ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const postCommentFn = () => {
    const postData = {};
    postData.StoreID = selectedStore.StoreID;
    postData.Comment = form.Comment;
    postData.Anonymous = form.Anonymous;
    setForm({ ...Form, whatIsChanging: 'Comment' });
    postCommentAction(postData)(dispatch)
      .catch(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      })
      .then(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      });
  };

  const likeStore = () => {
    const postData = {};
    postData.StoreID = selectedStore.StoreID;
    postData.Tumb = 'Up';
    postData.Anonymous = 'No';
    setForm({ ...Form, whatIsChanging: 'Like' });
    postCommentAction(postData)(dispatch)
      .catch(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      })
      .then(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      });
  };

  const dislikeStore = () => {
    const postData = {};
    postData.StoreID = selectedStore.StoreID;
    postData.Tumb = 'Dn';
    postData.Anonymous = 'No';
    setForm({ ...Form, whatIsChanging: 'Dislike' });
    postCommentAction(postData)(dispatch)
      .catch(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      })
      .then(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      });
  };

  const rateStore = x => {
    const postData = {};
    postData.StoreID = selectedStore.StoreID;
    postData.Rating = x;
    postData.Anonymous = 'No';
    setForm({ ...Form, whatIsChanging: 'Rating' });
    postCommentAction(postData)(dispatch)
      .catch(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      })
      .then(() => {
        setForm({ ...form, Comment: '', Anonymous: 'No' });
      });
  };

  return (
    <StoreFeedbackComponent
      selectedStore={selectedStore}
      storeComments={comments}
      postCommentFn={postCommentFn}
      postComment={postComment}
      handleInputChange={handleInputChange}
      form={form}
      likeStore={likeStore}
      dislikeStore={dislikeStore}
      rateStore={rateStore}
    />
  );
};

export default StoreFeedback;
