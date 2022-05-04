import React, { useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppleLogin from 'react-apple-login';
import { GoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';

import {
  Button,
  Form,
  Input,
  Line,
  Modal,
  PassInput,
} from '../../../components';
// import { AppleLogin } from "react-sign-in-apple";

import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

import apple from './assets/svg/apple.svg';
import google from './assets/svg/google.svg';

const SignIn = observer(() => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  const responseGoogle = async response => {
    await API.post('auth/siwg', toJS({ siwgToken: response.tokenId }));

    setRedirect(true);
    await store._initUser();
  };
  const responseApple = async response => {
    await API.post(
      'auth/siwa',
      toJS({ siwaToken: response.authorization.id_token }),
    );

    setRedirect(true);
    await store._initUser();
  };
  const onPress = async form => {
    try {
      store.toggleLoading(true);
      await API.post('auth/signin', toJS(form));
      setRedirect(true);
      await store._initUser();
    } catch (error) {
    } finally {
      store.toggleLoading(false);
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Modal
      header="Вход"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div className={styles.auth}>
          <p className="bold t_body">С помощью соцсетей</p>
          <GoogleLogin
            clientId="117977329538-088vd1scg7qetav6a1ne0b2sq26bkgne.apps.googleusercontent.com"
            render={renderProps => (
              <Link
                onClick={renderProps.onClick}
                to="#"
                className={Classes.join([styles.socialBtn, styles.google])}
              >
                <img src={google} alt="Google" /> Продолжить с помощью Google
              </Link>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            // onFailure={ responseGoogle }
            cookiePolicy={'single_host_origin'}
          />
          {/*<AppleLogin*/}
          {/*    clientId="kz.gardershop.service"*/}
          {/*    redirectURI="https://gardershop.kz"*/}
          {/*    onSuccess={ console.log }*/}
          {/*    onFailure={ console.error }*/}
          {/*    render={ ({onClick}) => (*/}
          {/*        <Link to="#" onClick={ onClick }*/}
          {/*              className={ Classes.join([styles.socialBtn, styles.apple]) }>*/}
          {/*            <img src={ apple } alt="Apple"/> Продолжить с помощью Apple*/}
          {/*        </Link>*/}
          {/*    ) }*/}
          {/*/>*/}

          <AppleLogin
            callback={data => responseApple(data)}
            usePopup={true}
            clientId="kz.gardershop.service"
            redirectURI="https://gardershop.kz"
            render={({ onClick }) => (
              <Link
                to="#"
                onClick={onClick}
                className={Classes.join([styles.socialBtn, styles.apple])}
              >
                <img src={apple} alt="Apple" /> Продолжить с помощью Apple
              </Link>
            )}
          />
        </div>
        <div className={styles.divine}>
          <Line />
          <span className="c_gray t_sub">или</span>
          <Line />
        </div>
        <div className={Classes.join([styles.auth, styles.login])}>
          <p className="bold t_body">
            С помощью аккаунта Garder
            <Link to="?popup=sign-up">Создать аккаунт</Link>
          </p>
          <Form>
            <Input
              invalid={errors.email && true}
              {...register('email', {
                required: 'Это поле необходимо заполнить',
                maxLength: 100,
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email введен не корректно',
                },
              })}
              onInput={(e, v) => setValue(e, v)}
              placeholder="Введите свой email"
            />
            {errors.email && <p className="t_sub">{errors.email.message}</p>}
            <PassInput
              invalid={errors.password && true}
              {...register('password', {
                required: 'Это поле необходимо заполнить',
                maxLength: 100,
              })}
              onInput={(e, v) => setValue(e, v)}
              placeholder="Введите пароль"
            />
            {errors.password && (
              <p className="t_sub">{errors.password.message}</p>
            )}
            <Link to="?popup=entryEmail">Забыли пароль?</Link>

            <Button
              onClick={handleSubmit(onPress)}
              size="middle"
              text="Войти"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
});

export default SignIn;
