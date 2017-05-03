/*\
 * map functions
 *
\*/
$(function() {
 var palette = ['#66C2A5', '#FC8D62', '#8DA0CB', '#E78AC3', '#A6D854'];
 generateColours = function(){
   var colors = {}, key;

   for (key in map.regions) {
     if (gfHighlighted( map.regions[key].config.name ) )
        colors[key] = palette[0];
     else {
        colors[key] = palette[1];
      }
   }
     return colors;
   }, map;

  // create the map
  map = new jvm.Map
  (
    {
      map: 'world_mill',
      container: $('#map'),
      series:
      {
        regions:
        [
          {
            attribute: 'fill'
          }
        ]
      }
    }
  );

  // set the map colours
  map.series.regions[0].setValues(generateColours());
})
