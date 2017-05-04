function gfStart()
{

  // viewer frame holding the scene window
  viewer = document.getElementById('viewframe');

  // remove the 'play' child from the viewer if it exists
  var play = document.getElementById('play');
  if (play!=undefined)
    viewer.removeChild( document.getElementById('play') );

  // initialize the countries in the guide
  gf.guide = {};
  gf.guide.countries = [];

  // set the image counter and default location (optionally set a new location)
  gfSetLocation();
  gfSetImage();

  // initialize highlighted countries to be empty
  gf.highlighted = [];

  // load the possible entries
  gf.possibleEntries = [];
  gf.possibleEntries.push( {name: "Hinduism", list: hinduism_ } );
  gf.possibleEntries.push( {name: "Islam", list: islam_ } );
  gf.possibleEntries.push( {name: "Christianity", list: christianity_ } );
  gf.possibleEntries.push( {name: "Judaism", list: judaism_ } );

  gf.possibleEntries.push( {name: "English", list: english_ } );
  gf.possibleEntries.push( {name: "Spanish", list: spanish_ } );
  gf.possibleEntries.push( {name: "French", list: french_ } );
  gf.possibleEntries.push( {name: "Icelandic", list: icelandic_ } );
  gf.possibleEntries.push( {name: "Dutch", list: dutch_ } );
  gf.possibleEntries.push( {name: "German", list: german_ } );
  gf.possibleEntries.push( {name: "Swedish", list: swedish_ } );
  gf.possibleEntries.push( {name: "Hebrew", list: hebrew_ } );
  gf.possibleEntries.push( {name: "Japanese", list: japanese_ } );


  console.log(gf.possibleEntries);

}

function gfSetLocation()
{
  // set a 'random' location
  // here we only use iceland
  gf.imageCounter = 0;
  gf.location = "iceland";
  gf.nscene = iceland.nscene;
  gf.scene = iceland.scene;
}

function gfSetImage()
{
  // set the current image from location and current scene number
  viewer.style.backgroundImage = "url('images/"+gf.location+"/img"+gf.imageCounter.toString()+".png')";
  viewer.style.backgroundSize = "100% 100%";
  viewer.style.backgroundPosition = "0px 0px";
  viewer.backgroundOrigin = "content-box";
  viewer.style.backgroundRepeat = "no-repeat";

  // get the current set of clues and lay them on the image
  gf.currentClues = gf.scene[gf.imageCounter];
  gfLayClues(gf.currentClues.clues);

}

function fillEvidence(doc,data)
{
  doc.body.style.fontFamily = 'Ubuntu, sans-serif';

  text = doc.createElement("p");
  text.innerHTML = data.text;
  doc.body.appendChild(text);

  if (data.list!=null)
  {
    // display the list as radio boxes
    // make a table
    var t = doc.createElement('table');
    t.id = "evidenceTable";
    list = data.list;

    for (i in list)
    {
      item = list[i];
      var row = t.insertRow(i);
      var cbox = row.insertCell(0);
      var text = row.insertCell(1);

      cbox.innerHTML = "<input type='checkbox'></input>";
      text.innerHTML = item;
    }
    doc.body.appendChild(t);

  }

  if (data.img!=null)
  {
    // display the image
    var img = doc.createElement('img');
    img.src = data.img;
    img.style.display = 'inline-block';
  }
}

// function to make a window centered on screen
// supports dual screen configuration
function makeWindowAtCenter(url, title, w, h)
{
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
    return newWindow;
}

function getCheckedEntries(t,start,column)
{
  var entries = [];

  for (var i=start,row;row=t.rows[i];i++)
  {
    var c = row.cells[column];
    var j = row.cells[0];
    if (j.children[0]==undefined) continue;
    if (j.children[0].checked)
    {
      var text = c.innerHTML.split(',');
      for (var k in text)
      {
        // split c at commas
        entries.push(text[k]);
      }
    }
  }
  return entries;
}

function getCheckedRows(t,start,column)
{
  var rows = [];

  for (var i=start,row;row=t.rows[i];i++)
  {
    var c = row.cells[column];
    var j = row.cells[0];
    if (j.children[0]==undefined) continue;
    if (j.children[0].checked)
    {
      rows.push(row.cells[column].innerHTML.split(','));
    }
  }
  return rows;
}

function submitEvidenceEntry(evidence,doc)
{
  var plotOnSubmit = false;
  if (plotOnSubmit)
    updateCountries(doc.getElementById("evidenceTable"),0,1);

  var evidenceType = doc.getElementById("evidenceType");
  var type = evidenceType[evidenceType.selectedIndex].text; // or use evidence.type

  // get the checked entries
  var entries = getCheckedEntries(doc.getElementById("evidenceTable"),0,1);

  var reason = prompt("Enter a reason"); // or use evidence.name
  makeGuideEntry(type,entries,reason,evidence.img);

}

function makeSubmitButton(evidence,doc)
{
  // create a submit button for evidence windows
  var submit = doc.createElement("BUTTON");
  submit.innerHTML = "submit";
  submit.style.width = "30%";
  submit.style.height = "20px";
  submit.style.display = "block";
  doc.body.appendChild(submit);

  submit.onclick = function() { submitEvidenceEntry(evidence,doc); };

  updateMap();
}

function researchSelection(doc,info)
{
  var research = doc.getElementById('researchDropdown');
  var idx = research.selectedIndex;

  var link = info[idx].link;
  makeWindowAtCenter(link,info[idx].name,600,600);
}

function makeResearchButton(data,doc)
{

  var span = doc.createElement('span');

  // create a submit button for evidence windows
  var research = doc.createElement('select');
  research.id = 'researchDropdown';

  var info = data.research;

  research.innerHTML = "Research";

  for (var i in info)
  {
    var r = info[i];
    var option = doc.createElement('option');
    option.innerHTML = r.name;
    research.appendChild(option);
  }

  span.appendChild(research);

  var button = doc.createElement('button');
  button.innerHTML = "research";
  button.style.width = "100px";
  button.style.height = "20px";
  button.style.display = "block";

  button.onclick = function() {researchSelection(doc,info); };

  span.appendChild(button);

  doc.body.appendChild(span);
}

function makeEvidenceWindow(id,data)
{
  var evidence = makeWindowAtCenter("","_blank",data.size[0],data.size[1]); //window.open("","evidence","width=200,height=200");

  evidence.document.title = "Evidence";

  var select = evidence.document.createElement('select');
  select.id  = "evidenceType";
  var evidenceTypes = ["Linguistic","Religious","Geologic","Climate","Economic"];
  for (var i in evidenceTypes)
  {
    var option = evidence.document.createElement('option');
    option.innerHTML = evidenceTypes[i];
    select.appendChild(option);
  }
  evidence.document.body.appendChild(select);

  fillEvidence(evidence.document,data);

  makeSubmitButton(data,evidence.document);
  makeResearchButton(data,evidence.document);
}

// function returning boolean if a country should be highlighted
function gfHighlighted(country)
{
  for (i in gf.highlighted)
  {
    if (country==gf.highlighted[i])
      return true;
  }
  return false;
}
