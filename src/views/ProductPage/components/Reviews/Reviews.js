import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Line, Modal } from "../../../../components";
import Rating from "react-rating";
import FlatList, { PlainList } from 'flatlist-react'

import { Classes } from "../../../../utils";
import API from "../../../../services/api";
import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import { observer } from "mobx-react";
import { HashLink } from "react-router-hash-link";
import styles from './Reviews.module.scss'


import empty from './assets/svg/empty_star.svg'
import full from './assets/svg/full_star.svg'
import placeholder from './assets/svg/placeholder_star.svg'
import like from './assets/svg/like.svg'
import arrow from './assets/svg/arrow.svg';
import { Controller, useForm } from "react-hook-form";

class FeedbackStore {
    constructor(props) {
        makeObservable(this, {
            _feedbacks: observable,
            pages: observable,
            feedbacks: computed,
            _getFeedbacks: action,
        })
    }

    _feedbacks = [];
    pages = 1;
    currentPage = 1;

    get feedbacks() {
        return this._feedbacks;
    }


    _getFeedbacks = async (itemId, page = 1, clear = false) => {
        const {data} = await API.get(`/feedbacks/${ itemId }`, {
            params: {
                page
            }
        });
        // feedbackStore.setFeedbacks({ ...feedbacks });
        // setPages(countOfPages);
        // setCurrentPage(currentPage);
        runInAction(() => {
            this._feedbacks = [...data.feedbacks];
            this.pages = data.countOfPages;
            this.currentPage = data.currentPage;
        })
    }
}

const feedbackStore = new FeedbackStore();

const Reviews = observer(({itemId, average, count, isFeedbackButtonEnabled = false}) => {
    const limit = 5;
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [remainder, setRemainder] = useState(count < 5 ? count - limit : 0);


    useEffect(() => {
        feedbackStore._getFeedbacks(itemId);
    }, [itemId]);

    const loadFeedback = () => {
        feedbackStore._getFeedbacks(itemId, feedbackStore.currentPage + 1);
    }

    const clearFeedback = () => {
        feedbackStore._getFeedbacks(itemId, 1, true);
    }
    return (
        <div className={ styles.reviews }>
            <h2 className='mb-5'>Отзывы { count }</h2>
            <div className="flex wrap">
                <div className={ styles.count }>
                    <div className="flex a-center mb-2">
                        <span className='t_h3 mr-1'>{ average }</span>
                        <Rating
                            readonly={ true }
                            placeholderRating={ average }
                            emptySymbol={ <img src={ empty } className={ styles.reviewIcon }/> }
                            placeholderSymbol={ <img src={ placeholder } className={ styles.reviewIcon }/> }
                            fullSymbol={ <img src={ placeholder } className={ styles.reviewIcon }/> }
                        />
                    </div>

                    <Modal
                        width='100%'
                        maxWidth='672px'
                        header='Написать отзыв'
                        trigger={ <Button disabled={ !isFeedbackButtonEnabled } text='Написать отзыв'/> }
                    >
                        <ReviewWrite itemId={ itemId }/>
                    </Modal>
                </div>
                <div className={ styles.list }>
                    { feedbackStore.feedbacks &&
                    // feedbacks.firstPage.map((item, idx) => <ReviewItem item={ item } key={ idx }/>)
                    <FlatList
                        renderWhenEmpty={ () => (<p>У этого товара нет отзывов! Стань первым кто оставит отзыв!</p>) }
                        list={ feedbackStore.feedbacks }
                        renderItem={ (item, idx) => <ReviewItem item={ item } key={ idx }/> }
                        renderOnScroll
                    />
                    }
                    { feedbackStore.currentPage !== feedbackStore.pages &&
                    <div className="flex j-center">
                        { feedbackStore.feedbacks.length > 0 &&
                        <img onClick={ loadFeedback } className={ styles.loadIcon } src={ arrow } alt="arrow"/> }
                    </div>
                    }
                    { feedbackStore.currentPage === feedbackStore.pages &&
                    <div className={ Classes.join(["flex j-center", styles.clear]) }>
                        <HashLink to='#top' onClick={ clearFeedback }>Скрыть отзывы</HashLink>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
});

const ReviewItem = observer(({item = {}}) => (
    <div className='flex wrap mb-35'>
        <div className={ styles.ratingStars }>
            <Rating readonly={ true }
                    placeholderRating={ item?.rating }
                    emptySymbol={ <img src={ empty } className={ styles.reviewIcon }/> }
                    placeholderSymbol={ <img src={ placeholder } className={ styles.reviewIcon }/> }
                    fullSymbol={ <img src={ full } className={ styles.reviewIcon }/> }
            />
        </div>
        <div className={ Classes.join([styles.content, 'ml-25']) }>
            <div className="info">
                <p className='mb-05 t_sub'>{ item?.userName }</p>
                <p className="date mb-15 t_sub c_gray">{ item?.date }</p>
                <p className="text mb-15 t_body">{ item?.content }</p>
                <Line/>
                { item.answer && <p className="text mb-15 mt-15 t_body"> Ответ магазина: { item?.answer }</p> }

                <span className='flex a-center t_body c_gray'>
                    <img src={ like } alt="like"/>
                    Полезный отзыв
                </span>
            </div>
        </div>

    </div>
));

const ReviewWrite = ({itemId}) => {
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm();
    const [stars, setStars] = useState(5);
    const changeStars = (i) => {
        setStars(i);
    }
    const addReview = async (form) => {
        const body = {productId: itemId, rating: stars, ...form};
        await API.post('feedbacks/new', toJS(body));
        window.location.reload();
        reset(form);
        setStars(0);
    }
    return (
        <div className={ styles.ratingPopup }>
            <div className={ styles.rating }>
                <span className='t_body'>Поставьте оценку</span>
                <Rating
                    onChange={ changeStars }
                    // placeholderRating={ 4 }
                    emptySymbol={ <img src={ empty } className={ styles.reviewIcon } alt='star'/> }
                    placeholderSymbol={ <img src={ empty } className={ styles.reviewIcon } alt='star'/> }
                    fullSymbol={ <img src={ placeholder } className={ styles.reviewIcon } alt='star'/> }
                />
            </div>
            <Form>
                <Controller
                    name="textContent"
                    isClearable
                    control={ control }
                    rules={ {required: true} }
                    render={ ({field}) => (
                        <textarea  { ...field }
                                   placeholder='Напишите ваши впечатления о товаре'>
                        </textarea>
                    ) }
                />
                { errors.textContent && <p className={ styles.error }>Это поле необходимо заполнить</p> }
                <div className={ styles.input }>
                    <span>Ваше имя</span>
                    <Input invalid={ errors.name && true }
                           { ...register('name', {required: true}) }/>
                </div>
                { errors.name && <p className={ styles.error }>Это поле необходимо заполнить</p> }
            </Form>

            <div className={ styles.line }>
            </div>
            <Button onClick={ handleSubmit(addReview) } text='Отправить'/>
        </div>
    )
}

export default Reviews;