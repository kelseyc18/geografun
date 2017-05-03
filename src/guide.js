function makeGuideEntry(field,conclusion,reason,imgsrc)
{
  var guide = document.getElementById('guide');
  var row = guide.insertRow(1);

  var cbox = row.insertCell(0);
  var type = row.insertCell(1);
  var text = row.insertCell(2);
  var why  = row.insertCell(3);
  var img = row.insertCell(4);

  // set the row data
  cbox.innerHTML = "<input type='checkbox'></input>";
  type.innerHTML = field;
  text.innerHTML = conclusion;
  why.innerHTML = reason;

  // image column, open in new tab (hence target='_blank');
  img.innerHTML = "<a target='_blank' href="+imgsrc+">img</a>";

  cbox.onclick = function() {updateCountries();};
}

function guideHasCountry(c)
{
  for (var i in gf.guide.countries)
  {
    if (gf.guide.countries[i]==c) return true;
  }
  return false;
}

function updateCountries(evidence)
{
  // compute the intersection of the current list with the ones from this clue
  // load them and plot
  var countries = getCheckedCountries(evidence);
  var newCountries = [];
  for (var i in countries)
  {
    if (guideHasCountry(countries[i]))
    {
      newCountries.push(countries[i]);
    }
  }

  // TODO: convert result to countries (i.e. hinduism is not a country :P)
  gf.guide.countries = newCountries;
  gf.highlighted = countries;

  console.log(gf.highlighted);

}
