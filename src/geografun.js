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

  // these should be in different functions
  gf.highlighted = ["Canada","Russia","Cuba","Belgium"];
  makeGuideEntry("linguistic","latin","street sign","images/arrow.png");
  makeGuideEntry("religious","christian","church","images/arrow.png");

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

  if (data.image!=null)
  {
    // display the image
  }

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
}

// function to make a window centered on screen
// supports dual screen configuration
function makeWindowAtCenter(url, title, w, h) {
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

function getCheckedCountries(evidence)
{
  t = evidence.getElementById("evidenceTable");

  var countries = [];

  for (var i=0,row;row=t.rows[i];i++)
  {
    var c = row.cells[1];
    var j = row.cells[0];
    if (j.children[0].checked)
      countries.push(c.innerHTML);
  }
  return countries;
}

function makeSubmitButton(doc)
{
  // create a submit button for evidence windows
  var submit = doc.createElement("BUTTON");
  submit.innerHTML = "submit";
  submit.style.width = "50px";
  submit.style.height = "20px";
  submit.style.display = "block";
  doc.body.appendChild(submit);

  submit.onclick = function() { updateCountries(doc); };
  map.series.regions[0].setValues(generateColours());
}

function makeEvidenceWindow(data)
{
  console.log(data);
  var evidence = makeWindowAtCenter("","evidence",data.size[0],data.size[1]); //window.open("","evidence","width=200,height=200");

  evidence.document.title = "Evidence";

  fillEvidence(evidence.document,data);

  makeSubmitButton(evidence.document);

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
