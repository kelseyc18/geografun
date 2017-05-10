$(function() {
  $('#selectAllButton').click(function() {
    $('.guide_checkbox').prop('checked', true);
    updateCountries(guide,1,2);
  });

  $('#selectNoneButton').click(function() {
    $('.guide_checkbox').prop('checked', false);
    updateCountries(guide,1,2);
  });
});

function getEntryCount() {
  return $('#guide tr').length - 1
}

function makeGuideEntry(field,conclusion,reason,imgsrc,clueID)
{
  if ($('#' + clueID + '_guide_entry').length) {
    $('#' + clueID + '_guide_entry').remove()
  }

  var guide = document.getElementById('guide');
  var row = guide.insertRow(guide.rows.length);

  var cbox = row.insertCell(0);
  var type = row.insertCell(1);
  var text = row.insertCell(2);
  var why  = row.insertCell(3);
  // var img = row.insertCell(4);
  var del = row.insertCell(4);

  row.setAttribute("id", clueID + '_guide_entry');

  var checkboxID = clueID + "_checkbox";
  // set the row data
  cbox.innerHTML = "<input type='checkbox' id='" + checkboxID + "' class='guide_checkbox'></input>";
  cbox.style.width = "3px";
  cbox.checked = true;
  type.innerHTML = field + ":";
  type.style.fontWeight = "bold";
  text.innerHTML = conclusion;
  why.innerHTML = "<i>Notes:</i> " + reason;
  var delbutton = document.createElement('button');
  delbutton.innerHTML= "delete entry";
  delbutton.onclick = function() { row.parentNode.removeChild(row); };
  del.appendChild(delbutton);

  // image column, open in new tab (hence target='_blank');
  // img.innerHTML = "<a target='_blank' href="+imgsrc+">img</a>";

  $("#" + checkboxID).prop("checked", true);
  updateCountries(guide,1,2);
  cbox.onclick = function() {updateCountries(guide,1,2);};
}

function guideHasCountry(c)
{
  for (var i in gf.guide.countries)
  {
    if (gf.guide.countries[i]==c) return true;
  }
  return false;
}

function entryToCountryList(entry)
{
  for (var i in gf.possibleEntries)
  {
    if (gf.possibleEntries[i].name==entry)
      return gf.possibleEntries[i].list;
  }
  return Array(1); // might want to return undefined but then need to catch these
}

function showCountries(entries)
{
  var newCountries = [];
  for (var i in entries)
  {
    var countries = entryToCountryList(entries[i]);
    for (var j in countries)
    {
      if (guideHasCountry(countries[j]))
      {
        newCountries.push(countries[j]);
      }
    }
  }

  gf.guide.countries = newCountries;
  gf.highlighted = countries;

  updateMap();
}

function updateCountries(table,start,column)
{
  // compute the intersection of the current list with the ones from this clue
  // load them and plot

  // get all the checked rows in the table
  var rows = getCheckedRows(table,start,column);

  // first intersect the countries across each row
  var rowEntries = [];
  for (var r in rows)
  {
    var row = rows[r];

    // get the entry list
    var entries = row;

    if (entries[0]==undefined) continue;

    var list = entryToCountryList( entries[0] );
    for (var e=1;e<entries.length;e++)
    {
      var entry = entries[e];
      list = list.concat(entryToCountryList(entry));
    }
    rowEntries.push(list);
  }

  // intersect the countries resulting in each row
  var entries = rowEntries[0];
  for (var r=1;r<rowEntries.length;r++)
  {
    entries = _.intersection(entries, rowEntries[r])
  }

  // keep this to debug for now
  console.log(entries);

  gf.guide.countries = entries;
  gf.highlighted = entries;
  updateMap();

  // old method
  //var entries = getCheckedEntries(table,start,column);
  //showCountries(entries);

}
