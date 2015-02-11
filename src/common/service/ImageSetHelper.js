var imageSetHelper;

imageSetHelper = angular.module('common.ImageSetHelper', []);

imageSetHelper.service('ImageSetHelper', function () {

    var appendImageset = function (imageItem, hasSubImgs) {
        if (hasSubImgs) {
            imageItem.imageset =
                imageItem.medBG + "  480w";
        } else {
            imageItem.imageset =
                imageItem.medBG + "  480w," +
                imageItem.largeBG + "  768w," +
                imageItem.heroBG + "  2x"
            ;
        }
    };

    this.resolveItem = function (item) {
        appendImageset(item.imageHolder.imageTag, false);
        for (var i = 0; i < item.subImages.subImageHolderList.length; i++) {
            appendImageset(item.subImages.subImageHolderList[i], true);
        }

        return item;
    };

});
