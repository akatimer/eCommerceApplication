import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import './PromoCode.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addPromoCode, getCart } from '../../../utils/api/clientApi';
import { Cart } from '@commercetools/platform-sdk';

interface Form {
  code: string;
}

type Props = {
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

const PromoCode: React.FC<Props> = ({ setCart }) => {
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const { register, handleSubmit } = useForm<Form>();
  const [isError, setIsError] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const onSubmit: SubmitHandler<Form> = (data) => {
    setIsDisabledBtn(true);
    getCart()
      .then((response) => {
        if (response) {
          addPromoCode(data.code, response.body.id, response.body.version).then((response) => {
            setIsDisabledBtn(false);
            if (response) {
              setCart(response.body);
              setIsApplied(true);
            } else setIsError(true);
          });
        }
      })
      .catch(console.error);
  };
  return (
    <form className="cart-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="cart-input__wrapper">
        <Input
          onFocus={(): void => {
            setIsError(false);
            setIsApplied(false);
          }}
          {...register('code')}
          placeholder="Coupon code"
          color="primary"
          sx={{
            position: 'relative',
            maxWidth: 150,
            fontFamily: 'Mulish',
            alignSelf: 'center',
            color: '#6F7E8C',
            textAlign: 'center',
          }}
        />
        {isError && <div className="coupon-error">Coupon not found</div>}
        {isApplied && <div className="coupon-applied">Coupon applied</div>}
      </div>
      <Button
        disabled={isDisabledBtn}
        type="submit"
        sx={{ fontFamily: 'Mulish', alignSelf: 'center', color: '#eda3b5' }}
      >
        apply
      </Button>
    </form>
  );
};

export default PromoCode;
