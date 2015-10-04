var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var DropDown = require('./common/drop_down');

module.exports = React.createClass({
	getInitialState: function () {
		var data = {};
		if (this.props.user) {
			data = {user: this.props.user};
		}
		else if (ExecutionEnvironment.canUseDOM) {
			if ((typeof fodoo_data != "undefined") && fodoo_data && fodoo_data.user) {
				data = {user: fodoo_data.user};
			}
		}
		return data;
	},
	render: function () {
		if (this.state.user) {
			var userData = {
					userName: this.state.user.name,
					imageURL: this.state.user.photo,
					admin: this.state.user.admin
				},
				divStyle = {backgroundImage: 'url(' + this.state.user.photo + ')'},
				image = <div className="user-image" style={divStyle}></div>;
		}
		else {
			var login = <a className="login-button" href="/auth/facebook">Login</a>
		}
		var options = [{name: "New Post", action: '/new_post'}, {name: "Logout", action: '/logout'}]
		return (
			<div className="header">
				<img src="/images/logo.png" type="image/png"></img>
				<span className="site-details">
					<span className="site-name" itemProp="name">Fodoo</span>
					<span className="site-about" itemProp="description">Blog for engineers</span>
				</span>
				<span className="pull-right right-elements">
					{image}
					{login}
					<DropDown options={options}/>
				</span>
			</div>
		)
	}
});