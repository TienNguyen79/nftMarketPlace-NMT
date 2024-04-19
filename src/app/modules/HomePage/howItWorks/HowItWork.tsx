import React from 'react';
import './HowItWork.scss';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import HowItWorkItem from './howItWorkItem/HowItWorkItem';

interface TProps {
  id: number;
  link: string;
  title: string;
  content: string;
}

const data: TProps[] = [
  {
    id: 1,
    link: '/imgHowItWork/img1.png',
    title: 'Setup Your wallet',
    content:
      'Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.',
  },
  {
    id: 2,
    link: '/imgHowItWork/img2.png',
    title: 'Create Collection',
    content:
      'Upload your work and setup your collection. Add a description, social links and floor price.',
  },
  {
    id: 3,
    link: '/imgHowItWork/img3.png',
    title: 'Start Earning',
    content:
      ' Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.',
  },
];

const HowItWork = () => {
  return (
    <div className="HowItWork">
      <div className="HowItWork-head">
        <Gap className="pb48">
          <Title className="size38 ">How it works</Title>
          <Content className="size22 HowItWork-content">Find out how to get started</Content>
        </Gap>
      </div>
      <div className="HowItWork-box">
        {data.map((item) => (
          <div key={item.id}>
            <HowItWorkItem data={item}></HowItWorkItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
