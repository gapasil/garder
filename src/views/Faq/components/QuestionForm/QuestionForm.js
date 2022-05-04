import React from 'react';

import { toJS } from 'mobx';
import { Controller, useForm } from 'react-hook-form';

import { Button, Form, Input, Line } from '../../../../components';
import API from '../../../../services/api';
import store from '../../../../stores';
import { Classes } from '../../../../utils';

import styles from './QuestionForm.module.scss';

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    try {
      store.toggleLoading(true);
      await API.post('faq', toJS(data));
      reset({ email: '', question: '' });
    } catch {
    } finally {
      store.toggleLoading(false);
    }
  };
  return (
    <div className={styles.question}>
      <h1>
        Другой вопрос
        <Line />
      </h1>
      <p>
        Если вы не нашли ответ на свой вопрос, пожалуйста, задайте его нам через
        форму ниже.
      </p>
      <Form>
        <div
          className={Classes.join([
            'flex j-between a-center mb-25 mt-4',
            styles.input,
          ])}
        >
          <p>E-mail</p>
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
          />
        </div>
        {errors.email && <p className="t_sub">{errors.email.message}</p>}
        <div
          className={Classes.join(['flex j-between a-center', styles.input])}
        >
          <p>Сообщение</p>
          <Controller
            defaultValue=""
            name="question"
            isClearable
            control={control}
            render={({ field }) => (
              <textarea
                required={true}
                {...field}
                placeholder="Опишите ситуацию как можно подробнее, все действия и шаги. Для облегчения нашей работы, Вы можете прикрепить ссылки, где были обнаружены ошибки или вопросы."
              ></textarea>
            )}
          />
        </div>
        <div className="flex j-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            size="middle"
            text="Отправить"
          />
        </div>
      </Form>
    </div>
  );
};

export default QuestionForm;
