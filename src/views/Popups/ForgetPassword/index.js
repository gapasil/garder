import React, { useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';

import { Button, Form, Input, Modal, PassInput } from '../../../components';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const ForgetPassword = observer(() => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [redirect, setRedirect] = useState(false);
  const onSubmit = data => console.log(data);
  const history = useHistory();

  const goToReset = async res => {
    const form = {
      email: store.resetForm.email,
      newPassword: res.newPassword,
      confirmationCode: res.confirmationCode,
    };
    store.setResetForm(form);
    const { data } = await API.post('auth/new-password', toJS(form));
    setRedirect(data.status);
  };

  if (redirect) {
    return <Redirect to="?popup=entryCode" />;
  }
  return (
    <Modal
      header="Восстановление пароля"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div className={Classes.join([styles.auth, styles.login])}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Введите код из письма"
              invalid={errors.email && true}
              {...register('confirmationCode', {
                maxLength: 100,
                required: 'Это поле обязательно для заполнения',
              })}
            />
            {errors.confirmationCode && (
              <p className="t_sub">{errors.confirmationCode.message}</p>
            )}
            <PassInput
              invalid={errors.newPassword && true}
              {...register('newPassword', {
                maxLength: 32,
                minLength: 6,
                required: true,
              })}
              placeholder="Введите пароль"
            />
            {errors.newPassword?.type === 'required' && (
              <p className="t_sub">Это поле необходимо заполнить</p>
            )}
            {errors.newPassword?.type === 'minLength' && (
              <p className="t_sub">Минимальная длина пароля 6 символов</p>
            )}

            <PassInput
              invalid={errors.confirm && true}
              {...register('confirm', {
                maxLength: 32,
                minLength: 6,
                validate: value => value === watch('newPassword'),
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

            <Button
              onClick={handleSubmit(goToReset)}
              size="middle"
              text="Сменить пароль"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
});

export default ForgetPassword;
