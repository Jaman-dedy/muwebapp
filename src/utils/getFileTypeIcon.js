export default file => {
  if (!file) return 'file image';
  const powerpointTypes = [
    'application/mspowerpoint',
    'application/powerpoint',
    'application/vnd.ms-powerpoint',
    'application/x-mspowerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];

  const wordTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const excelTypes = [
    'application/excel',
    'application/vnd.ms-excel',
    'application/x-excel',
    'application/x-msexcel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (powerpointTypes.includes(file.type)) {
    return 'file powerpoint';
  }
  if (wordTypes.includes(file.type)) {
    return 'file word outline';
  }
  if (excelTypes.includes(file.type)) {
    return 'file excel';
  }
  return 'file';
};
