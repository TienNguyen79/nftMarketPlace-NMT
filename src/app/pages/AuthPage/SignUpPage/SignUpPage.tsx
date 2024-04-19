import React, { useEffect } from 'react';
import './signUp.scss';
import Title from 'app/components/Common/Title/Title';
import Input from 'app/components/input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'app/components/button/Button';
import { Link, Redirect, useHistory } from 'react-router-dom';
import useToggleValue from 'app/helpers/customHook/useToggleValue';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from 'store/auth/handleAuth';
import { RootState } from 'types/RootState';
import { setNavigate } from 'store/auth/authSlice';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import { Epath } from 'app/routes/routesConfig';
const SignUpPage = () => {
  const { control, handleSubmit } = useForm();

  // const { value: showEye1, handleToggleValue: handleToggleEye1 } = useToggleValue();
  // const { value: showEye2, handleToggleValue: handleToggleEye2 } = useToggleValue();

  const dispatch = useDispatch();
  const history = useHistory();
  interface Tregister {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
  }

  const { loading } = useSelector((state: RootState) => state.authSlice);

  const handleRegisterForm = (data: Tregister) => {
    if (data.confirm_password !== data.password) {
      toast.error('Confirm password must match the password!', { autoClose: 1500 });
    } else {
      dispatch(
        handleRegister({
          name: data.name,
          email: data.email,
          password: data.password,
          callback: () => history.push('/login'),
        }),
      );
    }
  };

  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      history.push(Epath.homePage);
      toast.info('You logged!', { autoClose: 500 });
    }
  }, [history]);
  return (
    <div className="SignUp">
      <img src="/imgSignup.png" className="SignUp-image" alt="" />
      <div className="SignUp-box ">
        <Title className="size51 SignUp-title">Create account</Title>
        <p className="SignUp-content">
          Welcome! enter your details and start creating, collecting and selling NFTs.
        </p>
        <form className="SignUp-form" onSubmit={handleSubmit(handleRegisterForm)}>
          <Input
            control={control}
            type="text"
            name="name"
            className="SignUp-form__item"
            placeholder="Username"
            kind="primary"
          >
            <img src="/iconAuth/iconUser.png" alt="" />
          </Input>
          <Input
            control={control}
            type="email"
            name="email"
            className="SignUp-form__item"
            placeholder="Email Address"
            kind="primary"
          >
            <img src="/iconAuth/iconLetter.png" alt="" />
          </Input>
          <Input
            control={control}
            type="password"
            name="password"
            className="SignUp-form__item"
            placeholder="Password"
            kind="primary"
          >
            <img src="/iconAuth/iconLockKey.png" alt="" />
          </Input>
          <Input
            control={control}
            type="password"
            name="confirm_password"
            className="SignUp-form__item"
            placeholder="Confirm Password"
            kind="primary"
          >
            <img src="/iconAuth/iconLockKey.png" alt="" />
          </Input>

          <Button
            kind="primary"
            type="submit"
            className="SignUp-form__item  btn h50"
            isLoading={loading}
          >
            Create account
          </Button>

          <div className="SignUp-form__foot">
            <p className="SignUp-form__foot-text">Already a member ?</p>
            <Link to="/login" className=" SignUp-form__foot-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
