import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

let ProductAdmin = () => {

    let [products, setproducts] = useState([]);

    useEffect(() => {
       getallproducts(); 
    }, []);

    let deleteProduct = (productID) => {
       let dataURL = `http://127.0.0.1:5000/api/products/${productID}`
       Axios.delete(dataURL).then((response) => {
              getallproducts(); 
       }).catch( (error) => {
          console.log(error); 
       }); 
    }

    let getallproducts = () => {
        let dataURL = 'http://127.0.0.1:5000/api/products';
        Axios.get(dataURL).then((response) => {
            setproducts(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row animated fadeIn ">
                    <div className="col">
                        <p className="h3 text-success">Product Admin</p>
                        <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis expedita nisi minus vero iste nesciunt cum ea laudantium libero, officiis ipsum reiciendis!</p>
                        <Link to='/products/create' className='btn btn-success btn-sm'>Create New</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <table className='table table-hover text-center table-success table-striped animated fadeIn'>
                            <thead className=' bg-dark text-white'>
                                <tr>
                                    <th className='fw-bold'>S.NO</th>
                                    <th className='fw-bold'>Product</th>
                                    <th className='fw-bold'>Name</th>
                                    <th className='fw-bold'>Price</th>
                                    <th className='fw-bold'>Qty</th>
                                    <th className='fw-bold'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* /* <pre>{JSON.stringify(this.state.products)}</pre> */}
                                {
                                    products.length > 0 ?
                                        <React.Fragment>
                                            {
                                                products.map((product) => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td>{product._id.substr(product._id.length - 5)}</td>
                                                            <td>
                                                                <img src={product.image} alt="" width='50' height='50' />
                                                            </td>
                                                            <td>{product.name}</td>
                                                            <td>&#8377;{product.price.toFixed(2)}</td>
                                                            <td>{product.qty} kgs</td>
                                                            <td>
                                                                <Link to={`/products/${product._id}`} className='btn btn-success btn-sm'>Update</Link>
                                                                <button onClick={deleteProduct.bind(this, product._id)} className='btn btn-danger btn-sm'>Delete</button> 
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </React.Fragment> : <React.Fragment>
                                            <tr className='bg-danger'>
                                                <td colSpan={6} className='text-danger fw-bold'>-----------------------No Products Found------------------------</td>
                                            </tr>
                                        </React.Fragment>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductAdmin; 