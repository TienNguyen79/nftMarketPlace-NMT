import React from 'react';
import TextMono from '../Text/TextMono';
import TextBold from '../Text/TextBold';
import './countdown.scss';
import Button from 'app/components/button/Button';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
const CountDown = ({
  kind = '',
  id,
  status,
  idNft,
  className,
}: {
  kind?: string;
  id?: string;
  status?: string;
  idNft?: string;
  className?: string;
}) => {
  const dataCurrentUser = useSelector((state: RootState) => state.userSlice.dataUser[0]);

  return (
    <div className={`countDown ${className}`}>
      <TextMono className="countDown-head">Auction ends in:</TextMono>
      <div className="countDown-box">
        <div className="countDown-box___item">
          <TextBold className="size38 countDown-box___item-quantity">59:</TextBold>
          <TextMono className="countDown-box___item-type">Hours</TextMono>
        </div>

        <div className="countDown-box___item">
          <TextBold className="size38 countDown-box___item-quantity">59:</TextBold>
          <TextMono className="countDown-box___item-type">Minutes</TextMono>
        </div>

        <div className="countDown-box___item">
          <TextBold className="size38 countDown-box___item-quantity">59</TextBold>
          <TextMono className="countDown-box___item-type">Seconds</TextMono>
        </div>
      </div>
      {dataCurrentUser?.id !== id && kind === 'btn' && status === 'sell' && (
        <Button kind="primary" href={`/buyNft/${idNft}`} className="countDown-btn">
          Buy Nft
        </Button>
      )}
    </div>
  );
};

export default CountDown;
