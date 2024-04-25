import React, {useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre'
import CytoscapeComponent from "react-cytoscapejs";
import data from './data/data.json'

cytoscape.use( dagre );

function PrerequisiteTrees(){
    // eslint-disable-next-line
    const [width, setWith] = useState("100%");
    // eslint-disable-next-line
    const [height, setHeight] = useState("90vh");
    // eslint-disable-next-line
    const [graphData, setGraphData] = useState({
        nodes: data.nodes,
        edges: data.edges
    });
    
    const [zoom, SetZoom] = useState();
    const styleSheet = [
        {
          selector: "node",
          style: {
            backgroundColor: "#4a56a6",
            width: 30,
            height: 30,
            label: "data(label)",
            "overlay-padding": "6px",
            "z-index": "10",
            //text props
            "text-outline-color": "#4a56a6",
            "text-outline-width": "2px",
            color: "white",
            fontSize: 15
          }
        },
        {
          selector: "node:selected",
          style: {
            "border-width": "6px",
            "border-color": "#AAD8FF",
            "border-opacity": "0.5",
            "background-color": "#77828C",
            width: 40,
            height: 40,
            //text props
            "text-outline-color": "#77828C",
            "text-outline-width": 8
          }
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#AAD8FF",
            "target-arrow-color": "#6774cb",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier"
          }
        },
        {
            selector: "edge[type='coreq']",
            style: {
              "line-style": "dotted"
            }
          },
      ];
    const layout = {
        name: "dagre",
        fit: true,
        // circle: true,
        directed: true,
        padding: 150,
        // spacingFactor: 1.5,
        animate: true,
        animationDuration: 1000,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false,
        rankDir: 'BT',
        
    };

    let myCyRef;
    return (
      <div
      style={{
        paddingTop: "8vh",
        paddingBottom: "8vh",
        paddingRight: "8vw",
        paddingLeft: "8vw"
        }}>
          <div>
          <button class="w-32 mb-1 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white mr-4" onClick={()=>SetZoom(zoom + .05)}>zoom in</button>
          <button class="w-32 mb-1 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white mr-4" onClick={()=>SetZoom(zoom - .05)}>zoom out</button>
          <button class="w-32 mb-1 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-blue-700 text-white mr-4" onClick={()=>SetZoom(1.5)}>reset zoom</button>
          </div>
          <div class="w-full border-4 border-gray-400 rounded-2xl pr-4 pl-4">
            <CytoscapeComponent
                  elements={CytoscapeComponent.normalizeElements(graphData)}
                  // pan={{ x: 200, y: 200 }}
                  style={{ width: width, height: height }}
                  zoomingEnabled={true} 
                  zoom={zoom} 
                  maxZoom={3}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled={true}
                  layout={layout}
                  stylesheet={styleSheet}
                  cy={cy => {
                  myCyRef = cy;

                  console.log("EVT", cy);

                  cy.on("tap", "node", evt => {
                      var node = evt.target;
                      console.log("EVT", evt);
                      console.log("TARGET", node.data());
                      console.log("TARGET TYPE", typeof node[0]);
                  });
                  }}
              abc={console.log("myCyRef", myCyRef)}
            />
          </div>
        </div>
    );
}


export default PrerequisiteTrees;