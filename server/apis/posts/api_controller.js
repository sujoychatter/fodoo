var Article = require(_dir.DIR_MODELS + '/article'); 
var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	updatePost: function(req, res, next){
		post = req.body
		if(post.title)
			post.url = post.title.replace(/[^((a-z)|(A-Z)|(\s))]*/g, "").replace(/\s+/g, "-")
		return Article.update(req.params.id, post, req.user.id).then(
			function(articles){
				return res.status(200).send({posts: articles});
			}
		);
	},
	createPost: function(req, res, next){
		return Article.create({user: req.user}).then(function(id){
			return res.status(201).send({id: id[0]});
		});
	},
	getPosts: function(req, res, next){
		return Article.all().then(function(posts){
			var result = [];

			function updateAndCheck(index, user){
				var post = posts[index];
				post.user = user[0];
				result.push(post);
				if(result.length == posts.length){
					return res.status(200).send({posts: result});
				}
			}

			posts.forEach(function(post, index){
				User.find(post.user_id).then(function(index, user){
					updateAndCheck(index, user);
				}.bind(this, index))
			});
		})
	},
	getPostsByName: function(req, res, next){
		Article.all({url: req.query.name}).then(function(articles){
			var result = [];
		
			function updateAndReturn(user){
				var post = articles[0];
				post.user = user[0];
				result.push(post);

				var viewCount = articles[0].view_count,
				id = articles[0].id;
				Article.setViews(id, (viewCount+ 1)).then(function(articles){
					return res.status(200).send({posts: result});
				});
			}	

			User.find(articles[0].user_id).then(function(user){
				updateAndReturn(user);
			})
		})
	},
	getPost: function(req, res, next){
		Article.find(req.params.id).then(function(articles){

			var result = [];
		
			function updateAndReturn(user){
				var post = articles[0];
				post.user = user[0];
				result.push(post);
				return res.status(200).send({posts: result});
			}	

			User.find(articles[0].user_id).then(function(user){
				updateAndReturn(user);
			})
		});
	}
}