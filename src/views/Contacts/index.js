import React from 'react';

import MetaTags from 'react-meta-tags';

import { Container } from '../../components';

const getMeta = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Контакты',
      },
    ],
  };
};

const Contacts = () => {
  return (
    <Container>
      <MetaTags>
        <title>Контакты | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
      </MetaTags>
      <h1>Контакты</h1>
      <p>
        {/* <p className='mt-1 mb-1'><strong></strong></p> */}
        ТОО ИМПЦВЕТ <br />
        БИН 200540006226 <br />
        КБе 17 <br />
        Номер счета: <br />
        KZ919470398928334859 (KZT) <br />
        В АО ДБ «Альфа-Банк» <br />
        БИК: ALFAKZKA <br />
        Юридический и Фактический адрес: г.Нур-Султан, р-н. <br />
        Сарыарка, пр.Республика, д.58 <br />
        Телефон для связи - +7 (747) 311-17-06
      </p>
    </Container>
  );
};

export default Contacts;
