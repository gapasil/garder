import React from 'react';

import { toJS } from 'mobx';
import { useForm } from 'react-hook-form';
import MediaQuery from 'react-responsive/src/Component';
import { toast } from 'react-toastify';

import { Button, Input } from '../../../../components';
import API from '../../../../services/api';
import { NewsContainer } from '../../../utils';

import styles from './NewsList.module.scss';

const NewsList = ({ news }) => {
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
    <div className={styles.list}>
      <h2 className="t_h1 mb-35 ">Новости</h2>
      <div className="flex j-between">
        <NewsContainer general={true} news={news} />
        <MediaQuery minWidth={960}>
          <div className={styles.subscribe}>
            <p className="t_h2 mb-25">
              Следи за трендом,
              <br />
              стань трендом
            </p>
            <p className="t_supbody mb-45">
              Подпишитесь на нашу рассылку, чтобы получать отобранные новости в
              мире моды прямо на ваш почтовый ящик.
            </p>
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
            <Button
              onClick={handleSubmit(onPress)}
              text="Подписаться на рассылку"
              size="middle"
            />
          </div>
        </MediaQuery>
      </div>
    </div>
  );
};

export default NewsList;
