var appService;
appService = angular.module('common.appService', []);

appService.factory('LocalJsonFetcher', function ($http) {
    var LocalJson = {};

    LocalJson.getPageResult = function () {
        var url = "assets/json/architizer.json";
        return $http.get(url);
    };

    return LocalJson;
});

appService.factory('SlideHelper', function ($http) {
    var SlideHelper = function () {
        this.slide_menu_width = "200px";

        this._slideMenuObj = null;
        this._NavMenuObj = null;
        this._appObj = null;
        this.slide_menu_visible = false;
    };

    /**
     * Nav menu object
     * @param navMenuObj
     */
    SlideHelper.setNavMenuObj = function (navMenuObj) {
        this._NavMenuObj = navMenuObj;
    };
    SlideHelper.getNavMenuObj = function () {
        return this._NavMenuObj;
    };

    /**
     * Global app object
     * @param slideMenuObj
     */
    SlideHelper.setAppObj = function (appObj) {
        this._appObj = appObj;
    };

    /**
     * Slide menu object
     * @param slideMenuObj
     */
    SlideHelper.setSlideMenuObj = function (slideMenuObj) {
        this._slideMenuObj = slideMenuObj;
    };
    SlideHelper.getSlideMenuObj = function () {
        return this._slideMenuObj;
    };

    /**
     * animate slide menu
     */
    SlideHelper.hideSlideMenu = function () {
        //1
        this.slide_menu_visible = false;
        //2
        this._appObj.header._style = "-webkit-transform: none;";
        //this._NavMenuObj._style = "-webkit-transform: none;";
        //this._appObj._style = "-webkit-transform: none;";
        //this._slideMenuObj._style = "width: 200px;";
    };
    SlideHelper.showSlideMenu = function () {
        //1
        this.slide_menu_visible = true;
        //2
        this._appObj.header._style = "-webkit-transform: translateX(200px);";
        //this._NavMenuObj._style = "-webkit-transform: translateX(200px);";
        //this._appObj._style = "-webkit-transform: translateX(200px);";
        //this._slideMenuObj._style = "width: 200px;overflow-y: auto;";
    };

    SlideHelper.toggleSlideMenu = function () {
        if (this.slide_menu_visible) {
            this.hideSlideMenu();
        } else {
            this.showSlideMenu();
        }
    };

    return SlideHelper;
});



