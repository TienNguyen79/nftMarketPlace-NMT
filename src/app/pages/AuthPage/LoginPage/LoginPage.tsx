import React, { useEffect, useState } from 'react';
import './login.scss';
import Title from 'app/components/Common/Title/Title';
import Input from 'app/components/input/Input';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button/Button';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from 'store/auth/handleAuth';
import { RootState } from 'types/RootState';
import { handleGetCurrentUser } from 'store/users/handleUser';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import { setNavigate } from 'store/auth/authSlice';
import { Epath } from 'app/routes/routesConfig';
import { toast } from 'react-toastify';
import { TLogin } from 'types/auth';

const LoginPage: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state: RootState) => state.authSlice);

  const handleLoginForm = (data: TLogin) => {
    dispatch(
      handleLogin({
        ...data,
        callback: () => {
          history.push('/');
        },
      }),
    );
  };

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      history.push(Epath.homePage);
      toast.info('You logged!', { autoClose: 500 });
    }
  }, [history]);

  return (
    <div className="SignIn">
      <div className="SignIn-box">
        <Title className="size51 SignIn-title">Sign In</Title>
        <p className="SignIn-content">
          Welcome! Please enter your login information and start creating, collecting and selling
          NFTs.
        </p>
        <form className="SignIn-form" onSubmit={handleSubmit(handleLoginForm)}>
          <Input
            control={control}
            type="email"
            name="email"
            className="SignIn-form__item"
            placeholder="Email Address"
            kind="primary"
          >
            <img src="/iconAuth/iconLetter.png" alt="" />
          </Input>
          <Input
            control={control}
            type="password"
            name="password"
            className="SignIn-form__item"
            placeholder="Password"
            kind="primary"
          >
            <img src="/iconAuth/iconLockKey.png" alt="" />
          </Input>

          <Button
            kind="primary"
            type="submit"
            isLoading={loading}
            className="SignIn-form__item  btn h50"
          >
            Login
          </Button>

          <div className="SignIn-form__foot">
            <p className="SignIn-form__foot-text">Don't have an account ?</p>
            <Link to="/sign-up" className=" SignIn-form__foot-link">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <img src="/imgSignUp.png" className="SignIn-image" alt="" />
    </div>
  );
};

export default LoginPage;
