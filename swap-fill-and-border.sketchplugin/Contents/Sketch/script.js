//todo
// - should work on multi selection
// - should work when either border or fill are not enabled
// - should work with gradients too

var onRun = function(context) {
    var doc = context.document
    var selection = context.selection
    var fill;
    var border;
    var borderColor = MSColor.colorWithRed_green_blue_alpha(1.0,1.0,1.0,0.0);
    var fillColor = MSColor.colorWithRed_green_blue_alpha(1.0,1.0,1.0,0.0);
    var hasFill = true;
    var hasBorder = true;
    var fillObj;
    var borderObj;

    if (selection.count() == 0) {
        doc.showMessage("Please select a layer.")
        return

    } else if (selection.count() == 1) {
        var layer = selection[0]
        var artboard = doc.currentPage().currentArtboard() || doc.currentPage()

        var fills = layer.style().fills()

        if (fills) {
            var fillObj
            for (var i = 0; i < fills.count(); i++) {
                fill = fills.objectAtIndex(i)
                if (fill.isEnabled() == 0) {
                  hasFill = false;
                } else {
                    if (fill.fillType() == 0)
                    fillObj = fill;
                }
            }
            if (fillObj) {
                fillColor = fillObj.color()
            }
        }

        var borders = layer.style().borders();
        if (borders) {
            for (var i = 0; i < borders.count(); i++) {
                border = borders.objectAtIndex(i)
                if (border.isEnabled() == 0) {
                  hasBorder = false;
                } else {
                    if (border.fillType() == 0)
                    borderObj = border;
                }
            }
            if (borderObj) {
                borderColor = borderObj.color()
            }
        }

        fillObj.color = borderColor;
        borderObj.color = fillColor;

        if (hasBorder == false && hasFill == true) {
          fill.isEnabled = 0;
          border.isEnabled = 1;
        }
        if (hasBorder == true && hasFill == false) {
          fill.isEnabled = 1;
          border.isEnabled = 0;
        }


    }
};
