var slidenav;
slidenav = angular.module('common.slidenav', []);

slidenav.constant('URL', 'assets/');


slidenav.factory('SlideNavDataService', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'json/' + 'slidemenu.json');
    };

    return {
        getData: getData
    };
});


slidenav.factory('SlideNavTemplateService', function ($http, URL) {
    var getTemplates = function () {
        return $http.get(URL + 'partials/' + 'slidenav.tpl.html');
    };

    return {
        getTemplates: getTemplates
    };
});


slidenav.controller('SlideNavCtrl', ['$scope', 'SlideNavDataService', 'SlideHelper', function ($scope, SlideNavDataService, SlideHelper) {
    var ctrl = this;
    ctrl.slideMenuObj = null;

    ctrl.fetchContent = function () {
        SlideNavDataService.getData().then(function (result) {
            ctrl.slideMenuObj = result.data;
            SlideHelper.setSlideMenuObj(result.data);
        });
    };

    ctrl.fetchContent();

    ctrl.toggleLeftMenu = function () {
        SlideHelper.toggleSlideMenu();
    };
}]);


slidenav.directive('appSlideNav', function ($compile, SlideNavTemplateService) {
    var linker = function (scope, element, attrs) {
        SlideNavTemplateService.getTemplates().then(function (response) {
            var templates = response.data;

            element.html(templates);

            $compile(element.contents())(scope);
        });
    };

    return {
        restrict: 'E',
        link: linker,
        scope: {
            content: '='
        }
    };
});

