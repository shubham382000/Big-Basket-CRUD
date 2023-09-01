import React, { useEffect, useState } from 'react'; 
import Axios from 'axios';

let ProductList = () => {

    let [products, setproducts] = useState([]); 

    useEffect( () => {
        let dataURL = 'http://127.0.0.1:5000/api/products'; 
        Axios.get(dataURL).then( (response) => {
              setproducts(response.data)
        }).catch( (error) => {
             console.log(error); 
        })
    })

        return (
            <React.Fragment>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Product List</p>
                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, nostrum?</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            products.length > 0 ? 
                            <React.Fragment>
                               {
                                products.map((product) => {
                                   return(
                                    <div className="col-md-3 mb-3">
                                    <div className="card animated fadeIn">
                                    <div className="card-header text-center bg-success">
                                     <img src={product.image} alt="" width="150" height="150"/>
                                    </div>
                                    <div className="card-body">
                                        <ul className='list-group'>
                                            <li className=' list-group-item'>
                                                NAME : {product.name}
                                            </li>
                                             <li className=' list-group-item'>
                                                PRICE : &#8377; {product.price.toFixed(2)}
                                            </li>
                                             <li className=' list-group-item'>
                                                QTY : {product.qty} kgs
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                   )
                                })
                               }
                            </React.Fragment> : <React.Fragment>
                                <div className='text-center'>
                                   <p className='text-danger fw-bold'>------------------No Products Found------------------</p>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
export default ProductList; 