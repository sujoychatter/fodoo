var Article = require(_dir.DIR_MODELS + '/article'); 
module.exports = {
	updatePost: function(req, res, next){
		var post = req.body;
		var admin = req.user.admin;
		return Article.update(req.params.id, post, req.user.id, admin).then(
			function(articles){
				return res.status(200).send({posts: articles});
			}
		);
	},
	createPost: function(req, res, next){
		return Article.create({user: req.user, active: true, view_count: 0}).then(function(id){
			return res.status(201).send({id: id[0]});
		});
	},

	getPosts: function(req, res, next){
		var query = req.query || {}
		query.approved = true;
		return Article.all(query).then(function(posts){
			res.status(200).send({posts: posts});
		})
	},
	
	getPostsByName: function(req, res, next){
		var filter = {active: true, url : req.query.name, published : true, approved  : true}
		Article.all(filter).then(function(articles){
			return res.status(200).send({posts: articles});
		})
	},
	getPost: function(req, res, next){
		return Article.all().where({"articles.id": req.params.id}).then(function(posts){
			return res.status(200).send({posts: posts});
		})
	},
	getMyPosts: function(req, res,next){
		var filter = {user_id: req.user.id}
		if(req.user.admin === true){
			filter = {}
		}
		return Article.all(filter).then(function(posts){
			return res.status(200).send({posts: posts});
		})
	},
	postViews: function(req, res, next){
		
            
	}
}