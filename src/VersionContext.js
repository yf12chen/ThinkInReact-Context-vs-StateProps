import React, { useState } from 'react';

const MyContext = React.createContext();

const FilterableProductTable = ({ products }) => {
    const [filterText, setfilterText] = useState('');
    const [inStockOnly, setinStockOnly] = useState(false);


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         filterText: '',
    //         inStockOnly: false,
    //         onChangeInput: this.onChangeInput,
    //         onChangeCheckBox: this.onChangeCheckBox,
    //     }
    // }

    const value = {
        filterText,
        inStockOnly,
        onChangeInput: (i) => setfilterText(i),
        onChangeCheckBox: (i) => setinStockOnly(i),
        products,
    }

    return (
        <MyContext.Provider value={value}>
            <SearchBar />
            <ProductTable />
        </MyContext.Provider>
    );

}

const ProductTable = () => {

    const { products } = React.useContext(MyContext);

    const productCategories = [];

    for (let i of products) {
        !productCategories.includes(i.category) && productCategories.push(i.category)
    }
    return (
        <React.Fragment>
            <div className="row" style={{ marginBottom: '30px', textAlign: 'center', fontSize: '20px' }}>
                <div className='col-md-3'>Item</div>
                <div className='col-md-1'>Price</div>
            </div>
            <ul className="list-group" >
                {productCategories.map((i) => (
                    <div>
                        <span className="text-primary">{i}</span>
                        <ProductRow category={i} />
                    </div>
                ))}
            </ul>
        </React.Fragment>
    );

}

const SearchBar = () => {

    const { filterText, inStockOnly, onChangeInput, onChangeCheckBox } = React.useContext(MyContext);

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={(e) => onChangeInput(e.target.value)}
            />
            <p>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onChangeCheckBox(e.target.checked)} />
                {' '}
                Only show products in stock
                </p>
        </form>
    );

}

const ProductRow = ({ category }) => {
    const { filterText, inStockOnly, products } = React.useContext(MyContext);



    const stockStyle = (product) => {
        return !product.stocked && 'red'
    }
    const showItem = (product) => {
        let show = true;
        if (inStockOnly && !product.stocked) {
            show = false;
        }
        if (filterText && !product.name.toUpperCase().includes(filterText.toUpperCase())) {
            show = false;
        }
        return show;
    }

    return (
        <React.Fragment>
            <ul className="list-group">
                {products.map((i) => (
                    i.category === category && showItem(i) && (

                        <div className='row'>
                            <div className='col-md-3'>
                                <li key={i.name} class="list-group-item" style={{ color: stockStyle(i) }}>{i.name}</li>
                            </div>

                            <div className='col-md-1'>
                                <li key={i.name} class="list-group-item">{i.price}</li>
                            </div>
                        </div>

                    )
                ))}
            </ul>
        </React.Fragment>
    );

}

export default FilterableProductTable;