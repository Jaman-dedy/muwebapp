import { toast } from 'react-toastify';
import saveTemporarily from 'helpers/uploadImages/saveTemporarily';
import { chatSocketIOClient } from 'services/socketIO';
import { NEW_OUTGOING_CHAT_DIRECT_MESSAGE } from 'constants/events/chat/directMessages';
import saveToBackend from 'helpers/uploadImages/saveToBackend';
import { SENDING } from 'constants/general';

export default async ({
  body = '',
  fileType = '',
  tmpFile = '',
  rawFile = '',
  messageIndex = '',
  addNewDirectMessage = () => undefined,
  dispatch = () => undefined,
  currentChatTarget = {},
  currentAuthUser = {},
  shouldDeliver = true,
  activeLastMessageThread,
}) => {
  if (!navigator.onLine) {
    toast.error(
      global.translate(
        '2UMoney cannot connect to the internet.',
        161,
      ),
    );
    return;
  }

  const message = {
    receiver: currentChatTarget?.ContactPID,
    body,

    messageId: Math.random() * Date.now(),
    fileType,
    tmpFile,
    shouldDeliver,
  };
  addNewDirectMessage({
    ...message,
    ...{
      sender: currentAuthUser?.PID,
      status: SENDING,
      error: false,
      threadId: activeLastMessageThread,
      createdAt: new Date().toISOString(),
    },
  })(dispatch);

  const data = await saveTemporarily({
    [`file${messageIndex}`]: rawFile,
  });

  if (rawFile === '') {
    chatSocketIOClient.emit(
      NEW_OUTGOING_CHAT_DIRECT_MESSAGE,
      message,
      localStorage.rtsToken,
    );
  } else if (Array.isArray(data?.data) && data?.data[0].url) {
    const fileExtension = rawFile?.name?.split('.')[1];
    const options = {
      MediaSourceURL: data.data[0].url,
      url: '/UploadChatAttachment',
      Type: rawFile?.type,
      PID: currentAuthUser?.PID,
      FileType: fileExtension,
    };

    const mediaUpload = await saveToBackend(options);

    if (mediaUpload?.data?.OK) {
      const messageWithFile = {
        ...message,
        tmpFile: data.data[0].url,
        file: mediaUpload?.data.URL,
      };
      chatSocketIOClient.emit(
        NEW_OUTGOING_CHAT_DIRECT_MESSAGE,
        messageWithFile,
        localStorage.rtsToken,
      );
    } else {
      toast.error(global.translate('Error', 195));
    }
  }
};
