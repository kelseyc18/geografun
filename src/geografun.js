function gfStart()
{

  // viewer frame holding the scene window
  viewer = document.getElementById('viewframe');

  // remove the 'play' child from the viewer if it exists
  var play = document.getElementById('play');
  if (play!=undefined)
    viewer.removeChild( document.getElementById('play') );

  if ($('#instruction_button').length) {
    $('#instruction_button').remove()
  }

  // initialize the countries in the guide
  gf.guide = {};
  gf.guide.countries = [];

  // set the image counter and default location (optionally set a new location)
  gfSetLocation();
  gfSetImage();

  // initialize highlighted countries to be empty
  gf.highlighted = [];

  // load country lists associated with each clue option
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

  gf.possibleEntries.push( {name: "Rainforest", list: rainforest_ } );
  gf.possibleEntries.push( {name: "Monsoon", list: monsoon_ });
  gf.possibleEntries.push( {name: "Tropical savanna", list: savanna_ });
  gf.possibleEntries.push( {name: "Humid subtropical", list: humidSubtropical_ });
  gf.possibleEntries.push( {name: "Humid continental ", list: humidContinental_ });
  gf.possibleEntries.push( {name: "Mediterranean climate", list: mediterranean_ });
  gf.possibleEntries.push( {name: "Steppe", list: steppe_ });
  gf.possibleEntries.push( {name: "Subarctic climate", list: subarctic_ });
  gf.possibleEntries.push( {name: "Tundra", list: tundra_ });
  gf.possibleEntries.push( {name: "Polar ice cap", list: polarIceCap_ });
  gf.possibleEntries.push( {name: "North Pole", list: northPole_ });
  gf.possibleEntries.push( {name: "Equator", list: equator_ });
  gf.possibleEntries.push( {name: "South Pole", list: southPole_ });

  gf.possibleEntries.push( {name: "Fishing", list: fishing_ });
  gf.possibleEntries.push( {name: "Agriculture", list: agriculture_ });
  gf.possibleEntries.push( {name: "Tourism", list: tourism_ });
  gf.possibleEntries.push( {name: "Manufacturing", list: manufacturing_ });
  gf.possibleEntries.push( {name: "Mining", list: mining_ });

  gf.possibleEntries.push( {name: "delta", list: delta_ });
  gf.possibleEntries.push( {name: "desert", list: desert_ });
  gf.possibleEntries.push( {name: "glacier", list: glacier_ });
  gf.possibleEntries.push( {name: "geyser", list: geyser_ });
  gf.possibleEntries.push( {name: "mountain", list: mountain_ });

  var eog = document.getElementById("eog");
  var select = document.createElement('select');
  select.id = "selectEOG";
  var countries = getAllCountries();
  for (var i in countries)
  {
    var option = document.createElement('option');
    option.text = countries[i];
    select.appendChild(option);
  }
  var eogPrompt = document.createElement('p');
  eogPrompt.innerHTML = 'Which country do you think this is?';
  eog.appendChild(eogPrompt);
  eog.appendChild(select);

  var makeAGuess = document.createElement('button');
  makeAGuess.id = "makeAGuess";
  makeAGuess.innerHTML = "guess!";
  makeAGuess.onclick = function() {
    if (getEntryCount() < minEntryCount) {
      alert('Please add at least ' + minEntryCount.toString() +
      ' pieces of evidence to your field journal.')
    }
    else {
      checkIfCorrect()
    }
  };

  var nclicks = document.getElementById("numberOfClicks");
  gf.nclicks = 20;
  nclicks.innerHTML = gf.nclicks.toString();

  //ar viewframe = document.getElementById("viewframe");
  viewer.onclick = function() { adjustClicks(); };

  document.body.appendChild(makeAGuess);

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
  if (gf.imageCounter < 0) gf.imageCounter += gf.nscene;
  gf.imageNumber = gf.imageCounter % gf.nscene;

  // set the current image from location and current scene number
  viewer.style.backgroundImage = "url('images/"+gf.location+"/img"+gf.imageNumber.toString()+".png')";
  viewer.style.backgroundSize = "100% 100%";
  viewer.style.backgroundPosition = "0px 0px";
  viewer.backgroundOrigin = "content-box";
  viewer.style.backgroundRepeat = "no-repeat";

  // get the current set of clues and lay them on the image
  gf.currentClues = gf.scene[gf.imageNumber];
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

function submitEvidenceEntry(evidenceWindow,evidence,doc,clueID)
{
  var plotOnSubmit = false;
  if (plotOnSubmit)
    updateCountries(doc.getElementById("evidenceTable"),0,1);

  var evidenceType = doc.getElementById("evidenceType");
  var type = evidenceType[evidenceType.selectedIndex].text; // or use evidence.type

  // get the checked entries
  //var entries = getCheckedEntries(doc.getElementById("evidenceTable"),0,1);
  var entries = getCheckedRows(doc.getElementById("evidenceTable"),0,1);

  var reason = evidenceWindow.prompt("Enter a reason"); // or use evidence.name
  makeGuideEntry(type,entries,reason,evidence.img,clueID);

  evidenceWindow.close();

}

function makeSubmitButton(evidenceWindow,evidence,doc,clueID)
{
  // create a submit button for evidence windows
  var submit = doc.createElement("BUTTON");
  submit.innerHTML = "submit";
  submit.style.width = "30%";
  submit.style.height = "20px";
  submit.style.display = "block";
  doc.body.appendChild(submit);

  submit.onclick = function() {
    submitEvidenceEntry(evidenceWindow,evidence,doc,clueID);
  };

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

  var researchPrompt = doc.createElement('p');
  researchPrompt.innerHTML = 'Do some research!';
  span.appendChild(doc.createElement('hr'));
  span.appendChild(researchPrompt);
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

function makeEvidenceWindow(id,data,clueID)
{
  var evidence = makeWindowAtCenter("","_blank",data.size[0],data.size[1]); //window.open("","evidence","width=200,height=200");

  evidence.document.title = "Evidence";

  var evidenceTypeDiv = evidence.document.createElement('div');
  evidenceTypeDiv.innerHTML = "What type of evidence is this?";
  var select = evidence.document.createElement('select');
  select.id  = "evidenceType";
  var evidenceTypes = ["Linguistic","Cultural","Geologic","Climate","Economic"];
  for (var i in evidenceTypes)
  {
    var option = evidence.document.createElement('option');
    option.innerHTML = evidenceTypes[i];
    select.appendChild(option);
  }
  evidence.document.body.appendChild(evidenceTypeDiv);
  evidence.document.body.appendChild(select);

  fillEvidence(evidence.document,data);

  makeSubmitButton(evidence,data,evidence.document,clueID);
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

function onlyUnique(value, index, self)
{
    return self.indexOf(value) === index;
}

function getAllCountries()
{
  var countries = [];
  for (i in gf.possibleEntries)
  {
    var clist = gf.possibleEntries[i].list;
    for (var j in clist)
    {
      countries.push( clist[j] );
    }
  }
  result = countries.filter(onlyUnique);
  result.sort()
  return result
}

function checkIfCorrect()
{
  var select = document.getElementById("selectEOG");
  var guess = select.value;
  if (gf.location==guess.toLowerCase())
    alert("correct!");
  else
  {
    alert("wrong!");
    location.reload();
  }
}

function adjustClicks()
{
  if (gf.nclicks==1)
  {
    alert("too many clicks!");
    location.reload();
  }
  gf.nclicks--;
  var nclicks = document.getElementById("numberOfClicks");
  nclicks.innerHTML = gf.nclicks.toString();
}
