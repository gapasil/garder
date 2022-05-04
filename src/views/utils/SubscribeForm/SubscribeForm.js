import React from 'react';

import { toJS } from 'mobx';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Container, Form, Input } from '../../../components';
import API from '../../../services/api';

import styles from './SubscribeForm.module.scss';

const SubscribeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onPress = async form => {
    try {
      // store.toggleLoading(true);
      const { data } = await API.post('other/subscription', toJS(form));
      if (data.message === 'OK') {
        toast('Вы успешно подписаны на рассылку!', {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
      }
    } catch (error) {
    } finally {
      // store.toggleLoading(false);
    }
  };
  return (
    <div className={styles.subscribe}>
      <Container>
        <div className={styles.subscribeContent}>
          <h2>Получай самые свежие новости из мира моды</h2>
          <p className="t_supbody mt-2 mb-25">
            Подпишитесь на нашу рассылку, чтобы получать отобранные новости из
            мира моды прямо на ваш почтовый ящик.
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
              placeholder="Введите свой email"
              border="small"
              theme="primary"
            />
            {errors.email && <p className="t_sub">{errors.email.message}</p>}
            <Button
              onClick={handleSubmit(onPress)}
              text="Подписаться"
              size="middle"
            />
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SubscribeForm;
