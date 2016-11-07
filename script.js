var puzzlePieces = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""];

var originalPuzzlePieces = puzzlePieces;
var emptySquare = 0, totalRows = 4, totalCols = 4, nRow, nCol;
var nSquare = 4;
var timer = 0, iTimer, numberOfSteps = 0;

function init()
{
    printTable(puzzlePieces);
}

function shuffleAndCreatePuzzle()
{
    document.getElementById("pButton").innerHTML= "Restart";
    printTable(puzzlePieces.sort(function(a, b){return 0.5 - Math.random()}));
    var solvableEmptyPos = [0,2,5,7,8,10,13,15], solvable = false;
    for(var i = 0; i<solvableEmptyPos.length; i++)
    {
        if(emptySquare == solvableEmptyPos[i])
        {
            solvable = true;
            break;
        }
    }

    if(!solvable) {shuffleAndCreatePuzzle(); console.log("Not Solvable");}
    
    timer = 0; numberOfSteps = 0;
    clearInterval(iTimer);
    document.getElementById("pSteps").innerHTML = "";    
    iTimer = setInterval(startTimer, 1000);
}

function printTable(thisPuzzleOrder)
{
    var table = document.getElementById("pTable");
    table.innerHTML = "";

    var row, cPiece, k = 0;

    for(var i = 0; i < nSquare; i++)
    {
        row = table.insertRow(i);
        for(var j = 0; j < nSquare; j++)
        {
            cPiece = row.insertCell(j);
            cPiece.tags=k;
            cPiece.id="c"+k; 
            cPiece.innerHTML = "<td>" + thisPuzzleOrder[k] + "</td>";
            cPiece.onclick = function (){cellClicked(this);};
            cPiece.onmouseover = function() {highlightIfValid(this);};
			cPiece.onmouseout = function() {removeHighlight(this);};
            if(thisPuzzleOrder[k] == "")
            {
                cPiece.id="emptySquare";
                emptySquare = k;
            }
            k++;
        }
    }
}

function cellClicked(cell)
{
    nRow = parseInt(cell.tags / totalRows);
    nCol = cell.tags % totalCols;
    emptyRow = parseInt(emptySquare/totalRows);
    emptyCol = emptySquare % totalCols;

    console.log("Cell Col :" + nCol +"\nEmptyCol : "+ emptyCol);

    if(cell.tags == emptySquare)
    {
        console.log("This step is not to be counted");
        alert("You can't move the empty square");
    }

    else if(emptyRow == nRow)
    {
        numberOfSteps++;        
        console.log("Movable, Same Row");
        if(nCol < emptyCol)
        {
            slideRowLeft(cell, nCol, emptyCol);
        }
        else
        {
            slideRowRight(cell, nCol, emptyCol);
        }
    }

    else if(emptyCol == nCol)
    {
        numberOfSteps++;    
        console.log("Movable, Same Cols");
        if(nRow < emptyRow)
        {
            slideColDown(cell, nRow, emptyRow);
        }
        else
        {
            slideColUp(cell, nRow, emptyRow);
        }
    }

    if(puzzlePieces[puzzlePieces.length-1] == "")
    {
        var puzzleSolved = false;
        for(var i = 0, j = 1 ; i < puzzlePieces.length - 1; i++, j++)
        {
                console.log("j=" +j+"\nPuzzlePiece="+typeof parseInt(puzzlePieces[i]));
            
            if(j != parseInt(puzzlePieces[i]))
            {
                console.log("j=" +j+"\nPuzzlePiece="+puzzlePieces[i]);
                puzzleSolved = false;
                break;
            }                  
        }

        if(puzzleSolved)
        {
            alert("You solved the puzzle.");
        }    
    }
    
    document.getElementById("pSteps").innerHTML = numberOfSteps + " steps taken.";
}  

function slideRowLeft(cell, nCol, emptyCol)
{
    console.log("sliding left");
    
    for(var i = emptyCol; i > nCol; i--)
    {
        console.log("Empty:" + emptySquare);
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare-1];
        puzzlePieces[emptySquare-1] = "";
        emptySquare--;
    }

    printTable(puzzlePieces);
}

function slideRowRight(cell, nCol, emptyCol)
{
    console.log("sliding right");
    for(var i = emptyCol; i < nCol; i++)
    {
        console.log("Empty:" + emptySquare);
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare+1];
        puzzlePieces[emptySquare+1] = "";
        emptySquare++;
    }

    printTable(puzzlePieces);
}

function slideColUp(cell, nRow, emptyRow)
{
    console.log("sliding up");
    for(var i = emptyRow; i < nRow; i++)
    {
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare + nSquare];
        puzzlePieces[emptySquare + nSquare] = "";
        emptySquare += nSquare;
    }
    printTable(puzzlePieces);
}

function slideColDown(cell, nRow, emptyRow)
{
    console.log("sliding down");
    for(var i = emptyRow; i > nRow; i--)
    {
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare - nSquare];
        puzzlePieces[emptySquare - nSquare] = "";
        emptySquare -= nSquare;
    }
    printTable(puzzlePieces);
}

function startTimer()
{
    timer++;
    if(timer <= 60)
    {
        document.getElementById("pTimer").innerHTML = "Time Elapsed = " + timer + " seconds.";         
    }
    else
    {
        document.getElementById("pTimer").innerHTML = "Time Elapsed = " + parseInt(timer/60) + " minute " + timer%60 + " second.";                 
    }
}

//function to highlight cell on hover if its movable -Harika

function highlightIfValid(cell) {
	nRow = parseInt(cell.tags / totalRows);
    nCol = cell.tags % totalCols;
    emptyRow = parseInt(emptySquare/totalRows);
    emptyCol = emptySquare % totalCols;

    console.log("Cell Col :" + nCol +"\nEmptyCol : "+ emptyCol);

    if(emptyRow == nRow)
    {
       //highlight on hover
	   cell.className += " highlightTile";
	 
    }
	if(emptyCol == nCol){
		cell.className += " highlightTile";
	}

	}
//remove highlight
function removeHighlight(cell) {
				var className =cell.className;
				className = className.replace(" highlightTile","");
				cell.className = className;
}
			
//end -Harika

//function to change background of tiles
function changeBg(){
				var option = document.getElementById("bg");
				var val = option.options[option.selectedIndex].value;
				var body = document.getElementsByTagName('body')[0];
				if(val==0){
					changeStyleSheet("style0.css") ;
				} 
				else if(val==1){
					changeStyleSheet("style1.css") ;
				}
				else if(val==2){
					changeStyleSheet("style2.css") ;
				}
				else if(val==3){
					changeStyleSheet("style3.css") ;
				} 
			}
			
//function to change stylesheet
function changeStyleSheet(sheet) {
    document.getElementById("style").setAttribute("href", sheet);  
}
