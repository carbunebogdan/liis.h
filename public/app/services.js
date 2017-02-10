angular.module('app.services',[])

	.factory('viewService',function(){
		return {};
	})
	.factory('keepData',function(){

    var data = {
		doc:''
    };


		var article={};

		return{
	        getDoc: function () {
	            return data.doc;
	        },
	        setDoc: function (doc) {
	            data.doc = doc;
	        },
			setArticle: function(get){
        	article=get;
        	},
       		getArticle: function(){
            return article;
        	},
		}
	});