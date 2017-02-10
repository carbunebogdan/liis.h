angular.module('app.controllers',[
		'app.directives',
		'app.services',
		'ngFileUpload',
		'LocalStorageModule'

	])
	
	.controller('navBar',['$scope', '$mdDialog','$http','$location','$rootScope','localStorageService','$route',function($scope, $mdDialog,$http,$location,$rootScope,localStorageService,$route){
		$rootScope.account=localStorageService.get('account');
		$rootScope.loggedIn=localStorageService.get('loggedIn');
		
		$scope.back=false;

		$rootScope.navBack=function(){
			$scope.back=false;
			$scope.subtitle=$scope.clasaDefault;
			$scope.discipline=null;
			$scope.get=false;
		}

		$scope.logOut= function(){
    		localStorageService.clearAll();
    		$location.path('/home');
    		$rootScope.account=localStorageService.get('account');
    		$rootScope.loggedIn=localStorageService.get('loggedIn');
    		if($scope.back==true){
    			$rootScope.navBack();
    		}
    	};



  	function deleteCheck($scope, $mdDialog,id) {
  		var dscDelete='public/php/dscDelete.php';
  		$scope.id=id;

  		$scope.delete=function(){
  			$scope.success=false;
  			$http.post(dscDelete,{id:$scope.id})
  			.success(function(){
  				$scope.success=true;
  				$rootScope.navBack();
  				$mdDialog.hide();
  				var path='/view/'+$rootScope.current+'/'+$rootScope.currentDid+'/'+$rootScope.currentD;
  				console.log(path);
  				console.log($location.path());
  				if($location.path()==path){
  					$location.path('home');
  				}
  			});

  		}
        
        $scope.close = function() {
          $mdDialog.hide();
        };
      };


      function loginCtrl($scope,$mdDialog) {

      	// validarea datelor de logare
   		$scope.submit = function(){

			$scope.processed=false;
   			$rootScope.navBack();

   			

            $http.get('public/php/getUser.php', {
                params: {
                            nume: $scope.username,
                            parola: $scope.password, 
                }
            })
            .success(function (data,status) {

            	$scope.processed=true;

                $scope.account=data;

                if($scope.account.username){

				localStorageService.set('loggedIn',true);
				localStorageService.set('account',$scope.account);
                $scope.close();
			    $rootScope.account=$scope.account;        
                $rootScope.loggedIn=true;
                $location.path('/dashboard');
            }else{
                alert('Parolă sau username greșit');
            }

     })
            .error(function(){
            	$scope.submit();
            });

    		};
    	

        
        $scope.close = function() {
          $mdDialog.hide();
        };
      };

	  $scope.showLogin = function(ev) {
	    $mdDialog.show({
	      controller: loginCtrl,
	      templateUrl: 'public/modals/login.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen 
	    });
	  };

	 $scope.showCheck = function(ev,uid) {
	    $mdDialog.show({
	      locals:{id: uid},
	      controller: deleteCheck,
	      templateUrl: 'public/modals/check.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen 
	    });
	  };

      var getClasa='public/php/getClasa.php';
		var getDiscipline='public/php/getDiscipline.php';

		$scope.clasaDefault="Alege clasa";
		$scope.disciplinaDefault="Alege disciplina";
		$scope.subtitle=$scope.clasaDefault;
		$scope.discipline=[];

		$http.get(getClasa)
		.success(function(data){
			$rootScope.clase=data;
			

			
		})
		.error(function(err){
			$log.error(err);
		});

		$rootScope.navigateTo=function(moveTo){



			$scope.back=true;

			

			$scope.subtitle='Clasa a '+moveTo.nume_clasa+'-a';
			
			$scope.numeclasa=moveTo.id_clasa;
			$rootScope.current=$scope.numeclasa;
			
			




			


     		$scope.string=JSON.stringify(moveTo.id_clasa);
     		var getDsc=function(idstr){
     		$http.post(getDiscipline,idstr)
     		.success(function (data,status) {
                $scope.discipline = data;
		$scope.get=true;
                
     		})
     		.error(function(){
     			getDsc(idstr);
     		});
			}

			getDsc($scope.string);
			
		};

		$rootScope.navBar=true;


		$scope.showDscp=function(id,nume){
			
			$rootScope.currentD=nume;
			$rootScope.currentDid=id;
			var view='view/'+$scope.numeclasa+'/'+id+'/'+nume;

			$location.path(view);


			
			
		};

	}])





	.controller('home',['$scope','$http','$rootScope','keepData','$location','localStorageService','$mdDialog',function($scope,$http,$rootScope,keepData,$location,localStorageService,$mdDialog){
		$rootScope.account=localStorageService.get('account');
		var getArticol='public/php/newsFeed.php';

		$scope.pop=function(){
				$http.get(getArticol)
			.success(function(data){
				$scope.articole=data;
							$scope.none=false;
							$scope.success=true;
					if(!$scope.articole[0]){
               				 $scope.articole.length=$scope.articole.length-1;}

               		for (var i = $scope.articole.length - 1; i >= 0; i--) {


                	if($scope.articole[i].document_articol==null){
	                	$scope.articole[i].none=true;
	                	
	                }else{
	                $scope.articole[i].document_articol=$scope.articole[i].document_articol.split(',');
	                $scope.articole[i].none=false;
	            	}

                }

							if($scope.articole.length==0){
								$scope.none=true;
							}

			})
			.error(function(err){
				 $scope.pop();
			});
		}

				$scope.pop();



		$scope.openArticle=function(ev,uid,article){
            	keepData.setArticle(article);


				$mdDialog.show({
			      locals:{id: uid},
			      controller: articol,
			      templateUrl: 'public/modals/article.tmpl.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen 
			    });
			
				}
		  		function articol($scope, $mdDialog,id) {
			  		var getArticol='public/php/getArticle.php';


					$scope.article=keepData.getArticle();

					if($scope.article.nume==null){
			         $http.get(getArticol, {
	                	params: {
	                            id: id,
	                	}
	            		})
	            	.success(function (data,status) {
	                $scope.article = data[0];
	                
	                if($scope.article.document_articol.length<2){
	                	$scope.none=true;
	                	
	                }else{
	                $scope.article.document_articol=$scope.article.document_articol.split(',');
	            	}
	                
	     			});
	            	}
			        
			        $scope.close = function() {
			          $mdDialog.hide();
			        };
			      };		

	}])




	.controller('uploadDoc', ['$scope', 'Upload', '$timeout','keepData', function ($scope, Upload, $timeout,keepData) {
		var loadedDocs=keepData.getDoc();
		if(loadedDocs!=null){
       	var names='';
       $scope.names = loadedDocs;
       for(i=0;i<=$scope.names.length-1;i++){
       	if(i==0){
       		names=$scope.names[0];
       	}else{
       		names=names+','+$scope.names[i];
       	}
       }
       $scope.count=$scope.names.length;
	   	}else{
	   		$scope.names='';
	   		$scope.count=0;
	   		var names='';
	   	}


       
       	$scope.removeFiles=function(fileName,index){
       		
       		$scope.count-=1;
       		index=index+1;
       		if(index==1 && $scope.names.length==1){

       			names='';
       			$scope.names=null;

       		}else if(index==1 && $scope.names.length>1){
       			names=names.replace(fileName+',','');
	       		$scope.names=names.split(',');

       		}else if(index>1 && index<$scope.names.length){
	       		names=names.replace(','+fileName+',',',');
	       		$scope.names=names.split(',');

       		}else if(index==$scope.names.length && index>1){
       			names=names.replace(','+fileName,'');
	       		$scope.names=names.split(',');
       		}

       		keepData.setDoc(names);
       		
       		if($scope.count==0){
       			keepData.setDoc(null);
       		}
       	}
        $scope.uploadFiles = function(file, errFiles) {

        	if(file){
        	if(names.search(file.name)<0){
        	
            $scope.errFile = errFiles && errFiles[0];
            

            	if($scope.count==0){
        		names=file.name;
        		
        	}else{

				names=names+','+file.name;
				 
        	}
            	 	
           $scope.names = names.split(',');
     
            keepData.setDoc(names);

            $scope.count+=1;

                file.upload = Upload.upload({
                    url: 'public/php/uploadDoc.php',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
                    $scope.progress=file.progress;

                });
            
        }else{
        	alert('Fișierul este adăugat deja!');
        }}
        };

       
    }])


	.controller('view',['$scope','$routeParams','$http','$rootScope','$location','keepData','$anchorScroll','$route','$mdDialog','localStorageService',function($scope,$routeParams,$http,$rootScope,$location,keepData,$anchorScroll,$route,$mdDialog,localStorageService){
		$rootScope.account=localStorageService.get('account');
		keepData.setDoc(null);
		var artPush='public/php/artPush.php';
		var popArticles='public/php/popArticles.php';
		var getClasa='public/php/getClasa.php';
		var artDelete='public/php/artDelete.php';
		var artUpdate='public/php/artUpdate.php';

		$scope.state=true;


		function deleteCheck($scope, $mdDialog,id) {
  		var dscDelete='public/php/dscDelete.php';
  		$scope.id=id;

  		$scope.delete=function(){
  			$scope.success=false;
		$http.get(artDelete,{params:{id:$scope.id}})
			.success(function(data){
				$scope.success=true;
				$scope.response=data;
				$route.reload();
				$mdDialog.hide();
			})
			.error(function(err){
				console.log(err);
			});

  		}
        
        $scope.close = function() {
          $mdDialog.hide();
        };
      };

       $scope.showCheck = function(ev,uid) {
	    $mdDialog.show({
	      locals:{id: uid},
	      controller: deleteCheck,
	      templateUrl: 'public/modals/check.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen 
	    });
	  };






			       		$scope.enable=function(state){
			       			$scope.state=state;
						    keepData.setDoc(null);

			            	
			       		};


		$scope.pushArt=function($params){



			$params.clasa_disciplina=$scope.clasa_disciplina;
			$params.profesor=$rootScope.account.id;
			$params.doc=keepData.getDoc();
			$scope.pushed=false;

			$http.post(artPush,{'titlu':$params.titlu, 'continut':$params.continut, 'document':$params.doc, 'clasa_disciplina':$params.clasa_disciplina, 'profesor': $params.profesor})
			.success(function() {
				keepData.setDoc(null);
				$scope.pushed=true;
				$route.reload();
				$scope.enable(true);


			})
			.error(function(err) {
				$scope.pushArt($params);
			});


		};


		$scope.clasa=$routeParams.clasa;
		$scope.disciplina=$routeParams.disciplina;
		$scope.iddsc=$routeParams.iddsc;
		 switch ($scope.clasa) {
            case '5':
               $scope.numeclasa='V';
                break;
            case '6':
               $scope.numeclasa='VI';
                break;
            case '7':
               $scope.numeclasa='VII';
                break;
            case '8':
               $scope.numeclasa='VIII';
                break;
            case '9':
               $scope.numeclasa='IX';
                break;
            case '10':
               $scope.numeclasa='X';
               break;
            case '11':
               $scope.numeclasa='XI';
               break;
            case '12':
               $scope.numeclasa='XII';
                break;

            default:
            	$scope.numeclasa='none';

        };

				$scope.openArticle=function(ev,uid,article){
            	keepData.setArticle(article);
            	

				$mdDialog.show({
			      locals:{id: uid},
			      controller: articol,
			      templateUrl: 'public/modals/article.tmpl.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen 
			    });
			
				}
		  		function articol($scope, $mdDialog,id) {
			  		var getArticol='public/php/getArticle.php';


					$scope.article=keepData.getArticle();

					if($scope.article.nume==null){
			         $http.get(getArticol, {
	                	params: {
	                            id: id,
	                	}
	            		})
	            	.success(function (data,status) {
	                $scope.article = data[0];
	                
	                if($scope.article.document_articol.length<2){
	                	$scope.none=true;
	                	
	                }else{
	                $scope.article.document_articol=$scope.article.document_articol.split(',');
	            	}
	     			});
	            	}
			        
			        $scope.close = function() {
			          $mdDialog.hide();
			        };
			      };		


        //edit logic
        $scope.edit=function(index,value){
        	$scope.articole[index].editing=value;
        	if(value==true){
        		$scope.index=index;
        		keepData.setDoc($scope.articole[index].document_articol);
        	}
        	if (value==false) {
        		$route.reload();
        	}
        }

        //update edited version
        $scope.update=function(article){
        	$scope.modified=false;
			var newdoc=keepData.getDoc();

        	$http.post(artUpdate,{'id':article.id_articol,'title':article.nume_articol, 'content':article.descriere_articol, 'doc':newdoc, 'professor': $rootScope.account.id})
			.success(function() {
				$scope.modified=true;
				$route.reload();

			})
			.error(function(err) {
				console.log(err);
			});
        }
        

        $scope.obiectClasa={
        	id_clasa: $scope.clasa,
        	nume_clasa: $scope.numeclasa
        };

        if($rootScope.navBar){
        $rootScope.navigateTo($scope.obiectClasa);}



        
        $scope.popy=function(){
		$http.get(popArticles,{
                params: {
                            clasaId: $scope.clasa,
                            dscId: $scope.iddsc
                }
            })
		.success(function(data){
			$scope.articole=data[0];
			$scope.clasa_disciplina=data[1];

			if(!$scope.articole[0]){
                $scope.articole.length=$scope.articole.length-1;}

                for (var i = $scope.articole.length - 1; i >= 0; i--) {
                	$scope.articole[i].editing=false;

                	if($scope.articole[i].document_articol==null){
	                	$scope.articole[i].none=true;
	                	
	                }else{
	                $scope.articole[i].document_articol=$scope.articole[i].document_articol.split(',');
	                $scope.articole[i].none=false;
	            	}

                }

               			$scope.none=false;
						$scope.success=true;
						if($scope.articole.length==0){
							$scope.none=true;
						}



			
		})
		.error(function(err){
			$scope.popy();
		});
	}

		$scope.popy();

	}])



	


    .controller('dashboard',['$scope','$rootScope','localStorageService','$http','$mdDialog','$route','keepData','$location',function($scope,$rootScope,localStorageService,$http,$mdDialog,$route,keepData,$location){
    	$rootScope.account=localStorageService.get('account');
    	var getAllD='public/php/getAllD.php';
    	var getAllC='public/php/getClasa.php';
    	var addDsc='public/php/addDsc.php';
    	var myArt='public/php/myArt.php';
    	var artDelete='public/php/artDelete.php';
		var artUpdate='public/php/artUpdate.php';
		var changePsw='public/php/changePsw.php';
		keepData.setDoc(null);

		//Administration -->
		
    	$scope.response=null;
    	$scope.warn=null;

    	$http.get(getAllD)
    	.success(function(data){
    		$scope.discipline=data;
    		
    	})
    	.error(function(err){
    		console.log(err);
    	});


    	$http.get(getAllC)
    	.success(function(data){
    		$scope.clase=data;
    		
    	})
    	.error(function(err){
    		console.log(err);
    	});

    	$scope.pushDsc=function($params){
    		
    		$scope.clasa={
    			id_clasa:'',
    			nume_clasa:''
    		};

    		$scope.added=false;

    		$http.post(addDsc,{'id_clasa':$params.clasa_id, 'id_disciplina':$params.disciplina_id})
    		.success(function(data){
    			$scope.added=true;

    			if(data==1){
    				$scope.response='Disciplină adaugată cu succes !';
    				$scope.warn=false;
    				switch ($params.clasa_id) {
			            case '5':
			               $scope.numeclasa='V';
			                break;
			            case '6':
			               $scope.numeclasa='VI';
			                break;
			            case '7':
			               $scope.numeclasa='VII';
			                break;
			            case '8':
			               $scope.numeclasa='VIII';
			                break;
			            case '9':
			               $scope.numeclasa='IX';
			                break;
			            case '10':
			               $scope.numeclasa='X';
			               break;
			            case '11':
			               $scope.numeclasa='XI';
			               break;
			            case '12':
			               $scope.numeclasa='XII';
			                break;

			            default:
			            	$scope.numeclasa='none';

			        };
			        $scope.clasa.id_clasa=$params.clasa_id;
			        $scope.clasa.nume_clasa=$scope.numeclasa;
    				$rootScope.navigateTo($scope.clasa);

    			}else{
    				$scope.response='Disciplina există deja !';
    				$scope.warn=true;
    			}
    		})
    		.error(function(err){
    			console.log(err);
    		});

    	};

    	//My account


	    	$scope.a_edit=false;
	    	$scope.u_edit=false;
	    	$scope.p_edit=false;

	    	$scope.editAcc=function(field,value){
	    		if(field==1){
	    			$scope.a_edit=value;
	    		}else if(field==2){
	    			$scope.u_edit=value;
	    		}else if(field==3){
	    			$scope.p_edit=value;
	    		}
	    		if(value==false){
	    			$rootScope.account=localStorageService.get('account');
	    		}
	    	}

	    	$scope.updateAcc=function(field,account){
	    		var updateName='public/php/updateName.php';
	    		var updateUName='public/php/updateUName.php';

				if(field==1){

		    		$http.post(updateName,{name:account.nume, surname:account.prenume, id:account.id})
		    		.success(function(){
		    			localStorageService.set('account',account);
		    			$scope.editAcc(field,false);
		    		})
		    		.error(function(){

		    		});
		    		}else if(field==2){

		    			$http.post(updateUName,{uname:account.username,id:account.id})
		    		.success(function(){
		    			localStorageService.set('account',account);
		    			$scope.editAcc(field,false);
		    		})
		    		.error(function(){

		    		});

	    			}else if(field==3){

	    			}
	    		
	    	};

	    	$scope.changePsw=function(oldP,newP){
				if(oldP==$rootScope.account.parola){
					$http.post(changePsw,{id:$rootScope.account.id, newPsw: newP})
					.success(function(data){
						$scope.status="Parola a fost schimbată cu succes!";
						$scope.pwarn=false;
					})
					.error(function(err){
						console.log(err);
					});
				}else{
					$scope.status="Parola veche este greșită!";
					$scope.pwarn=true;
				}
	    	}



	    	//My articles

    	  		$scope.getArt=function(){

				$http.get(myArt,{params:{id:$rootScope.account.id}})
					.success(function(data){
						$scope.articole=data;




						$scope.none=false;
						$scope.success=true;

						if(!$scope.articole[0]){
               					 $scope.articole.length=$scope.articole.length-1;}


               		for (var i = $scope.articole.length - 1; i >= 0; i--) {
                	$scope.articole[i].editing=false;

                	if($scope.articole[i].document_articol==null){
	                	$scope.articole[i].none=true;
	                	
	                }else{
	                $scope.articole[i].document_articol=$scope.articole[i].document_articol.split(',');
	                $scope.articole[i].none=false;
	            	}

                }


						if($scope.articole.length==0){
							$scope.none=true;
						}
					})
					.error(function(err){
						$scope.getArt();
					});
  				}

  				$scope.getArt();


		  		function deleteCheck($scope, $mdDialog,id) {
		  		var dscDelete='public/php/dscDelete.php';
		  		$scope.id=id;

			  		$scope.delete=function(){
			  			$scope.success=false;
					$http.get(artDelete,{params:{id:$scope.id}})
						.success(function(data){
							$scope.success=true;
							$scope.response=data;
							$route.reload();
							$mdDialog.hide();
						})
						.error(function(err){
							console.log(err);
						});

			  		}
	        
			        $scope.close = function() {
			          $mdDialog.hide();
			        };
			      };

		       $scope.showCheck = function(ev,uid) {
			    $mdDialog.show({
			      locals:{id: uid},
			      controller: deleteCheck,
			      templateUrl: 'public/modals/check.tmpl.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen 
			    });
			  };

			    //edit logic
		        $scope.edit=function(index,value){
		        	$scope.articole[index].editing=value;
		        	if(value==true){
		        		$scope.index=index;
		        		keepData.setDoc($scope.articole[index].document_articol);
		        	}
		        	if (value==false) {
		        		$route.reload();
		        	}
		        };

		        //update edited version
		        $scope.update=function(article){
		        	$scope.modified=false;
					

					var loadedDocs=keepData.getDoc();
					if(Object.prototype.toString.call( loadedDocs ) === '[object Array]'){
					if(loadedDocs!=null){
			       	var names='';
			       $scope.names = loadedDocs;
			       for(i=0;i<=$scope.names.length-1;i++){
			       	if(i==0){
			       		names=$scope.names[0];
			       	}else{
			       		names=names+','+$scope.names[i];
			       	}
			       }

				   	}else{

				   		var names=null;
				   	}}else{
				   		names=loadedDocs;
				   	}


					

		        	$http.post(artUpdate,{'id':article.id_articol,'title':article.nume_articol, 'content':article.descriere_articol, 'doc':names, 'professor': $rootScope.account.id})
					.success(function() {
						$scope.modified=true;
						$route.reload();

					})
					.error(function(err) {
						 $scope.update(article);
					});
		        };

		        

        		$scope.openArticle=function(ev,uid,article){
            	keepData.setArticle(article);


				$mdDialog.show({
			      locals:{id: uid},
			      controller: articol,
			      templateUrl: 'public/modals/article.tmpl.html',
			      parent: angular.element(document.body),
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: $scope.customFullscreen 
			    });
			
				}

		  		function articol($scope, $mdDialog,id) {
			  		var getArticol='public/php/getArticle.php';


					$scope.article=keepData.getArticle();

					if($scope.article.nume==null){
			         $http.get(getArticol, {
	                	params: {
	                            id: id,
	                	}
	            		})
	            	.success(function (data,status) {
	                $scope.article = data[0];

	                if($scope.article.document_articol!=null){
	                if($scope.article.document_articol.length<2){
	                	$scope.none=true;
	                	
	                }else{
	                $scope.article.document_articol=$scope.article.document_articol.split(',');
	            	}
	            }

	     			});
	            	}
			        
			        $scope.close = function() {
			          $mdDialog.hide();
			        };
			      };		

    }])

    .filter("dateOnly", function(){
        return function(input){
        	if (input) {
            return input.split(' ')[0]; 
        }
        };
    });

	