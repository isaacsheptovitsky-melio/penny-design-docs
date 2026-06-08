import { useEffect, useState } from 'react';

import { type FileMetadata, type FileValue, getPreviewFileMetadata, readFileDataURL } from '../../FileInput';

export const useFilePreview = ({ selectedFile }: { selectedFile: FileValue | null }) => {
  const [previewFileMetadata, setPreviewFileMetadata] = useState<FileMetadata | null>(null);

  useEffect(() => {
    const processFile = async () => {
      try {
        const fileDataURL = (await readFileDataURL(selectedFile)) ?? null;
        const previewFileMetadata = getPreviewFileMetadata(selectedFile, fileDataURL);

        setPreviewFileMetadata(previewFileMetadata);
      } catch {
        setPreviewFileMetadata(null);
      }
    };
    if (!selectedFile) {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewFileMetadata(null);
      return;
    }
    void processFile();
  }, [selectedFile]);

  return previewFileMetadata;
};
