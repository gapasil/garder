import React, { useState } from 'react';

import { runInAction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import { Button, Form, Input, Modal } from '../../../components';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const EntryEmail = observer(() => {
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

  const submitEmail = async form => {
    await API.post('auth/reset', toJS(form));
    runInAction(() => {
      store.resetForm = { ...store.resetForm, email: form.email };
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="?popup=forget-password" />;
  }
  return (
    <Modal
      header="Изменение пароля"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div className={Classes.join([styles.auth, styles.login])}>
          <p className={Classes.join(['t_sub', styles.entryEmail])}>
            Введите адрес электронной почты, на который мы отправим вам ссылку
            со страницей восстановления пароля
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Введите ваш e-mail"
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
            />
            {errors.email && <p className="t_sub">{errors.email.message}</p>}
            <Button
              onClick={handleSubmit(submitEmail)}
              size="middle"
              text="Отправить письмо"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
});

export default EntryEmail;
