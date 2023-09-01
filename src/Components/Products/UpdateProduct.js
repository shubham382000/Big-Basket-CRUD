import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

let UpdateProduct = () => {

    let productId = useParams().id;
    let history = useNavigate();
    let redirectToAdmin = () => {
        history('/products/admin');
    }
    let [selectedProduct, setselectedproduct] = useState({
        name: '',
        image: '',
        price: '',
        qty: '',
        info: ''
    });
    let [submitted, setsubmitted] = useState(false);

    let submitProduct = (e) => {
        e.preventDefault();
        let dataURL = `http://127.0.0.1:5000/api/products/${productId}`
        Axios.put(dataURL, selectedProduct).then((response) => {
            setsubmitted(true)
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        let dataURL = `http://127.0.0.1:5000/api/products/${productId}`
        Axios.get(dataURL).then((response) => {
            setselectedproduct(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [productId])

    let updateImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
        setselectedproduct({
            ...selectedProduct,
            image: base64Image
        });
    }

    let convertBase64String = (imageFile) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if (fileReader.result) {
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Ocurred');
                }
            });
        });
    };

    let updateInput = (event) => {
        setselectedproduct({
            ...selectedProduct,
            [event.target.name]: event.target.value
        });
    }

    return (
        <React.Fragment>
            {/* <h1>UpdateProduct</h1> */}
            {
                submitted ? redirectToAdmin() :
                    <React.Fragment>
                        <section className="p3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3 text-success mt-4">Update Product</p>
                                        <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae, repellendus provident est voluptates quaerat saepe ipsam, facilis aut doloribus voluptatem debitis? Eum quae earum quia sint hic sapiente ducimus?</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="container animated fadeIn">
                                <div className="row">
                                    <div className="col-md-4">
                                        {/* <pre>{JSON.stringify(selectedProduct)}</pre> */}
                                        <div className="card">
                                            <div className="card-header bg-success text-white">
                                                <p className="h4">Update Product</p>
                                            </div>
                                            <div className="card-body bg-dark">
                                                <form onSubmit={submitProduct}>
                                                    <div className="form-group">
                                                        <input
                                                            name="name"
                                                            value={selectedProduct.name}
                                                            onChange={updateInput}
                                                             type="text" className='form-control' placeholder='Product Name' />
                                                    </div>
                                                    <div class="form-group mt-3">
                                                        <div class="custom-file">
                                                            <input
                                                                onChange={updateImage}
                                                                 type="file" className="custom-file-input" id='customFile'
                                                            />
                                                            <label className="custom-file-label" htmlFor='customFile'>
                                                                {
                                                                    selectedProduct.image !== '' ?
                                                                        <img src={selectedProduct.image} width='45' height='45' alt='/' /> :
                                                                        <span>Product Image</span>

                                                                }
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            name="price"
                                                            value={selectedProduct.price}
                                                            onChange={updateInput}
                                                            type="number" className='form-control' placeholder='Price' />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            name="qty"
                                                            value={selectedProduct.qty}
                                                            onChange={updateInput}
                                                             type="number" className='form-control' placeholder=' Avaialble Qty' />
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea
                                                            name="info"
                                                            value={selectedProduct.info}
                                                            onChange={updateInput}
                                                            className='form-control' rows="04" placeholder='Product Info' />
                                                    </div>
                                                    <div>
                                                        <input type="submit" className='btn btn-success btn-sm' placeholder='Product Name' value='Update' />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }


        </React.Fragment>
    );
}
export default UpdateProduct; 