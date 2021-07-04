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
toggleBtn.addEventListener("click",()=>{
    links.classList.toggle('show-links');
})

sideBarfetch.addEventListener("click",()=>{
    console.log("clicked")

    sideBarfetch.classList.add("hide")
    toolsBar.classList.add("show")
})
 
cancel.addEventListener("click",()=>{
    sideBarfetch.classList.remove("hide")
    tools.forEach((newTool)=>{
        newTool.classList.remove("active")
    })
    toolsBar.classList.remove("show")
})
console.log(tools)

tools.forEach((tool)=>{
    tool.addEventListener("click",()=>{
         tools.forEach((newTool)=>{
             newTool.classList.remove("active")
         })
         
            tool.classList.toggle("active")
         
         
    })
})


console.log(colorInput)




bgColorDiv.forEach((color)=>{
    color.addEventListener("click",()=>{
        const c=color.getAttribute("class")
        console.log(c)

      canvasSection.style.backgroundColor=c
    })
})

colorInput.addEventListener("blur",()=>{
     console.log("clicked")
     console.log(colorInput.value)
     canvasSection.style.backgroundColor=colorInput.value
})



// Canvas



const canvas = document.getElementById('canvas');
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
let drawing = false;
// variable 



var pencolor="black"            // Pen Color
var mode="pen"                  //Mode  pen or eraser





function changeWidth(){
    var penwidth=document.getElementById("penwidth").value; 
    eraserWidth=document.getElementById("eraserWidth").value; 
    
}
function changeMode(mod){
    mode=mod;

}

function startPaint(e) {

    drawing = true;
    draw(e);
}

function endPaint() {
    drawing = false;
    ctx.beginPath();
}

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
function draw(e) {
    if (!drawing) return

    var pos = getMousePos(canvas, e);
    ctx.lineWidth = penwidth;               //Line Width
    ctx.lineCap = "round";            //Line side cap

    if(mode=="pen"){                            //Pen

        ctx.lineWidth = penwidth;  
        ctx.globalCompositeOperation="source-over";
    
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

    }else{                                          //Earse 
        console.log("Using eraser");
        ctx.globalCompositeOperation="destination-out";
        
        ctx.arc(pos.x, pos.y,eraserWidth,0,Math.PI*2,false);
        ctx.fill();

 
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



//Events
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mousemove", draw)
