import React from 'react'

const API = 'http://127.0.0.1:3333'

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {},
            isLoaded: false,
            error: null
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3333/products')
            .then(response => response.json())
            .then(
                (data) => {
                    console.log(data)
                    this.setState({
                        products: data,
                        isLoaded: true
                    })
                },
                (error) =>{
                    this.setState({
                        error: error,
                        isLoaded:true
                    })
                }

            );
    }

    componentWillMount() {

    }

    render() {
        const { error, isLoaded, products } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <h1>Products</h1>
                    <ul>
                        {products.map(product => (
                            <li key={product.uuid}>
                                {product.name} {product.price}
                            </li>
                        ))}
                    </ul>
                </React.Fragment>
            )
        }
    }

}

export default Products