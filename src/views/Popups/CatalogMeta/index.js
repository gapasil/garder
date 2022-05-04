import React from 'react';

import { toJS } from 'mobx';
import { useForm } from 'react-hook-form';

import { Button, Form, Input, Modal } from '../../../components';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const CatalogMeta = ({
  id,
  name = '',
  metaTitle = '',
  metaDescription = '',
  description = '',
}) => {
  const { register, handleSubmit, setValue } = useForm({ mode: 'onTouched' });

  const onPress = async form => {
    try {
      store.toggleLoading(true);
      await API.post('admin/seo/category', toJS(form));
    } catch (error) {
    } finally {
      location.reload();
    }
  };

  return (
    <Modal
      header="Meta-данные"
      open={false}
      width="100%"
      maxWidth="640px"
      trigger={
        <Button
          text="Редактировать"
          style={{ float: 'right', 'margin-top': '17px' }}
        />
      }
    >
      <div className={Classes.join([styles.content, styles.catalog_meta])}>
        <div className={Classes.join([styles.auth, styles.login])}>
          <Form>
            <Input
              {...register('name', {
                maxLength: 255,
                value: name,
              })}
              onInput={(e, v) => setValue(e, v)}
              placeholder="Название"
            />
            <Input
              {...register('metaTitle', {
                maxLength: 255,
                value: metaTitle,
              })}
              onInput={(e, v) => setValue(e, v)}
              placeholder="Заголовок в браузере"
            />
            <Input
              {...register('metaDescription', {
                maxLength: 255,
                value: metaDescription,
              })}
              onInput={(e, v) => setValue(e, v)}
              placeholder="Meta Description"
            />
            <textarea
              name="description"
              {...register('description', {
                value: description,
              })}
              onInput={e => setValue('description', e.target.value)}
              placeholder="Описание на странице (HTML)"
            />

            <input
              type="hidden"
              name="categoryId"
              {...register('categoryId', {
                value: id,
              })}
            />

            <Button
              onClick={handleSubmit(onPress)}
              size="middle"
              text="Сохранить"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CatalogMeta;
