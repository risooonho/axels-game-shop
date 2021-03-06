import React from 'react';
import CartItem from './cartItem'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ShoppingCart extends React.Component {

	displayItems = ()=> {
	return	this.props.shoppingCart.map((item) =>{
			return <CartItem key={item.id} item={item} />
		});
	}
	render(){
		return (
		 <main role="main" className="shoppingCart container">
			<table id="cart" className="table table-hover table-condensed">
    				<thead>
						<tr>
							<th style={{width: 60 + "%"}}>Product</th>
							<th style={{width: 10 + "%"}}>Price</th>
							<th style={{width:  8 + "%"}}>Quantity</th>
							<th style={{width: 12 + "%"}} className="text-center">Subtotal</th>
							<th style={{width: 10 +"%"}}></th>
						</tr>
					</thead>
					<tbody>
						{this.props.shoppingCart.length === 0 ? <tr><td style={{paddingTop:15 + "px" }}>Your shopping cart is currently empty.</td></tr>: this.displayItems()}

					</tbody>
					<tfoot>

						<tr>
							<td><Link to="/shop-games" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
							<td colSpan="2" className="hidden-sm-up"></td>
							<td className="hidden-sm-up text-center">
								<strong>
									Total ${this.props.cartAmount}
								</strong>
							</td>
							<td>{this.props.shoppingCart.length !== 0 ? <Link to="/checkout" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link> : null }
</td>
						</tr>
					</tfoot>
				</table>
				</main>
			);
	}
}


const mapStateToProps = (state) => {
			return {
				cartAmount: state.cartAmount,
				shoppingCart: state.shoppingCart
			}
}


export default connect(mapStateToProps)(ShoppingCart);
