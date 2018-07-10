import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from './components/SearchBar';
import {connect} from 'react-redux';

class Navbar extends React.Component {

state = {
	loggedOut: this.props.loggedIn
}


 totalCartItems = () => {
		let totalCartItems = 0;
				 this.props.shoppingCart.map((item) => {
							return totalCartItems+=item.quantity;
									});
					return totalCartItems;

	}

 logOut = (e) => {
	e.preventDefault();
	localStorage.removeItem('token')
	localStorage.removeItem('id');
	this.props.history.push('/');
	this.setState({
		loggedOut:true
	})
}

render(){
	console.log(this.props);

	return (
		 <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
			<NavLink to="/" className="navbar-brand">Axel's Game Shop</NavLink>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul className="navbar-nav mr-auto">


						{localStorage.getItem("token") ?
								<React.Fragment>

								<li className="nav-item">
									<NavLink  to="/register-game-form"  className="nav-link">Add Game</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/inventory" className="nav-link">Inventory</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/orders"  className="nav-link">Orders</NavLink>
								</li>
								<li className="nav-item">
									<NavLink onClick={this.logOut} to="/"  className="nav-link">Logout</NavLink>
								</li>
							</React.Fragment>
							:
								<React.Fragment>
									<li className="nav-item">
										<NavLink to="/login" className="nav-link">Login</NavLink>
									</li>
								<li className="nav-item">
									<NavLink to="/shop-games" className="nav-link">Shop Games</NavLink>
								</li>
								<li>
								 <NavLink  to="/shopping-cart" className="btn btn-primary">
						 <i className="fas fa-shopping-cart"></i> {this.totalCartItems()}
						</NavLink>
							</li>

						</React.Fragment>
						 }


				</ul>
				<SearchBar query={this.props.query} handleSearch={this.props.handleSearch} shoppingCart={this.props.shoppingCart} />

		</div>

		</nav>
		)
}


};


const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart,
		gameFormClicked: state.gameFormClicked,
		cartClicked: state.cartClicked,
		loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
			displayForm: () => {
				dispatch({type: "DISPLAY_FORM"});
			},
			displayCart: () => {
				dispatch({type: "DISPLAY_CART"});
			}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
