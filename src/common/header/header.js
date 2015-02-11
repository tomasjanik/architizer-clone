var header;

header = angular.module('common.header', []);


header.constant('URL', 'assets/');

header.factory('HeaderDataService', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'json/' + 'header.json');
    };

    return {
        getData: getData
    };
});


header.factory('HeaderTemplateService', function ($http, URL) {
    var getTemplates = function () {
        return $http.get(URL + 'partials/' + 'header.tpl.html');
    };
    var getLogoTemplates = function () {
        return $http.get(URL + 'partials/header/' + 'logo.tpl.html');
    };
    var getLeftMenuTemplates = function () {
        return $http.get(URL + 'partials/header/' + 'left.menu.tpl.html');
    };
    var getRightMenuTemplates = function () {
        return $http.get(URL + 'partials/header/' + 'right.menu.tpl.html');
    };
    var getHeaderToggleTemplates = function () {
        return $http.get(URL + 'partials/header/' + 'header.toggle.tpl.html');
    };

    return {
        getTemplates: getTemplates,
        getHeaderToggleTemplates: getHeaderToggleTemplates,
        getLogoTemplates: getLogoTemplates,
        getLeftMenuTemplates: getLeftMenuTemplates,
        getRightMenuTemplates: getRightMenuTemplates
    };
});

header.controller('HeaderCtrl', ['$scope', 'HeaderDataService', 'SlideHelper', function ($scope, HeaderDataService, SlideHelper) {
    var ctrl = this;
    ctrl.headerObj = null;

    ctrl.fetchContent = function () {
        HeaderDataService.getData().then(function (result) {
            ctrl.headerObj = result.data;
            SlideHelper.setNavMenuObj(result.data);
        });
    };

    ctrl.fetchContent();
}]);


header.directive('appHeader', function ($compile, HeaderTemplateService) {
    var linker = function (scope, element, attrs) {
        HeaderTemplateService.getTemplates().then(function (response) {
            element.html(response.data);
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

header.directive('logo', ['$compile', 'HeaderTemplateService', 'SlideHelper', function ($compile, HeaderTemplateService, SlideHelper) {
    var linker = function (scope, element, attrs) {
        scope.aLogo = SlideHelper.getNavMenuObj().aLogo;

        HeaderTemplateService.getLogoTemplates().then(function (response) {
            element.html(response.data);
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
}]);

header.directive('leftMenu', ['$compile', 'HeaderTemplateService', 'SlideHelper', function ($compile, HeaderTemplateService, SlideHelper) {
    var linker = function (scope, element, attrs) {
        scope.leftMenuList = SlideHelper.getNavMenuObj().leftMenuList;

        HeaderTemplateService.getLeftMenuTemplates().then(function (response) {
            element.html(response.data);
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
}]);

header.directive('headerToggle', ['$compile', 'HeaderTemplateService', 'SlideHelper', function ($compile, HeaderTemplateService, SlideHelper) {
    var linker = function (scope, element, attrs) {
        element.bind('click', function () {
            var appObj = app.appObj;
            SlideHelper.toggleSlideMenu();
        });

        HeaderTemplateService.getHeaderToggleTemplates().then(function (response) {
            element.html(response.data);
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
}]);


header.directive('rightMenu', ['$compile', 'HeaderTemplateService', 'SlideHelper', function ($compile, HeaderTemplateService, SlideHelper) {
    var linker = function (scope, element, attrs) {
        scope.rightMenuList = SlideHelper.getNavMenuObj().rightMenuList;

        HeaderTemplateService.getRightMenuTemplates().then(function (response) {
            element.html(response.data);
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
}]);


