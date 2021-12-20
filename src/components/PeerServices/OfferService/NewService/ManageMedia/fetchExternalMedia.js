import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export default () => {
  const [fetching, setIsFetchingFile] = useState(false);
  const [error, setError] = useState(null);
  const [resource, setResource] = useState({});
  const fetchFileURL = useCallback(
    async ({ file, type }, onFileFetched) => {
      setIsFetchingFile(true);
      setError(null);

      if (type === 'video/') {
        setError(null);
        setIsFetchingFile(false);
        onFileFetched(file, type);
        setResource({ type: 'video', file });
        return;
      }

      if (file.startsWith('data:')) {
        setIsFetchingFile(false);
        toast.error(
          global.translate(
            'File URL type not supported, please select a different one',
            1901,
          ),
        );

        return;
      }

      setError(null);
      setIsFetchingFile(false);
      onFileFetched(file, type);
      setResource({ type: 'image', file });
    },
    [],
  );
  return { fetching, error, resource, fetchFileURL };
};
