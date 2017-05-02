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

  // set onclick function for clue

  viewer.appendChild(box);

}

function gfLayClues(clues)
{
  for (i in clues)
  {
    var clue = clues[i];
    console.log(clue);
    console.log("laying clue at "+clue.position);

    makeClue(clue);
  }
}
