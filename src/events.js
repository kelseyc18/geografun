/*\
 *
 * events
 *
\*/

function rightArrowClicked()
{
  // check if we hit the number of scenes for this location
  if (gf.imageCounter==gf.nscene) return;
  gf.imageCounter++;
  removeClues();
  gfSetImage();
}

function leftArrowClicked()
{
  // check if this is the first scene
  if (gf.imageCounter==0) return;
  gf.imageCounter--;
  removeClues();
  gfSetImage();
}
