import React from 'react'
import ProductRight from '../../components/ProductPage/ProductRight/ProductRight';
import ProductsLeft from '../../components/ProductPage/ProductsLeft/ProductsLeft';

import classes from "./Product.module.css" 


function Products() {
    return (
    <div className={classes.ProductPageContainer}>
        <div className={classes.ProductWrapper}>
         <ProductsLeft/> 
         <ProductRight/>
        </div>
    </div>
    )
}


export default Products ; 