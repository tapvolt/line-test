"use strict";

const page = {

    // GUI
    guiConfig: {
        numLines: 1,
        direction: "Horizontal",
        export: function(){}
    },
    numLines: {},
    direction: {},
    margins: {},
    
    // A3
    paper: {
        width: 3508,
        height: 4960,
        colour: "#FFFFFF"
    },

    svg: {},

    init: () => {        
        page.svg = SVG().addTo("#paper").size(page.paper.width, page.paper.height);  
        page.svg.size("100%", "100%");  
        page.svg.viewbox(0, 0, page.paper.width, page.paper.height);

        page.showGUI();
        page.redraw();       
    },

    showGUI: () => {
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        let gui = new dat.GUI();          
        
        page.numLines = gui.add(page.guiConfig, "numLines").min(1).max(300).step(1).name("# of lines").listen();
        page.numLines.onChange(function(){
            page.redraw();
        });
        
        page.direction = gui.add(page.guiConfig, "direction", ["Horizontal", "Vertical"]).name("Direction").listen();
        page.direction.onChange(function(){
            page.redraw();
        });

        page.margins = gui.add(page.guiConfig, "margins").name("Draw margins").listen();
        page.margins.onChange(function(){
            page.redraw();
        });

        let exportSvg = gui.add(page.guiConfig, "export").name("Export SVG").listen();
        exportSvg.onChange(function(){
            page.download();
        });

        gui.show();        
    },

    redraw: () => {    
        page.clear();
        let value = page.numLines.getValue();
    
        if(page.direction.getValue() == "Vertical") {
            let divisions = page.paper.width / (value + 1);
            for(let i = 1; i <= value; i++) {                
                page.svg.line(i * divisions, 0, i * divisions, page.paper.height).stroke({ width: 8, color: "#000"});
            }
        } else {
            let divisions = page.paper.height / (value + 1);
            for(let i = 1; i <= value; i++) {                
                page.svg.line(0, i * divisions, page.paper.width, i * divisions).stroke({ width: 8, color: "#000"});
            }
        }

        if (page.margins.getValue()) {
            // top  x,y
            page.svg.rect(page.paper.width, 400).attr({stroke: 0, fill: '#fff', id: 10 });

            // bottom  x,y
            page.svg.rect(page.paper.width, 600).attr({stroke : 0, fill: '#fff', id: 10 }).move(0, page.paper.height - 600);

            // left
            page.svg.rect(400, page.paper.height).attr({stroke: 0, fill: '#fff', id: 10 });

            // right
            page.svg.rect(400, page.paper.height).attr({stroke: 0, fill: '#fff', id: 10 }).move(page.paper.width - 400, 0);
        }
    },

    clear: () => {
        page.svg.clear();
    },

    download: () => {
        let svgString = page.svg.flatten().svg();
        // https://ruslan.rocks/posts/file-download-in-javascript
        let element = document.createElement("a");
        element.setAttribute("download", "image.svg");
        document.body.appendChild(element);        
        element.setAttribute("href", window.URL.createObjectURL(
            new Blob([svgString], {type: "text/plain;charset=utf-8"})
        ));
        element.click();
        document.body.removeChild(element);
    }
};
