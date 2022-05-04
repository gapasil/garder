import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import ContentLoader from 'react-content-loader';
import MediaQuery from 'react-responsive/src/Component';
import { HashLink } from 'react-router-hash-link';

import { ProductCard } from '../../../components';
import Spinner from '../../../components/Spinner';
import store from '../../../stores';
import { Classes } from '../../../utils';

import styles from './ProductsList.module.scss';

const TemplateCard = props => {
  return (
    <ContentLoader viewBox="0 0 260 160" height={350} width={180} {...props}>
      <circle cx="50" cy="30" r="30" />
      <rect x="10" y="70" rx="3" ry="3" width="40" height="10" />
      <rect x="60" y="70" rx="3" ry="3" width="70" height="10" />
      <rect x="140" y="70" rx="3" ry="3" width="20" height="10" />
      <rect x="10" y="90" rx="3" ry="3" width="90" height="10" />
      <rect x="110" y="90" rx="3" ry="3" width="70" height="10" />
      <rect x="10" y="110" rx="3" ry="3" width="70" height="10" />
      <rect x="90" y="110" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
  );
};
let template = [];
for (let i = 0; i < 20; i++) {
  template.push(i);
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const ProductsList = observer(
  ({
    list = [],
    countOfProducts,
    countOfPages = 0,
    currentPage = 1,
    pageNeighbours = 1,
    onPageChanged,
    description = '',
  }) => {
    pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    useEffect(() => {
      gotoPage(1);
    }, []);
    const gotoPage = page => {
      const currentPage = Math.max(0, Math.min(page, countOfPages));
      onPageChanged(currentPage);
    };

    const handleClick = page => e => {
      e.preventDefault();
      gotoPage(page);
    };

    const handleMoveLeft = e => {
      e.preventDefault();
      gotoPage(currentPage - 1);
    };

    const handleMoveRight = e => {
      e.preventDefault();
      gotoPage(currentPage + 1);
    };

    const fetchPageNumbers = () => {
      const totalPages = countOfPages;
      const page = currentPage;
      /**
       * totalNumbers: the total page numbers to show on the control
       * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
       */
      const totalNumbers = pageNeighbours * 2 + 3;
      const totalBlocks = totalNumbers + 4;

      if (totalPages > totalBlocks) {
        const startPage = Math.max(2, page - pageNeighbours);
        const endPage = Math.min(totalPages - 1, page + pageNeighbours);
        let pages = range(startPage, endPage);

        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
          // handle: (1) < {5 6} [7] {8 9} (10)
          case hasLeftSpill && !hasRightSpill: {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            pages = [
              // LEFT_PAGE,
              ...extraPages,
              ...pages,
            ];
            break;
          }

          // handle: (1) {2 3} [4] {5 6} > (10)
          case !hasLeftSpill && hasRightSpill: {
            const extraPages = range(endPage + 1, endPage + spillOffset);
            pages = [
              ...pages,
              ...extraPages,
              // RIGHT_PAGE
            ];
            break;
          }

          // handle: (1) < {4 5} [6] {7 8} > (10)
          case hasLeftSpill && hasRightSpill:
          default: {
            pages = [
              // LEFT_PAGE,
              ...pages,
              // RIGHT_PAGE
            ];
            break;
          }
        }

        return [1, ...pages, totalPages];
      }

      return range(1, totalPages);
    };

    const pages = fetchPageNumbers();

    if (countOfProducts === 0) return <p>Список пуст</p>;
    if (store.loading) return <Spinner />;
    return (
      <>
        <div className={Classes.join(['flex wrap j-around', styles.list])}>
          {list
            ? list.map((item, idx) => <ProductCard key={idx} item={item} />)
            : template.map(item => <TemplateCard key={item} />)}

          {!countOfProducts || countOfPages === 1 ? (
            ''
          ) : (
            <div
              className={Classes.join([
                styles.pagination,
                'flex j-between a-center t_sub',
              ])}
            >
              <MediaQuery minWidth={480}>
                <HashLink
                  to="#top"
                  onClick={handleMoveLeft}
                  className={Classes.join([
                    styles.arrow,
                    styles.prev,
                    'flex a-center',
                  ])}
                >
                  Назад
                </HashLink>
              </MediaQuery>

              <div className={styles.pages}>
                {pages.map((page, index) => {
                  return (
                    <HashLink
                      onClick={handleClick(page)}
                      key={index}
                      className={currentPage === page ? styles.active : ''}
                      to="#top"
                    >
                      {page}
                    </HashLink>
                  );
                })}
              </div>

              <MediaQuery minWidth={480}>
                <HashLink
                  to="#top"
                  onClick={handleMoveRight}
                  className={Classes.join([
                    styles.arrow,
                    styles.next,
                    't_ flex a-center',
                  ])}
                >
                  Вперёд
                </HashLink>
              </MediaQuery>
            </div>
          )}
        </div>
        <div
          className="mt-4 p-2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </>
    );
  },
);

export default ProductsList;
