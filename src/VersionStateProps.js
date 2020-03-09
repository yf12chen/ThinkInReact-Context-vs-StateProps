import React from 'react';


class ProductRow extends React.Component {
    render() {
        const { products, category, inStockOnly, filterText } = this.props

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
}

class ProductTable extends React.Component {

    render() {
        const { products, inStockOnly, filterText } = this.props
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
                            <ProductRow category={i} filterText={filterText} inStockOnly={inStockOnly} products={products} />
                        </div>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

class SearchBar extends React.Component {

    onChangeInput = (event) => {
        this.props.onChangeInput(event.target.value)
    }

    onChangeCheckBox = (event) => {
        this.props.onChangeCheckBox(event.target.checked)
    }

    render() {
        const { inStockOnly, filterText } = this.props

        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={this.onChangeInput}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={this.onChangeCheckBox} />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
    }

    onChangeInput = (value) => {
        this.setState({
            filterText: value
        })
    }

    onChangeCheckBox = (value) => {
        this.setState({
            inStockOnly: value
        })
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onChangeInput={this.onChangeInput} onChangeCheckBox={this.onChangeCheckBox} />
                <ProductTable filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} products={this.props.products} />
            </div>
        );
    }
}

export default FilterableProductTable;