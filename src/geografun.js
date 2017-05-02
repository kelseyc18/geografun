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

  gf.currentClues = sceneClues1;
  console.log(gf.currentClues.clues);

  gfAddArrow(false);
  gfAddArrow(true);

}

function loadJSON(file,callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file , true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200")
    {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

function gfClickImage(x)
{
  for (c in gf.currentClues)
  {
    // check if the mouseclick is close to c

  }
}
