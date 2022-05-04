import React, { useEffect } from 'react';
import { Container, Line } from "../../components";
import Questions from "./components/Questions/Questions";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import store from "../../stores";
import API from "../../services/api";
import MetaTags from "react-meta-tags";

const getMeta = () => {

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "FAQ"
        }]
    }

}

class FaqStore {
    constructor() {
        makeObservable(this, {
            questions: observable,
            getFaq: action,
        });
    }

    questions = [];

    getFaq = async () => {
        try {
            store.toggleLoading(true);
            const {data: {faq: {questions}}} = await API.get('faq', {
                params: {
                    page: 1
                }
            });
            runInAction(() => {
                this.questions = questions;
            })

        } catch {
        } finally {
            store.toggleLoading(false);
        }
    }
}

const faqStore = new FaqStore();

const Faq = () => {
    useEffect(() => {
        faqStore.getFaq();
    }, []);

    return (
        <Container>
            <MetaTags>
                <title>FAQ | Gardershop – одежда и обувь</title>
                <script type="application/ld+json">
                    { JSON.stringify(getMeta()) }
                </script>
            </MetaTags>
            <Questions list={ toJS(faqStore.questions) }/>
            <QuestionForm/>̵
        </Container>
    )
}

export default Faq;
