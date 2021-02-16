import { Catagory, Product, Checkout } from '../config/types';

import { saveToFile,readFile } from '../utilities/index';

const getProducts = (): Product[]=>{
    return <Product[]>readFile('source/data/product.json');
}
const getCategories = (): Catagory[]=>{
    return <Catagory[]>readFile('source/data/category.json');
}
const getCheckouts = (): Checkout[]=>{
    return <Checkout[]>readFile('source/data/checkout.json');
}

const getProduct = (productId: string): Product=>{
    const products: Product[] = getProducts();
    const memebr: Product = products.find((product) => product?.id == (productId));
    return memebr;
}

const getCategorie = (categorieId: string): Catagory=>{
    const catagories: Catagory[] = getCategories();
    const memebr: Catagory = catagories.find((catagory) => catagory?.id == (categorieId));
    return memebr;
}

const getCheckout = (productId: string): Checkout=>{
    const checkouts: Checkout[] = getCheckouts();
    const memebr: Checkout = checkouts.find((checkout) => checkout?.id == (productId));
    return memebr;
}

const addProduct = (product: Product)=>{
    const products: Product[] = getProducts();
    products.push(product);
    saveToFile(products, 'source/data/product.json');
}

const addCatagory = (catagory: Catagory)=>{
    const categories: Catagory[] = getCategories();
    categories.push(catagory);
    saveToFile(categories, 'source/data/category.json');
}

const addCheckout = (checkout: Checkout)=>{
    const checkouts: Checkout[] = getCheckouts();
    checkouts.push(checkout);
    saveToFile(checkouts, 'source/data/checkout.json');
}

const deleteProduct = (productId: string)=>{
    let products: Product[] = getProducts();
    const found = products.some((member) => member?.id == productId);
    if(found){
        products = products.filter((member) => member?.id !== String(productId));
        saveToFile(products, 'source/data/product.json');
        return true;
    }else{
        return false;
    }
    
}

const deleteCategory = (catagoryId: string)=>{
    
    let catagories: Catagory[] = getCategories();
    const found = catagories.some((member) => member?.id == catagoryId);
    if(found){
        catagories = catagories.filter((member) => member?.id !== String(catagoryId));
        saveToFile(catagories, 'source/data/category.json');
        return true
    }
    else{
        return false
    }
    
}

const updateProduct = (productId: string, newProductInfo: Product)=>{
    let products: Product[] = getProducts();

    const productIndex = products.findIndex(product=> product?.id === (productId) );
    const productToUpdate = products[productIndex];
    if(productToUpdate){
        const updatedMemeber = {...productToUpdate, ...newProductInfo}
        const updatedProducts = products.slice();
        updatedProducts.splice(productIndex,1,updatedMemeber)
        saveToFile(updatedProducts, 'source/data/product.json');
        return true;
    }else{
        return false;
    }

}

const updateCategory = (categoryId: string, newCategoryInfo: Catagory)=>{
    let categories: Catagory[] = getCategories();
    
    const categoryIndex = categories.findIndex(category=> category?.id === (categoryId) );
    const categoryToUpdate = categories[categoryIndex];
    if(categoryToUpdate){
        const updatedMemeber = {...categoryToUpdate, ...newCategoryInfo}
        const updatedcategories = categories.slice();
        updatedcategories.splice(categoryIndex,1,updatedMemeber);
        saveToFile(updatedcategories, 'source/data/category.json');
        return true
    }else{
        return false;
    }
    
    

}

const modelsController = {
    getProducts,getCategories,getCheckouts,getProduct,getCategorie,getCheckout,addProduct,
    addCatagory,addCheckout,deleteProduct,deleteCategory,updateProduct,updateCategory
}

export default modelsController;


