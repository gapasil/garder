import { action, computed, makeObservable, observable, runInAction } from "mobx";
import productsStore from "./ProductsStore";
import API from "../services/api";

// class ProductStore {
//     constructor() {
//         makeObservable(this,
//             {})
//     }
//
//     product = {}
//     sizes = {}
//     colorway = {}
//     colorHex = []
//     setProduct = () => {
//
//     }
//     setSizes = () => {
//         this.sizes = this.product.selectableParameters &&
//             this.product.selectableParameters.find(item => item.name === 'size');
//     }
//     setColorway = () => {
//         this.colorway = this.product.selectableParameters &&
//             this.product.selectableParameters.find(item => item.name === 'colorway');
//     }
//     setColorsHex = () => {
//         const colorsArr = Object.values(productsStore.colors).filter(item => colorway?.availableValues.indexOf(item.name) > -1);
//         this.colorHex = colorsArr.map(item => item.hex);
//     }
// }

class ProductStore {
    constructor() {
        makeObservable(this, {
            _product : observable,
            product : computed,
            getProduct : action,
            setFavorite : action,
        })
    }

    _product = {}
    get product() {
        return this._product;
    }

    getProduct = async (itemId) => {
        const { data } = await API.get(`/catalog/${ itemId }`);
        runInAction(() => {
            this._product = { ...data }
        })
    }

    setFavorite = (status) => {
        runInAction(() => {
            this._product.product.isFavorite = status;
        })
    }
}

const productStore = new ProductStore();

export default productStore;