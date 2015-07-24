define(function () {
  return {
    valueLabels: function ($ele) {
      if ($ele.attr('valueLabels') === 'true') {
        var plot = $ele.data('plot');
        if (!plot) return;

        var ctx = plot.getCanvas().getContext("2d"),
            offset = plot.getPlotOffset();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "black";

        $.each(plot.getData(), function (idx, series) {
          var xaxis = series.xaxis,
              yaxis = series.yaxis,
              xCategories = xaxis.options.mode === 'categories',
              yCategories = yaxis.options.mode === 'categories';
          for (var i = 0, len = series.data.length; i < len; i++) {
            var x = series.data[i][0],
                y = series.data[i][1];
            (xCategories) && (x = series.xaxis.categories[x]);
            (yCategories) && (y = series.xaxis.categories[y]);
            var text = y + '',
                metrics = ctx.measureText(text),
                xPos = (xaxis.p2c(x) + offset.left) - metrics.width / 2,
                yPos = yaxis.p2c(y) + offset.top - 5;
            ctx.fillText(text, xPos, yPos);
          }
        });
      }
    }
  }
});
