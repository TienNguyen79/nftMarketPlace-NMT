import React from 'react';
import './subscribe.scss';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Input from 'app/components/input/Input';
import Button from 'app/components/button/Button';
import { useForm } from 'react-hook-form';
const Subscribe = () => {
  const { control } = useForm();
  return (
    <div className="Subscribe">
      <Image link="/astronaut.png" className="Subscribe-img"></Image>
      <div className="Subscribe-box">
        <Title className="size38 Subscribe-title">Join our weekly digest</Title>
        <Content className="size22 Subscribe-content">
          Get exclusive promotions & updates straight to your inbox.
        </Content>

        <Input
          name="email"
          type="email"
          kind="btn"
          control={control}
          placeholder="Enter your email here"
          className="footer-input"
        >
          <Button kind="primary" icon="/iconHome/Letter.png" className="footer-btn">
            Subscribe
          </Button>
        </Input>
      </div>
    </div>
  );
};

export default Subscribe;
