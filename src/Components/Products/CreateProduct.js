import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

let CreateProduct = () => {

    let history = useNavigate();

    let redirectToAdmin = () => {
        history('/products/admin');
    }

    let [product, setproduct] = useState({
        name: '',
        image: '',
        price: '',
        qty: '',
        info: ''
    });

    let [isSubmitted, setsubmitted] = useState(false);


    let updateInput = (event) => {
        setproduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    let submitProduct = (e) => {
        e.preventDefault();
        let dataURL = 'http://127.0.0.1:5000/api/products'
        Axios.post(dataURL, product).then((response) => {
            setsubmitted(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    let updateImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
        setproduct({
            ...product,
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

    return (
        <React.Fragment>

            {
                isSubmitted ? redirectToAdmin() :
                    <React.Fragment>

                        {/* <pre>{JSON.stringify(product)}</pre> */}
                        <div className="container mt-4 animated fadeIn">
                            <div className="row">
                                <div className="col">
                                    <p className="h3 text-success">Create Product</p>
                                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laudantium illum doloribus, molestias nobis voluptas maiores, non quae assumenda sed ratione, eaque earum!</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header bg-success text-white">
                                            <p className="h4">Create New</p>
                                        </div>
                                        <div className="card-body bg-dark">
                                            <form onSubmit={submitProduct}>
                                                <div className="form-group">
                                                    <input
                                                        name="name"
                                                        value={product.name}
                                                        onChange={updateInput}
                                                        required type="text" className='form-control' placeholder='Product Name' />
                                                </div>
                                                <div class="form-group mt-3">
                                                    <div class="custom-file">
                                                        <input
                                                            onChange={updateImage}
                                                            required type="file" className="custom-file-input" id='customFile'
                                                        />
                                                        <label className="custom-file-label" htmlFor='customFile'>
                                                            {
                                                                product.image !== '' ?
                                                                    <img src={product.image} width='45' height='45' alt='/' /> :
                                                                    <span>Product Image</span>

                                                            }
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="price"
                                                        value={product.price}
                                                        onChange={updateInput}
                                                        required type="number" className='form-control' placeholder='Price' />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        name="qty"
                                                        value={product.qty}
                                                        onChange={updateInput}
                                                        required type="number" className='form-control' placeholder=' Avaialble Qty' />
                                                </div>
                                                <div className="form-group">
                                                    <textarea
                                                        name="info"
                                                        value={product.info}
                                                        onChange={updateInput}
                                                        required className='form-control' rows="04" placeholder='Product Info' />
                                                </div>
                                                <div>
                                                    <input type="submit" className='btn btn-success btn-sm' placeholder='Product Name' value='Create' />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </React.Fragment>

            }
            <div style={{ marginBottom: '150px' }} />
        </React.Fragment>
    );
}
export default CreateProduct; 