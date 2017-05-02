function makeGuideEntry()
{
  var guide = document.getElementById('guide');
  var row = guide.insertRow(1);

  var cbox = row.insertCell(0);
  var text = row.insertCell(1);
  var type = row.insertCell(2);

  cbox.innerHTML = "<input type='checkbox'></input>";
  text.innerHTML = "evidence (letters)";
  type.innerHTML = "type (language)";

  cbox.onclick = function() {updateCountries();};
}

function updateCountries()
{
  // compute the intersection of the current list with the ones from this clue
  // load them and plot
  console.log("hello");
}
