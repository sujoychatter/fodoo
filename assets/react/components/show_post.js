import React, { Component, PropTypes } from 'react';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';

export default class ShowPost extends Component {
	constructor(props, context){
		super(props, context);
		this.context = context
	}
	createContent(html_string){
		return {__html: html_string}
	}
	show_user(id){
		this.context.router.transitionTo('/profile/' + id);
	}
	render () {
		return (
			<div className="show-post container" itemScope itemType="http://schema.org/BlogPosting">
				<div className="wrapper">
					<div className="title" itemProp="name headline">
						{this.props.posts[0].title}
					</div>
					<div className="user-details" itemScope itemType="http://schema.org/Person" onClick={this.show_user.bind(this, this.props.posts[0].user_id)}>
						<img itemProp="image" className="user-image" src={this.props.posts[0].user_photo}/>
						<span className="user-name" itemProp="name">
							{this.props.posts[0].user_name}
						</span>
					</div>
					<div itemProp="articleBody" className="content" dangerouslySetInnerHTML={this.createContent(this.props.posts[0].content)}>
					</div>
				</div>
			</div>
		)
	}
}

ShowPost.contextTypes = {
  router: React.PropTypes.func.isRequired
};