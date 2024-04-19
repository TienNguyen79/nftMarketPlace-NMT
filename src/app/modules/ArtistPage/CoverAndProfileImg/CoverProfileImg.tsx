import React from 'react';
import './coverProfileImg.scss';
import Image from 'app/components/Common/Image/Image';
import { checkImageExtension } from 'app/helpers/common';
const CoverProfileImg = ({ coverImg = '', avatar = ' ' }) => {
  return (
    <div className="CoverProfileImg">
      <Image
        link={checkImageExtension(coverImg) ? coverImg : '/imgArtist/img-cover.png'}
        className="CoverProfileImg-cover"
      ></Image>
      <Image
        link={checkImageExtension(avatar) ? avatar : '/imgArtist/avatar.png'}
        className="CoverProfileImg-avatar"
      ></Image>
    </div>
  );
};

export default CoverProfileImg;
