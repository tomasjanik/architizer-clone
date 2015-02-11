var pageService;

pageService = angular.module('common.pageService', [
    'common.ImageSetHelper',
    'angularUUID2'
]);


pageService.service('pageService', ['ImageSetHelper', 'uuid2', function (ImageSetHelper, uuid2) {
    this._pageObj = [];
    this._imageBlocks = [];
    this._edBlocks = [];
    this._thumbBlock = [];
    this._userProfileMenuItems = [];
    this._tradingTableRows = [];

    this.pageStep = 1;

    this.currentPageStep = function () {
        return this.pageStep;
    };
    this.nextPageStep = function () {
        this.pageStep++;
    };

    this.preTradingTableRow = function (tradingTableRow) {
        return tradingTableRow;
    };

    this.preProfileMenuItem = function (userProfileMenuItem) {
        userProfileMenuItem.image = userProfileMenuItem.div[0].src;
        userProfileMenuItem.title = userProfileMenuItem.div[1][0];
        userProfileMenuItem.em = userProfileMenuItem.div[1][1].em;
        userProfileMenuItem.subtitle = userProfileMenuItem.div[1][1].text;

        return userProfileMenuItem;
    };

    this.preEdBlockMeta = function (edBlock) {
        edBlock.meta.eyebrow = edBlock.meta.span[0];
        edBlock.meta.views = edBlock.meta.span[1];
        edBlock.meta.timestamp = edBlock.meta.span[2];
    };

    this.preEdBlock = function (edBlock) {
        var length = edBlock.div.length;
        var index = 0;
        edBlock.hasSubImage = length == 4;
        edBlock.imageHolder = edBlock.div[index++];
        if (edBlock.hasSubImage) {
            edBlock.subImageHolder = edBlock.div[index++];
        }
        edBlock.meta = edBlock.div[index++];
        this.preEdBlockMeta(edBlock);
        edBlock.text = edBlock.div[index++];

        edBlock.text.hasAuthor = true;
        if (typeof(edBlock.text.h5) == "undefined") {
            edBlock.text.hasAuthor = false;
        }

        return edBlock;
    };

    this.pushOnePageData = function (pageData) {
        // 1. push all imageBlocks to one array.
        var array = pageData.page.imageBlocks;
        for (var i = 0; i < array.length; i++) {
            this._imageBlocks.push(array[i]);
        }
        // 3. push all edBlocks to one array.
        array = pageData.page.edBlocks;
        for (i = 0; i < array.length; i++) {
            this._edBlocks.push(this.preEdBlock(array[i]));
        }
        // 3. push all edBlocks to one array.
        array = pageData.page.userProfileMenuItems;
        for (i = 0; i < array.length; i++) {
            this._userProfileMenuItems.push(this.preProfileMenuItem(array[i]));
        }
        // 3. push all edBlocks to one array.
        array = pageData.page.tradingTableRows;
        for (i = 0; i < array.length; i++) {
            this._tradingTableRows.push(this.preTradingTableRow(array[i]));
        }
        // 3. push all edBlocks to one array.
        array = pageData.page.thumbBlocks;
        for (i = 0; i < array.length; i++) {
            this._thumbBlock.push(array[i]);
        }


        // 4. push page object to pageObj array.
        this._pageObj.push(pageData);

        this.nextPageStep();

        return this._pageObj;
    };

    this.getGrieViewItem = function (pageType) {
        var elementPos = this._pageObj.map(function (x) {
            return x.page.type;
        }).indexOf(pageType);
        var objectFound = this._pageObj[elementPos];

        return objectFound.page.content;
    };

    this.getImageBlock = function (dataImgid) {
        var elementPos = this._imageBlocks.map(function (x) {
            return x.dataImgid;
        }).indexOf(dataImgid);
        var objectFound = this._imageBlocks[elementPos];

        objectFound.bg = objectFound.hero;

        return objectFound;
    };

    this.getEdBlock = function (itemId) {
        var elementPos = this._edBlocks.map(function (x) {
            return x.href;
        }).indexOf(itemId);
        var objectFound = this._edBlocks[elementPos];

        return objectFound;
    };
    this.getThumbBlock = function (itemId) {
        var elementPos = this._thumbBlock.map(function (x) {
            return x.href;
        }).indexOf(itemId);
        var objectFound = this._thumbBlock[elementPos];

        return objectFound;
    };


    this.getUserProfileMenuItem = function (itemId) {
        var elementPos = this._userProfileMenuItems.map(function (x) {
            return x.href;
        }).indexOf(itemId);
        var objectFound = this._userProfileMenuItems[elementPos];

        return objectFound;
    };

    this.getTradingTableRowItem = function (itemId) {
        var elementPos = this._tradingTableRows.map(function (x) {
            return x.href;
        }).indexOf(itemId);
        var objectFound = this._tradingTableRows[elementPos];

        return objectFound;
    };


}]);


