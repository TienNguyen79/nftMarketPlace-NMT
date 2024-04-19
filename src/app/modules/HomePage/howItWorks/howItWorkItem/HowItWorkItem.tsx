import React from 'react';
import './HowItWorkItem.scss';
import Content from 'app/components/Common/Content/Content';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';

interface TProps {
  data: {
    link: string;
    title: string;
    content: string;
  };
}

const HowItWorkItem: React.FC<TProps> = ({ data }) => {
  return (
    <div className="HowItWorkItem">
      <Image link={data.link} className="HowItWorkItem-image"></Image>
      <Title className="HowItWorkItem-title size22">{data.title}</Title>
      <Content className="HowItWorkItem-content ">{data.content}</Content>
    </div>
  );
};

export default HowItWorkItem;
