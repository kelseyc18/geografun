/*\
 *
 * events
 *
\*/

function rightArrowClicked()
{
  gf.imageCounter++;
  removeClues();
  gfSetImage();
}

function leftArrowClicked()
{
  gf.imageCounter--;
  removeClues();
  gfSetImage();
}
