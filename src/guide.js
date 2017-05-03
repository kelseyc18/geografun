function makeGuideEntry(field,conclusion,reason,imgsrc)
{
  var guide = document.getElementById('guide');
  var row = guide.insertRow(1);

  var cbox = row.insertCell(0);
  var type = row.insertCell(1);
  var text = row.insertCell(2);
  var why  = row.insertCell(3);
  var img = row.insertCell(4);

  cbox.innerHTML = "<input type='checkbox'></input>";
  type.innerHTML = field;
  text.innerHTML = conclusion;
  why.innerHTML = reason;
  img.innerHTML = "<a href="+imgsrc+">img</a>";

  cbox.onclick = function() {updateCountries();};
}

function updateCountries()
{
  // compute the intersection of the current list with the ones from this clue
  // load them and plot
  console.log("hello");
}
