function makeClue(clue)
{

  // get the parent viewer frame
  var viewer = document.getElementById('viewframe');

  // create a box to click on & set the style
  var box = document.createElement('div');
  box.id = clue.tag;
//  box.style.border = "1px solid red"; // red for now until release
  box.style.position = "absolute";
  box.style.width = clue.position[2]+"%";
  box.style.height = clue.position[3]+"%";
  box.style.zIndex = 1;
  box.style.left = clue.position[0]+"%";
  box.style.top = clue.position[1]+"%";
  box.style.display = "block";

  // when clue is clicked, open an evidence window
  box.onclick = function() { makeVisible(box);makeEvidenceWindow(clue.tag,clue.data,clue.tag); };

  // add the clue as a child to the viewer frame
  viewer.appendChild(box);

}

function makeVisible(box)
{
  box.style.border = "1px solid red";
}

function removeClues()
{
  // get the viewer to delete the clues
  var viewer = document.getElementById('viewframe');

  // loop through the clues in the current scene
  for (i in gf.currentClues.clues)
  {
    // delete!
    clue = gf.currentClues.clues[i];
    var node = document.getElementById(clue.tag);
    viewer.removeChild(node);
  }
}

function gfLayClues(clues)
{
  for (i in clues)
  {
    var clue = clues[i];
    makeClue(clue);
  }
}
