// importing required components
const toggleBtn=document.querySelector(".nav-toggle");
const links=document.querySelector(".links");

const sideBarfetch=document.querySelector(".sideBar-fetch")
const toolsBar=document.querySelector("aside")
const tools=document.querySelectorAll(".tools")
const cancel=document.querySelector(".cancel")
const canvasSection=document.querySelector("#canvas")

const bgColorDiv=document.querySelectorAll(".container-4 div")
const colorInput=document.querySelector(".bg")
const penColorInput=document.querySelector(".penColors");


                 



toggleBtn.addEventListener("click",()=>{
    links.classList.toggle('show-links');
})

sideBarfetch.addEventListener("click",()=>{
    console.log("clicked")

    sideBarfetch.classList.add("hide")
    toolsBar.classList.add("show")
})
 


// Slide ToolBar
cancel.addEventListener("click",slideInTools)

function slideInTools(){
    sideBarfetch.classList.remove("hide")
    tools.forEach((newTool)=>{
        newTool.classList.remove("active")
    })
    toolsBar.classList.remove("show")
}

console.log(tools)

tools.forEach((tool)=>{
    tool.addEventListener("click",()=>{
         tools.forEach((newTool)=>{
             newTool.classList.remove("active")
         })
         
            tool.classList.toggle("active")
         
         
    })
})




// Canvas Code 

const canvas = document.getElementById('canvas');
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');


// variable 
let drawing = false;          // Drawing or not



var pencolor="black"            // Pen Color
var mode="pen"                  //Mode  pen or eraser
var penwidth;                   // Pem Width
var eraserWidth;                //Eraser Width
var penColor="black";            //Pen Color                 Default is Black
var eraserColor;                // Easer Color
var canvasColor="white";   

// Changing Canvas Backgroung Color;
bgColorDiv.forEach((color)=>{
    color.addEventListener("click",()=>{
        canvasColor=color.getAttribute("class")
        console.log(canvasColor)    
      canvasSection.style.backgroundColor=canvasColor;
    })
})

colorInput.addEventListener("blur",()=>{
     console.log("clicked")
     console.log(colorInput.value)
     canvasColor=colorInput.value;
     canvasSection.style.backgroundColor=canvasColor;
})

// Pencolor Change
penColorInput.addEventListener("blur",()=>{
     console.log("clicked")
     console.log(penColorInput.value);
     penColor=penColorInput.value;
})





// Changing Width
function getWidth(){
    penwidth=document.getElementById("penwidth").value; 
    eraserWidth=document.getElementById("eraserWidth").value; 
    
}

//Changing Mode
function changeMode(mod){
    mode=mod;

}

// Mouse  Down
function startPaint(e) {
    slideInTools();
    drawing = true;
    draw(e);
}

// MOuse UP
function endPaint() {
    drawing = false;
    ctx.beginPath();
}

// Gives Position Of Mouse
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}


// Mouse move In Canvas
function draw(e) {
    if (!drawing) return

    var pos = getMousePos(canvas, e);
    ctx.lineWidth = penwidth;               //Line Width
    ctx.lineCap = "round";            //Line side cap

    if(mode=="pen"){   
        getWidth()                         //Update Width
        ctx.strokeStyle = penColor;          // Earser Color Same as BAckgroung

        
        ctx.lineWidth = penwidth;  
        ctx.globalCompositeOperation="source-over";
    
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

    }else{                                          //Earse 

        console.log("Using eraser");
        getWidth();
        ctx.lineWidth = eraserWidth;
        ctx.strokeStyle =canvasColor;          // Earser Color Same as BAckgroung

        ctx.globalCompositeOperation="source-over";
    
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

 
    }
    

}


//Download Board
var button =document.getElementById("save")
button.addEventListener('click', function (e) {

    console.log("Download");

    //Eddge (PG Only)
    if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(canvas.msToBlob(),"whiteBoard.png");
    } else{                     //Chrome
        const a=document.createElement("a");
        document.body.appendChild(a);
        a.href=canvas.toDataURL();
        a.download="whiteBoard.png"
        a.click();
        document.body.removeChild(a);
    }


});

//Clear Page 
const clearBoard=document.getElementById('clearAll')
clearBoard.addEventListener("click",clearCanvas)
function clearCanvas() {
    var txt;
    var r = confirm("Do you really want to clear the board?");
    if (r == true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

}

// Reload,Tab Close or Browser Alert 
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});




//Events
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mousemove", draw)
