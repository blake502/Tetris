log("Script loaded");

var elementsTable;
var gameTable;
var playerPiecePosition = [0, 0];
var playerPieceRotation = 0;
var playerPieceType = Math.floor(Math.random() * 7);

//Entry point
window.onload = function()
{
    log("Page loaded");
    createGameboard();
}

function playerPieceTryRotate(i)
{
    var originalRotation = playerPieceRotation;
    if(!i)
        var i = 1;
    playerPieceRotation += i;
    playerPieceRotation %= 4;

    for(var y = 0; y < tetrominoes[playerPieceType][playerPieceRotation].length; y++)
        for(var x = 0; x < tetrominoes[playerPieceType][playerPieceRotation][0].length; x++)
        {
            var posY = playerPiecePosition[1] + y;
            var posX = playerPiecePosition[0] + x;
            if(tetrominoes[playerPieceType][playerPieceRotation][y][x] == "#" && gameTable[posY][posX] != 0)
            {
                playerPieceRotation = originalRotation;
                return false;
            }
        }

    placeTilesInElems();
    return true;
}

function playerPieceTryMove(xDir, yDir)
{
    for(var y = 0; y < tetrominoes[playerPieceType][playerPieceRotation].length; y++)
        for(var x = 0; x < tetrominoes[playerPieceType][playerPieceRotation][0].length; x++)
        {
            var posY = playerPiecePosition[1] + y;
            var posX = playerPiecePosition[0] + x;
            if(tetrominoes[playerPieceType][playerPieceRotation][y][x] == "#" && gameTable[posY + yDir][posX + xDir] != 0)
                return false;
        }

        playerPiecePosition[0] += xDir;
        playerPiecePosition[1] += yDir;

    placeTilesInElems();
    return true;
}

//Creates the necessary nested elements for the gameboard
function createGameboard()
{
    var gameTableElem = createElement("div", "game", document.body);
    
    elementsTable = [];
    gameTable = [];

    for(var y = 0; y < 20; y++)
    {
        elementsTable[y] = [];
        gameTable[y] = [];
        for(var x = 0; x < 10; x++)
        {
            elementsTable[y][x] = createElement("div", "tile", gameTableElem);
            gameTable[y][x] = 0;
        }
    }

    placeTilesInElems();
}

function placeTilesInElems()
{
    for(var y = 0; y < 20; y++)
        for(var x = 0; x < 10; x++)
        {
            var color = colorTable[gameTable[y][x]];
            var r = color.r;
            var g = color.g;
            var b = color.b;
            elementsTable[y][x].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")"
        }

    for(var y = 0; y < tetrominoes[playerPieceType][playerPieceRotation].length; y++)
        for(var x = 0; x < tetrominoes[playerPieceType][playerPieceRotation][0].length; x++)
        {
            var posY = playerPiecePosition[1] + y;
            var posX = playerPiecePosition[0] + x;
            if(tetrominoes[playerPieceType][playerPieceRotation][y][x] == "#")
            {
                var color = colorTable[playerPieceType + 1];
                var r = color.r;
                var g = color.g;
                var b = color.b;
                elementsTable[posY][posX].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")"
            }
        }
}

function reset()
{
    gameTable = [];
    for(var y = 0; y < 20; y++)
    {
        gameTable[y] = [];
        for(var x = 0; x < 10; x++)
            gameTable[y][x] = 0;
    }
}

//Creates and element of type elemType, sets className to className, and appends it as a child to parent
function createElement(elemType, className, parent)
{
    var elem = document.createElement(elemType);

    if(className)
        elem.className = className;

    if(parent)
        parent.appendChild(elem);

    return elem;
}

//Alias for console.log
function log(msg)
{
    console.log(msg);
}