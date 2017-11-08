for (var i=0; i<25; i++){
    document.getElementById('game').innerHTML+='<div class=block id='+i+'></div>';
}

var blocks = document.getElementsByClassName('block')

blocks[10].innerHTML=startWord[0]
blocks[11].innerHTML=startWord[1]
blocks[12].innerHTML=startWord[2]
blocks[13].innerHTML=startWord[3]
blocks[14].innerHTML=startWord[4]

currentWord = ''
var redBlocks = [0,1,2,3,4,20,21,22,23,24]
var blueBlocks = [5,6,7,8,9,15,16,17,18,19]
var letterBlocks = [10,11,12,13,14]
Paint(redBlocks,blueBlocks,letterBlocks)
var addedLetters = 0
var newBlocks = []
var elementId=25
var prevElement = 30
var settedSymbol = 0


//клик по игровому полю
document.getElementById('game').onclick = function(event){
    if (event.target.className=='block'){
        if (event.target.innerHTML=='' && event.target.style.background === '' && addedLetters===0) { //выбор клетки без буквы
                elementId=event.target.id
                PopUpShow()
            }
            //окраска поля(выбор букв для подтверждения)
        else if (document.getElementsByClassName('block')[event.target.id].style.background=='' && event.target.innerHTML!='' && (prevElement==30 || event.target.id==prevElement-5|| event.target.id==parseInt(prevElement,10)+parseInt(5,10)|| event.target.id==prevElement-1|| event.target.id==parseInt(prevElement,10)+parseInt(1,10))  ) {
             //первое выделение блока
            if (event.target.id===elementId) {
              settedSymbol = 1
            }
            var bg = document.getElementById(event.target.id)
            prevElement = event.target.id
            bg.style.background='#68a072'
            currentWord+=event.target.innerHTML
            document.getElementsByClassName('b-container')[0].innerHTML=currentWord
        }
    }
}



function Paint(redBlocks,blueBlocks,letterBlocks) {
    //Окраска запрещенных блоков
    for (var i=0; i<25; i++){
        if (in_array(i,redBlocks))
        {   //redblocks
            blocks[i].style.background='#bccce5'
        }
    }
}

//function makeWellForClient(redBlocks,blueBlocks,letterBlocks)

function Clear(letterBlocks,elementId,newBlocks) {
    document.getElementsByClassName('b-container')[0].innerHTML=''
    currentWord = ''
    prevElement =30
    settedSymbol = 0
    //очистка буквенных блоков от заливки цветом выбора
    for (var i=0; i<25; i++){
        if (in_array(i,letterBlocks))
        {
            blocks[i].style.background=''
        }
    }
    //очистка окрашенной

    //удаление добавленной буквы
    delElem(elementId,letterBlocks)
    blocks[elementId].innerHTML=''
    addedLetters=0

    //Очистка новых добавленных блоков
    console.log(newBlocks)
    for (var i=0; i<newBlocks.length; i++){
        blocks[newBlocks[i]].style.background='#bccce5'
        delElem(newBlocks[i],blueBlocks)
        redBlocks.push(newBlocks[i])
    }
}
//клик по алфавитной сетке
document.getElementById('popup1').onclick = function(event){
    if (event.target.innerHTML.length===1){
        symbol = event.target.innerHTML
        blocks[elementId].innerHTML=symbol
        letterBlocks.push(elementId)
        PopUpHide();
        addedLetters++;
        PaintNew(elementId,blueBlocks,redBlocks)
    }
}

//при постановке новой буквы окрашиваются блоки
function PaintNew(elementId,blueBlocks,redBlocks){
    newBlocks = []
    if (elementId>4 && elementId<10) {
        blueBlocks.push(elementId-5)
        newBlocks.push(elementId-5)
        delElem(elementId-5,redBlocks)
    }
    else if (elementId>14 && elementId<20) {
        numberFive = parseInt(5,10)
        blueBlocks.push(parseInt(elementId,10)+numberFive)
        newBlocks.push(parseInt(elementId,10)+numberFive)
        delElem(parseInt(elementId,10)+numberFive,redBlocks)
    }
    else if (((elementId>20) && (elementId<24)) ||((elementId>0) && (elementId<4)) ){
        numberOne = parseInt(1,10)
        blueBlocks.push(parseInt(elementId,10)+numberOne)
        blueBlocks.push(parseInt(elementId,10)-numberOne)
        newBlocks.push(parseInt(elementId,10)-numberOne)
        newBlocks.push(parseInt(elementId,10)-numberOne)
        delElem(parseInt(elementId,10)+numberOne,redBlocks)
        delElem(parseInt(elementId,10)-numberOne,redBlocks)
    }
    else if ((elementId==24)){
        numberOne = parseInt(1,10)
        blueBlocks.push(parseInt(elementId,10)-numberOne)
        newBlocks.push(parseInt(elementId,10)-numberOne)
        delElem(parseInt(elementId,10)-numberOne,redBlocks)
    }
    else if ((elementId==20)){
        numberOne = parseInt(1,10)
        blueBlocks.push(parseInt(elementId,10)+numberOne)
        newBlocks.push(parseInt(elementId,10)+numberOne)
        delElem(parseInt(elementId,10)+numberOne,redBlocks)
    }
    else if ((elementId==0)){
        numberOne = parseInt(1,10)
        blueBlocks.push(parseInt(elementId,10)+numberOne)
        newBlocks.push(parseInt(elementId,10)+numberOne)
        delElem(parseInt(elementId,10)+numberOne,redBlocks)
    }
    else if ((elementId==4)){
        numberOne = parseInt(1,10)
        blueBlocks.push(parseInt(elementId,10)-numberOne)
        newBlocks.push(parseInt(elementId,10)-numberOne)
        delElem(parseInt(elementId,10)-numberOne,redBlocks)
    }

//окраска поставленных блоков синим цветом
    for (var i=0; i<25; i++){
        if (in_array(i,blueBlocks))
        {
            blocks[i].style.background=''
        }
    }

}

/*s
var startBlocks = document.getElementsByClassName('block')
startBlocks[10].innerHTML='Б'
startBlocks[11].innerHTML='А'
startBlocks[12].innerHTML='Л'
startBlocks[13].innerHTML='Д'
startBlocks[14].innerHTML='А'
var unAllowedBlocks = [0,1,2,3,4,24,23,22,21,20]
var allowedBlocks = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
var letterBlocks = [10,11,12,13,14]
var currentWord ='';
var tempArr = [];
for (var i = 0, len = unAllowedBlocks.length; i < len; i++) {
            document.getElementsByClassName('block')[unAllowedBlocks[i]].style.background='red'
        }
//кликаем по ячейке в поле
document.getElementById('game').onclick = function(event){
    if (event.target.className=='block'){
        if (event.target.innerHTML=='') { //выбор клетки без буквы
        if (in_array(event.target.id,unAllowedBlocks))
        {
            elementId=event.target.id
            PopUpShow()
        }
            }
            //окраска поля(выбор букв для подтверждения)
        else if (document.getElementsByClassName('block')[event.target.id].style.background=='') {
             //первое выделение блока
            var bg = document.getElementById(event.target.id)
            bg.style.background='#ced6e2'
            currentWord+=event.target.innerHTML
            document.getElementsByClassName('b-container')[0].innerHTML=currentWord
        }
    }
}
//клик по алфавитной сетке
document.getElementById('popup1').onclick = function(event){
    console.log(event)
    if (event.target.innerHTML.length==1){
        symbol = event.target.innerHTML
        var allblock = document.getElementsByClassName('block')
        allblock[elementId].innerHTML=symbol
        letterBlocks.push(elementId)
        tempArr=Paint(elementId,allowedBlocks,unAllowedBlocks)
        alert(tempArr)
        allowedBlocks=tempArr[0]
        unAllowedBlocks=tempArr[1]
        PopUpHide();
    }
}
//функция очистки
function Clear(notAllowedArr,allowedArr)
    {
    for (var i = 0, len = notAllowedArr.length; i < len; i++) {
            document.getElementsByClassName('block')[notAllowedArr[i]].style.background='red'
        }
    for (var i = 0, len = allowedArr.length; i < len; i++) {
            document.getElementsByClassName('block')[allowedArr[i]].style.background=''
        }

    currentWord=''
    document.getElementsByClassName('b-container')[0].innerHTML=currentWord
    }
//функция окраски после добавления
function Paint(elementId,allowedArr,notAllowedArr){
    var arrForReturn =[]
    if ((elementId<10) && (elementId>4)){
        allowedArr.push(elementId-5)
        delElem(elementId-5,notAllowedArr)
        document.getElementsByClassName('block')[elementId-5].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if ((elementId>14) && (elementId<20)){
        elementId=parseInt(elementId,10)+parseInt(5,10)
        allowedArr.push(elementId)
        delElem(elementId,notAllowedArr)
        document.getElementsByClassName('block')[elementId].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if (((elementId>20) && (elementId<24)) ||((elementId>1) && (elementId<4)) ){
        elementId=parseInt(elementId,10)+parseInt(1,10)
        allowedArr.push(elementId)
        allowedArr.push(elementId-2)
        delElem(elementId,notAllowedArr)
        delElem(elementId-2,notAllowedArr)
        document.getElementsByClassName('block')[elementId].style.background=''
        document.getElementsByClassName('block')[elementId-2].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if ((elementId==24)){
        allowedArr.push(elementId-1)
        delElem(elementId-1,notAllowedArr)
        document.getElementsByClassName('block')[elementId-1].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if ((elementId==20)){
        allowedArr.push(21)
        delElem(21,notAllowedArr)
        document.getElementsByClassName('block')[21].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if ((elementId==0)){
        allowedArr.push(1)
        delElem(1,notAllowedArr)
        document.getElementsByClassName('block')[1].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else if ((elementId==4)){
        allowedArr.push(3)
        delElem(3,notAllowedArr)
        document.getElementsByClassName('block')[3].style.background=''
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }
    else {
        arrForReturn.push(allowedArr,notAllowedArr)
        return arrForReturn
    }

}
*/
//функция проверки кода
function in_array(value, array)
{
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == value) return true;
    }
    return false;
}

function delElem(elem,array){
    for(var i = array.length - 1; i >= 0; i--) {
        if(array[i] === elem) {
           array.splice(i, 1);
        }
    }
}

function elemNumber(value, array)
{
    for(var i = 0; i < array.length; i++)
    {
        newlocaldata = array[i].replace('"','');

        if(newlocaldata === value) return i;
    }
    return false;
}
function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
}
