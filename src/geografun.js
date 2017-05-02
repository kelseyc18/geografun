function gfStart()
{

  viewer = document.getElementById('viewframe');

  // remove the 'play' child from the viewer
  viewer.removeChild( document.getElementById('play') );

  // figure out a location

  // set the first image


//  viewer.style.backgroundImage = "url('images/iceland/img1.png')";

  // set the image counter and default location (optionally set a new location)
  gf.imageCounter = 1;
  gf.location = gfRandomLocation();
  gfSetImage();

  makeGuideEntry();
  makeGuideEntry();

}

function gfRandomLocation()
{
  return "iceland";
}

function gfAddArrow(left=false)
{
  viewer = document.getElementById('viewframe');

  var ar = document.createElement('div');
  if (left)
    ar.id = 'arrowleft';
  else
    ar.id = 'arrowright';
  ar.style.background = "url('images/arrow.png') right center no-repeat";
  if (left)
  {
    ar.style.webkitTransform = "rotate(180deg)";
    ar.style.bottom = "50px";
  }
  ar.style.backgroundSize = "contain";
  ar.style.position = "relative";
  ar.style.height = "50px";
  ar.style.zIndex = 10;
//  ar.style.bottom = "-50px";

  viewer.appendChild(ar);
}

function gfSetImage()
{
  viewer.style.backgroundImage = "url('images/"+gf.location+"/img"+gf.imageCounter.toString()+".png";
  viewer.style.backgroundSize = "cover";

  gf.currentClues = iceland.scene[0];
  console.log(gf.currentClues.clues);

  gfLayClues(gf.currentClues.clues);

  gfAddArrow(false);
  gfAddArrow(true);

}

function makeClue(clue)
{
  var viewer = document.getElementById('viewframe');

  var box = document.createElement('div');
  box.style.border = "1px solid red";
  box.style.position = "relative";
  box.style.width = clue.position[2]+"px";
  box.style.height = clue.position[3]+"px";
  box.style.zIndex = 1;

  box.style.left = clue.position[0]+"px";
  box.style.top = clue.position[1]+"px";
  box.style.display = "block";

  box.onclick = function() { makeEvidenceWindow(clue.data); };
  //box.data = clue.data;

  // set onclick function for clue
  //setEvidenceWindow(box,clue.data);

  viewer.appendChild(box);

}

function fillEvidence(doc,data)
{
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

function makeWindowAtCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
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

function makeSubmitButton(doc)
{
  var submit = doc.createElement("BUTTON");
  submit.innerHTML = "submit";

  submit.style.width = "50px";
  submit.style.height = "20px";
  submit.style.display = "block"; // for centering


  doc.body.appendChild(submit);

  gf.highlighted = ["Canada","Russia","Cuba","Belgium"];

  map.series.regions[0].setValues(generateColors());
}

function makeEvidenceWindow(data)
{
  console.log(data);
  var evidence = makeWindowAtCenter("","evidence",data.size[0],data.size[1]); //window.open("","evidence","width=200,height=200");

  evidence.document.title = "Evidence";

  fillEvidence(evidence.document,data);

  makeSubmitButton(evidence.document);

}

function gfLayClues(clues)
{
  for (i in clues)
  {
    var clue = clues[i];
    makeClue(clue);
  }
}

function gfHighlighted(country)
{
  for (i in gf.highlighted)
  {
    if (country==gf.highlighted[i])
      return true;
  }
  return false;
}
