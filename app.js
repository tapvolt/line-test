
const page = {

    // GUI
    parameters: {
        maxLines: 0,
        direction: "Horizontal"
    },

    // A3
    paper: {
        width: 3508,
        height: 4960,
        colour: "#FFFFFF"
    },

    ctx: null,
    lineWidth: 5,

    init: () => {        
        const canvas = document.getElementById("paper");
        canvas.setAttribute("width", page.paper.width);
        canvas.setAttribute("height", page.paper.height);
        page.ctx = canvas.getContext("2d"); 
        page.ctx.lineWidth = page.lineWidth;
        page.showGUI();
    },

    showGUI: () => {
        let gui = new dat.GUI();          
        let maxLines = gui.add(page.parameters, "maxLines").min(0).max(300).step(1).listen();
        maxLines.onChange(function(value){
            page.redraw(value);
        });
        let direction = gui.add(page.parameters, "direction", ["Horizontal", "Vertical"]).name("direction").listen();
        direction.onChange(function(value){
            console.log(value);		
        });
        gui.show();
    },

    redraw: (value) => {    
        page.clear();	
        // let sections = 1 + value;
        // console.log(`value is ${value}, divide into ${sections} Y sections`)
        let y = page.paper.height / (value + 1);
        for(let i = 1; i <= value; i++) {            
            page.ctx.beginPath();
            page.ctx.moveTo(
                0,
                i * y
            );
            page.ctx.lineTo(
                page.paper.width, 
                i * y
            );
            page.ctx.stroke();
        }
    },

    clear: () => {
        page.ctx.fillStyle = page.paper.colour;
        page.ctx.fillRect(
            0, 
            0, 
            page.paper.width, 
            page.paper.height
        );
    },
};
