var about = angular.module('ngBoilerplate.about', [
    'ui.router',
    'placeholders',
    'ui.bootstrap',
    'infinite-scroll',
    'common.pageService'
]);

about.config(function config($stateProvider) {
    $stateProvider.state('about', {
        url: '/about',
        views: {
            "main": {
                controller: 'AboutCtrl',
                templateUrl: 'assets/partials/about.tpl.html'
            }
        },
        data: {pageTitle: 'Architizer'}
    });
});

about.factory('AboutDataService', function ($http, URL) {
    var getData = function (currentPageStep) {
        return $http.get(URL + 'json/' + 'feed-page-' + currentPageStep + '.json');
    };

    return {
        getData: getData
    };
});

about.factory('AboutTemplateService', function ($http, URL) {
    var getImageBlockTemplates = function () {
        return $http.get(URL + 'partials/about/gridview/' + 'image-block.html');
    };
    var getEdBlockTemplates = function () {
        return $http.get(URL + 'partials/about/gridview/' + 'ed-block.html');
    };
    var getThumbBlockTemplates = function () {
        return $http.get(URL + 'partials/about/gridview/' + 'thumb-block.html');
    };

    var getUserProfileMenuItemTemplates = function () {
        return $http.get(URL + 'partials/about/gridview/' + 'user-profile-menu-item.html');
    };
    var getTradingTableRowItemTemplates = function () {
        return $http.get(URL + 'partials/about/gridview/' + 'trading-table-row.html');
    };

    var getGridViewItemTemplates = function (currentPageStep) {
        return $http.get(URL + 'partials/about/' + 'feed-page-' + currentPageStep + '.html');
    };


    return {
        getImageBlockTemplates: getImageBlockTemplates,
        getEdBlockTemplates: getEdBlockTemplates,
        getThumbBlockTemplates: getThumbBlockTemplates,
        getGridViewItemTemplates: getGridViewItemTemplates,
        getUserProfileMenuItemTemplates: getUserProfileMenuItemTemplates,
        getTradingTableRowItemTemplates: getTradingTableRowItemTemplates
    };
});

about.controller('AboutCtrl', function ($scope, Reddit) {
    $scope.reddit = new Reddit();
});

about.factory('Reddit', ['$http', 'AboutDataService', 'pageService', function ($http, AboutDataService, pageService) {
    var Reddit = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function () {
        if (this.busy) {
            return;
        }
        this.busy = true;

        AboutDataService.getData(pageService.currentPageStep()).then(function (result) {
            this.items = pageService.pushOnePageData(result.data);
            console.log("nextPage:" + pageService.currentPageStep());
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
}]);

about.directive('feedPageItem', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        var pageType = attrs['pagetype'];
        var pageIndex = attrs['pageindex'];
        pageIndex++;

        scope.item = pageService.getGrieViewItem(pageType);

        AboutTemplateService.getGridViewItemTemplates(pageIndex).then(function (response) {
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

about.directive('imageBlock', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        var imgType = attrs['type'];
        var dataImgid = attrs['dataimgid'];

        //console.log(dataImgid);

        scope.imageTag = pageService.getImageBlock(dataImgid);

        AboutTemplateService.getImageBlockTemplates().then(function (response) {
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


about.directive('edBlock', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        var itemId = attrs['itemid'];

        scope.edBlock = pageService.getEdBlock(itemId);

        AboutTemplateService.getEdBlockTemplates().then(function (response) {
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

about.directive('thumbBlock', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        var itemId = attrs['itemid'];

        scope.thumbBlock = pageService.getThumbBlock(itemId);

        AboutTemplateService.getThumbBlockTemplates().then(function (response) {
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

about.directive('userProfileMenuItem', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        var itemId = attrs['itemid'];

        scope.menuItem = pageService.getUserProfileMenuItem(itemId);

        AboutTemplateService.getUserProfileMenuItemTemplates().then(function (response) {
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

about.directive('tradingTableRow', ['$compile', 'AboutTemplateService', 'pageService', function ($compile, AboutTemplateService, pageService) {
    var linker = function (scope, element, attrs) {
        //var itemId = attrs['itemid'];

        //scope.menuItem = pageService.getTradingTableRowItem(itemId);

        AboutTemplateService.getTradingTableRowItemTemplates().then(function (response) {
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






