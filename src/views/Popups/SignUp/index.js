import React, { useState } from 'react';

import { toJS } from 'mobx';
import { Controller, useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  PassInput,
} from '../../../components';
import API from '../../../services/api';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const onPress = async form => {
    try {
      // store.toggleLoading(true);
      await API.post('auth/signup', toJS(form));
      setRedirect(true);
    } catch (error) {
    } finally {
      // store.toggleLoading(false);
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Modal
      header="Регистрация"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div className={Classes.join([styles.auth, styles.login])}>
          <Form onSubmit={handleSubmit(onPress)}>
            <Input
              invalid={errors.name && true}
              {...register('name', {
                required: 'Это поле необходимо заполнить',
                maxLength: 100,
              })}
              placeholder="Введите ваше имя"
            />
            {errors.name && <p className="t_sub">{errors.name.message}</p>}
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
              placeholder="Введите свой email"
            />
            {errors.email && <p className="t_sub">{errors.email.message}</p>}
            <PassInput
              invalid={errors.password && true}
              {...register('password', {
                required: true,
                maxLength: 32,
                minLength: 6,
              })}
              placeholder="Введите пароль"
            />
            {errors.password?.type === 'required' && (
              <p className="t_sub">Это поле необходимо заполнить</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="t_sub">Минимальная длина пароля 6 символов</p>
            )}
            <PassInput
              invalid={errors.confirm && true}
              {...register('confirm', {
                required: true,
                maxLength: 32,
                minLength: 6,
                validate: value => value === watch('password'),
              })}
              placeholder="Подтвердите пароль"
            />
            {errors.confirm?.type === 'required' && (
              <p className="t_sub">Это поле необходимо заполнить</p>
            )}
            {errors.confirm?.type === 'minLength' && (
              <p className="t_sub">Минимальная длина пароля 6 символов</p>
            )}
            {errors.confirm?.type === 'validate' && (
              <p className="t_sub">Пароли не совпадают</p>
            )}
            <div className={styles.checkbox}>
              <Controller
                name="subscribe"
                isClearable
                control={control}
                render={({ field }) => <Checkbox {...field} />}
              />
              Подписаться на обновления
            </div>
            <Button
              onClick={handleSubmit(onPress)}
              size="middle"
              text="Зарегистрироваться"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
