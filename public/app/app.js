var app = angular.module('app',[
	'ngRoute',
	'ngMaterial',
	'app.controllers',
	'ngMaterial',
	'ngFileUpload',
	'ngMessages',
	'ngCookies',
	'material.svgAssetsCache',
	'LocalStorageModule'
	])
	.config(['$routeProvider',function($routeProvider){

			$routeProvider
			.when('/home',{
				templateUrl: 'public/views/home.html',
				controller: 'home'

			})
			.when('/view/:clasa/:iddsc/:disciplina',{
				templateUrl: 'public/views/viewAll.html',
				controller: 'view'

			})
			.when('/article/:id',{
				templateUrl: 'public/views/viewSingle.html',
				controller: 'articol'

			})
			.when('/dashboard',{
				resolve:{
					"check":function($location,$rootScope,localStorageService){
						if(!$rootScope.loggedIn){
						$rootScope.loggedIn=localStorageService.get('loggedIn');
					}
							
						if(!$rootScope.loggedIn){
							$location.path('/');
						}
					}
				},
				templateUrl: 'public/views/dashboard.html',
				controller: 'dashboard'

			})
			.otherwise({
				redirectTo: '/home'
			});
	}])
	.config(function($mdThemingProvider) {

  /*$mdThemingProvider.definePalette('darkgreen', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': '00cc66',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': 'b71c1c',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('darkgreen') */

})

	.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('bliis');
})
	.config(function($mdIconProvider) {
    $mdIconProvider
       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
   })
	.config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
      }])


