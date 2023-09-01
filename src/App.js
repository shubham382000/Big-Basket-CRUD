import React from 'react';
import './App.css'; 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar'; 
import Home from './Components/Home/Home';
import CreateProduct from './Components/Products/CreateProduct';
import ProductAdmin from './Components/Products/ProductAdmin';
import ProductList from './Components/Products/ProductList';
import UpdateProduct from './Components/Products/UpdateProduct';

let App = () => {

        return(
                <React.Fragment>
                    
                  <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path = "/" Component={Home} />
                        <Route exact path = "/products/list" Component={ProductList}/>
                        <Route exact path = "/products/admin" Component={ProductAdmin} />
                        <Route exact path = "/products/create" Component={CreateProduct} />
                        <Route exact path = "/products/:id" Component={UpdateProduct}/>
                    </Routes>
                  </Router>

            </React.Fragment>
        );  
    }
export default App; 