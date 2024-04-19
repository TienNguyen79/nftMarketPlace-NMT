import React from 'react';
import './footer.scss';
import Content from './parts/Content';
import Input from 'app/components/input/Input';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button/Button';
import { Divider } from 'antd';
const Footer = () => {
  const { control } = useForm();
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-box">
          <img src="/logoP.png" alt="" />
          <div className="footer-box__item">
            <Content className="footer-box__item__option1">
              NFT marketplace UI created with Anima for Figma.
            </Content>
            <Content className="footer-box__item__option2">Join our community</Content>

            <div className="footer-box__icon">
              <img src="/iconFoot/icon1.png" alt="t" />
              <img src="/iconFoot/icon2.png" alt="t" />
              <img src="/iconFoot/icon3.png" alt="t" />
              <img src="/iconFoot/icon4.png" alt="t" />
            </div>
          </div>
        </div>
        <div className="footer-box">
          <h1 className="footer-title">Explore</h1>
          <div className="footer-box__item">
            <Content>Marketplace</Content>
            <Content className="footer-box__item__option2">Rankings</Content>
            <Content>Connect a wallet</Content>
          </div>
        </div>

        <div className="footer-box">
          <h1 className="footer-title">Join our weekly digest</h1>
          <div className="footer-box__item">
            <Content className="footer-box__item__option3">
              Get exclusive promotions & updates straight to your inbox.
            </Content>

            <Input
              name="email"
              type="email"
              control={control}
              placeholder="Enter your email here"
              className="footer-input"
              kind="btn"
            >
              <Button kind="primary" className="footer-btn">
                Subscribe
              </Button>
            </Input>
          </div>
        </div>
      </div>
      <div className="box-divider">
        <div className="divider"></div>
        <p className="footer-copyright">Ⓒ NFT Market. Use this template freely.</p>
      </div>
    </div>
  );
};

export default Footer;
