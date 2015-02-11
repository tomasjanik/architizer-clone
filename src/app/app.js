var app;

app = angular.module('ngBoilerplate', [
    'templates-app',
    'templates-common',
    'afkl.lazyImage',
    'vs-repeat',
    'common.appService',
    'common.ImageSetHelper',
    'common.header',
    'common.slidenav',
    'ngBoilerplate.home',
    'ngBoilerplate.about',
    'ui.router'
]);

app.config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/about');
});

app.run(function run() {
});

app.constant('URL', 'assets/');
app.factory('AppDataService', ["$http", "URL", function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'json/' + 'app.json');
    };

    return {
        getData: getData
    };
}]);

app.controller('AppCtrl', ['$scope', '$location', 'AppDataService', 'SlideHelper', function ($scope, $location, AppDataService, SlideHelper) {
    $scope.appObj = null;

    $scope.fetchContent = function () {
        AppDataService.getData().then(function (result) {
            $scope.appObj = result.data;
            SlideHelper.setAppObj(result.data);
        });
    };

    $scope.fetchContent();

    $scope.toggleHeader = function () {
        //alert('wanghao');
        //$scope.appObj.header._style = "-webkit-transform: translateX(200px);";
        SlideHelper.toggleSlideMenu();
    };

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
        }
    });
}]);





