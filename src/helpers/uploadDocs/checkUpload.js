import uploadFileService from 'helpers/uploadImages/uploadFileService';

export default async (name, file, data, url) => {
  let type = '';

  switch (name) {
    case 'UserIDURL':
      type = '1';
      break;
    case 'UserProofOfAddressURL':
      type = '2';
      break;
    case 'UserExtraDoc1URL':
      type = '3';
      break;
    case 'UserExtraDoc2URL':
      type = '4';
      break;
    case 'UserExtraDoc3URL':
      type = '5';
      break;
    case 'UserExtraDoc4URL':
      type = '6';
      break;
    case 'UserExtraDoc5URL':
      type = '7';
      break;

    default:
      break;
  }

  const options = await uploadFileService(
    {
      [name]: file,
    },
    url,
    type,
    data?.PID,
    true,
  );

  return options;
};
