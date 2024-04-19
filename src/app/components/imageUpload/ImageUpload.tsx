import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { imgbbAPI } from 'app/helpers/common';
import './imageUpload.scss';
interface ImageObject {
  medium?: string;
  thumb?: string;
  url?: string;
}

interface Props {
  onChange?: (name: string, imageObj: ImageObject) => void;
  name?: string;
  setValue?: (name: string, value: string) => void;
  getValues?: string;
  className?: string;
  setLinkImg?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageUpload: React.FC<Props> = ({
  onChange = () => {},
  name = '',
  setValue,
  getValues = '',
  className = '',
  setLinkImg,
}) => {
  const [showImage, setShowImage] = useState<string | undefined>('');

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (!file) return;
    const bodyFormData = new FormData();
    bodyFormData.append('image', file[0]);
    try {
      const response = await axios.post(imgbbAPI, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageData = response.data.data;

      if (!imageData) {
        toast.error('Can not upload image to imgbbAPI');
        return;
      }

      const imageObj: ImageObject = {
        medium: imageData?.medium?.url,
        thumb: imageData?.thumb?.url,
        url: imageData?.url,
      };
      onChange(name, imageObj);

      setShowImage(imageObj.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    setShowImage(getValues); // khi mới đầu vào cho nó load ảnh lên
  }, [getValues]);

  const handleDeleteImage = () => {
    setShowImage('');
    setValue && setValue(name || '', '');
    setLinkImg && setLinkImg('');
  };

  return (
    <div className="imgUpload">
      <label className={`imgUpload-label ${showImage && 'point-none'} ${className}`}>
        <input type="file" onChange={handleUploadImage} className="hidden" />
        {!showImage && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={100}
            height={100}
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M81.25 81.25H18.75C17.0924 81.25 15.5027 80.5915 14.3306 79.4194C13.1585 78.2473 12.5 76.6576 12.5 75V31.25C12.5 29.5924 13.1585 28.0027 14.3306 26.8306C15.5027 25.6585 17.0924 25 18.75 25H31.25L37.5 15.625H62.5L68.75 25H81.25C82.9076 25 84.4973 25.6585 85.6694 26.8306C86.8415 28.0027 87.5 29.5924 87.5 31.25V75C87.5 76.6576 86.8415 78.2473 85.6694 79.4194C84.4973 80.5915 82.9076 81.25 81.25 81.25Z"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 65.625C57.7665 65.625 64.0625 59.329 64.0625 51.5625C64.0625 43.796 57.7665 37.5 50 37.5C42.2335 37.5 35.9375 43.796 35.9375 51.5625C35.9375 59.329 42.2335 65.625 50 65.625Z"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {showImage && <img src={showImage} className="imgUpload-showImg" alt="" />}
      </label>

      {showImage && (
        <div>
          <button type="button" className={`imgUpload-delete  `}>
            <span onClick={handleDeleteImage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
