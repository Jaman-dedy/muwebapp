import { useState, useCallback } from 'react';
import Axios from 'axios';
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

      if (
        file.match(
          '^data:((?:w+/(?:(?!;).)+)?)((?:;[wW]*?[^;])*),(.+)$',
        )
      ) {
        setIsFetchingFile(false);
        toast.error(
          global.translate(
            'File URL type not supported, please select a different one',
            1901,
          ),
        );
      }

      try {
        await Axios.get(file);
        setError(null);
        setIsFetchingFile(false);
        onFileFetched(file, type);
        setResource({ type: 'image', file });
      } catch (err) {
        setIsFetchingFile(false);
        toast.error(
          global.translate(
            "We can't find the image at that URL. Please check the address for typing errors.",
          ),
        );
      }
    },
    [],
  );
  return { fetching, error, resource, fetchFileURL };
};
