import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, IconButton } from '@material-ui/core';
import { PublishTwoTone, Close } from '@material-ui/icons';

interface FileUploaderProps {
  onChange: (file: File | null) => void;
  onReset: boolean;
  acceptType: string;
  label?: string;
}

const FileUploader: FunctionComponent<FileUploaderProps> = ({
  onChange,
  onReset,
  acceptType,
  label,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      onChange(acceptedFiles[0]);
    },
    accept: acceptType,
    multiple: false,
  });

  useEffect(() => {
    setFiles([]);
  }, [onReset]);

  const onCancel = () => {
    setFiles([]);
    onChange(null);
  };

  const thumbs = files.map((file) => (
    <Grid item className="p-2" key={file.name}>
      <div className="p-2 card-box rounded-sm text-first text-center font-size-sm">
        {file.name}
      </div>
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={onCancel}
        style={{
          position: 'absolute',
          right: -2,
          top: -2,
        }}
      >
        <Close fontSize="inherit" color="error" />
      </IconButton>
    </Grid>
  ));

  return (
    <div className="dropzone text-break">
      {thumbs.length <= 0 ? (
        <div
          {...getRootProps({
            className: 'dropzone-upload-wrapper',
          })}
        >
          <input {...getInputProps()} />
          <div className="dropzone-inner-wrapper bg-white p-0">
            <div className="d-flex align-items-center">
              <div className="d-50 hover-scale-lg icon-blob btn-icon text-first mx-auto">
                <svg
                  className="d-140 opacity-2"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(300,300)">
                    <path
                      d="M171.2,-128.5C210.5,-87.2,223.2,-16.7,205.1,40.4C186.9,97.5,137.9,141.1,81.7,167.2C25.5,193.4,-38,202.1,-96.1,181.2C-154.1,160.3,-206.7,109.7,-217.3,52.7C-227.9,-4.4,-196.4,-68,-153.2,-110.2C-110,-152.4,-55,-173.2,5.5,-177.5C65.9,-181.9,131.9,-169.8,171.2,-128.5Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                <div className="blob-icon-wrapper">
                  <PublishTwoTone className="d-30" />
                </div>
              </div>
              <div className="font-size-sm">{label}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center">{thumbs}</div>
      )}
    </div>
  );
};
export default FileUploader;
