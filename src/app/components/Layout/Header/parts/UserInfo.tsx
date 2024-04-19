import Content from 'app/components/Common/Content/Content';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import { checkImageExtension } from 'app/helpers/common';
import React from 'react';
import '../../Header/header.scss';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
const UserInfo = ({
  data,
}: {
  data: { name: string; email: string; avatar: string; id: string };
}) => {
  return (
    <div>
      <div className="header-popUp__info">
        <Image
          className="header-popUp__info__img"
          link={checkImageExtension(data?.avatar) ? data?.avatar : '/avarta.png'}
        ></Image>
        <div className="header-popUp__Boxname">
          <Title className="header-popUp__Boxname__name">{data?.name}</Title>
          <Content className="header-popUp__Boxname__email">{data?.email}</Content>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
