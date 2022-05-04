import React, { useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import { useForm, Controller } from 'react-hook-form';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import {
  Animation,
  Button,
  Form,
  Input,
  Line,
  PassInput,
} from '../../../components';
import PhoneInput from '../../../components/PhoneInput/PhoneInput';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';

import styles from './Settings.module.scss';

// #TODO: Настроить инпуты
// {
//     user:
//         birthday: null
//     email: "test@test.ru"
//     emailVerified: false
//     firstname: "test"
//     lastname: null
//     middlename: null
//     phone: "+7"
//     type: "USER"
// }
// defaultValues:{
//     birthday: null,
//         email: null,
//         emailVerified: false,
//         firstname: null,
//         lastname: null,
//         middlename: null,
//         phone: null,
// }
const Settings = observer(() => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      birthday: null,
      email: null,
      firstname: null,
      lastname: store.user?.lastname,
      middlename: store.user?.middlename,
      password: null,
      confirm: null,
      phone: store.user?.phone,
    },
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setValue('birthday', store.user?.birthday);
    setValue('email', store.user?.email);
    setValue('firstname', store.user?.firstname);
    setValue('lastname', store.user?.lastname);
    setValue('middlename', store.user?.middlename);
    setValue('phone', store.user?.phone);
  }, [store.user]);

  const changeEmail = (e, v) => {
    setValue(e, v);
    v.length > 0 && v !== store.user.email ? setShow(true) : setShow(false);
  };

  const showPassword = () => setShow(s => !s);
  const onSubmit = async data => {
    try {
      data.email = store.user.email === data.email ? null : data.email;
      data.phone = data.phone.replace(/\s+/g, '');
      store.toggleLoading(true);
      await API.post('user', toJS(data));
      await store._initUser();
      setShow(false);
    } catch (error) {
    } finally {
      store.toggleLoading(false);
    }
  };
  return (
    <div className={styles.settings}>
      <MetaTags>
        <title>Личные данные | Gardershop – одежда и обувь</title>
      </MetaTags>
      <p className="t_h3 mr-2 mb-25">Личные данные</p>
      <Form>
        <div className="flex a-center">
          <p className="t_body">Фамилия</p>
          <Input
            placeholder={`Фамилия`}
            invalid={errors.name && true}
            {...register('lastname', {
              maxLength: 100,
            })}
          />

          <p className="t_body">Имя</p>
          <Input
            placeholder={`Имя`}
            invalid={errors.name && true}
            {...register('firstname', {
              maxLength: 100,
            })}
          />

          <p className="t_body">Отчество</p>
          <Input
            placeholder={`Отчество`}
            invalid={errors.middlename && true}
            {...register('middlename', {
              maxLength: 100,
            })}
          />
        </div>
        <div className={Classes.join(['flex a-center', styles.email])}>
          <p className="t_body">Email</p>
          <div className="flex column a-start j-start">
            <Input
              placeholder={`E-mail`}
              invalid={errors.email && true}
              onInput={changeEmail}
              {...register('email', {
                maxLength: 100,
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email введен не корректно',
                },
              })}
            />
            <Animation show={show}>
              <div className={styles.dropdownPass}>
                <PassInput
                  invalid={errors.password && true}
                  onInput={setValue}
                  {...register('password', {
                    maxLength: 32,
                    minLength: 6,
                    required: show,
                  })}
                  placeholder="Введите пароль"
                />
                {errors.password?.type === 'required' && (
                  <p className="t_sub">Это поле необходимо заполнить</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="t_sub">Минимальная длина пароля 6 символов</p>
                )}
              </div>
            </Animation>
          </div>
        </div>
        {errors.email && <p className="t_sub">{errors.email.message}</p>}
        <div
          className={Classes.join([
            `flex ${show ? 'a-start' : 'a-start'}`,
            styles.password,
          ])}
        >
          <p className="t_body">Пароль</p>

          <div>
            <Link to="?popup=entryEmail">
              <Button theme="invers" text="Изменить" />
            </Link>
          </div>
          {/*<MediaQuery maxWidth={ 672 }>*/}
          {/*    <Animation show={ show }>*/}
          {/*    <div className={ styles.dropdownPass }>*/}
          {/*        <PassInput invalid={ errors.password && true }*/}
          {/*                   { ...register("password", {*/}
          {/*                       maxLength: 32,*/}
          {/*                       minLength: 6,*/}
          {/*                   }) }*/}
          {/*                   placeholder='Введите пароль'*/}
          {/*        />*/}
          {/*        { errors.password?.type === 'required' &&*/}
          {/*        <p className='t_sub'>Это поле необходимо заполнить</p> }*/}
          {/*        { errors.password?.type === "minLength" &&*/}
          {/*        <p className='t_sub'>Минимальная длина пароля 6 символов</p> }*/}

          {/*        <PassInput invalid={ errors.confirm && true }*/}
          {/*                   { ...register("confirm", {*/}
          {/*                       maxLength: 32,*/}
          {/*                       minLength: 6,*/}
          {/*                       validate: (value) => value === watch('password')*/}
          {/*                   }) }*/}
          {/*                   placeholder='Подтвердите пароль'*/}
          {/*        />*/}
          {/*        { errors.confirm?.type === 'required' &&*/}
          {/*        <p className='t_sub'>Это поле необходимо заполнить</p> }*/}
          {/*        { errors.confirm?.type === "minLength" &&*/}
          {/*        <p className='t_sub'>Минимальная длина пароля 6 символов</p> }*/}
          {/*        { errors.confirm?.type === "validate" &&*/}
          {/*        <p className='t_sub'>Пароли не совпадают</p> }*/}

          {/*    </div>*/}
          {/*</Animation>*/}
          {/*</MediaQuery>*/}
        </div>
        <Line />
        <div className={Classes.join(['flex a-center', styles.phone])}>
          <p className="t_body">Номер телефона</p>
          <PhoneInput
            placeholder={'Номер телефона'}
            invalid={errors.phone && true}
            {...register('phone')}
          />
        </div>
        <div className={Classes.join(['flex a-center', styles.birthday])}>
          <p className="t_body">Дата рождения</p>
          <Controller
            name="birthday"
            isClearable
            control={control}
            render={({ field }) => (
              <DayPickerInput
                {...field}
                onDayChange={e => {
                  setValue('birthday', formatDate(e, 'D.MM.YYYY'));
                }}
                classNames={styles.wrapper}
                inputProps={{ className: styles.dayInput }}
                dayPickerProps={{
                  // fromMonth: new Date(),
                  locale: 'ru',
                  localeUtils: MomentLocaleUtils,
                  className: styles.wrapper,
                  modifiersStyles: {
                    wrapper: {
                      borderRadius: '30px',
                    },
                    selected: {
                      color: '#fff',
                      background: '#4853A2',
                      borderRadius: '8px',
                    },
                  },
                }}
                format="D.MM.YYYY"
                placeholder={`Дата рождения`}
                formatDate={formatDate}
                parseDate={parseDate}
              />
            )}
          />
        </div>
        {/*<div className={ Classes.join(["flex a-center", styles.gender]) }>*/}
        {/*    <p className='t_body'>Пол</p>*/}
        {/*    <div>*/}
        {/*        <RadioButton name='gender' label='Мужской' active={ true }/>*/}
        {/*        <RadioButton name='gender' label='Женский'/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="flex j-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            text="Сохранить"
            size="middle"
          />
        </div>
      </Form>
    </div>
  );
});

export default Settings;
