var myDiagram,id=0,node=[],link=[];function init(){var e=go.GraphObject.make;(myDiagram=e(go.Diagram,"myDiagramDiv",{"undoManager.isEnabled":!0,layout:e(go.TreeLayout,{angle:90,sorting:go.TreeLayout.SortingAscending})})).nodeTemplate=e(go.Node,"Auto",e(go.Shape,"RoundedRectangle",{strokeWidth:0,fill:"white"},{portId:"",cursor:"pointer",fromLinkable:!0,fromLinkableSelfNode:!0,fromLinkableDuplicates:!0,toLinkable:!0,toLinkableSelfNode:!0,toLinkableDuplicates:!0},new go.Binding("fill","color")),e(go.TextBlock,{margin:8,font:"bold 14px sans-serif",stroke:"#333"},new go.Binding("text","name"))),myDiagram.linkTemplate=e(go.Link,{adjusting:go.Link.Stretch,routing:go.Link.AvoidsNodes,curve:go.Link.JumpOver,corner:4,resegmentable:!0,relinkableFrom:!0,relinkableTo:!0},new go.Binding("curviness"),e(go.Shape,{stroke:"#000000",strokeWidth:1}),e(go.Shape,{toArrow:"standard",fill:"#000000",stroke:null,scale:1.5})),myDiagram.groupTemplate=e(go.Group,"Vertical",{selectionObjectName:"PANEL",ungroupable:!0,layout:e(go.TreeLayout,{angle:90,sorting:go.TreeLayout.SortingAscending})},e(go.TextBlock,{alignment:go.Spot.Left,font:"bold 19px sans-serif",isMultiline:!1,editable:!0},new go.Binding("text","name").makeTwoWay(),new go.Binding("stroke","color")),e(go.Panel,"Auto",{name:"PANEL"},e(go.Shape,"Rectangle",{fill:"rgba(0,0,0,0)",stroke:"gray",strokeWidth:3,portId:"",cursor:"pointer",fromLinkable:!0,fromLinkableSelfNode:!0,fromLinkableDuplicates:!0,toLinkable:!0,toLinkableSelfNode:!0,toLinkableDuplicates:!0}),e(go.Placeholder,{margin:10,background:"transparent"})),{toolTip:e("ToolTip",e(go.TextBlock,{margin:4},new go.Binding("text","",(function(e){var o=e.adornedPart,n=o.memberParts.count,a=0;return o.memberParts.each((function(e){e instanceof go.Link&&a++})),"Ciclo: "+o.data.name+"\n"+n+" acciones y "+a+" enlaces"})).ofObject()))}),myDiagram.toolTip=e("ToolTip",e(go.TextBlock,{margin:4},new go.Binding("text","",(function(e){return"Diagrama:\n"+e.nodeDataArray.length+" nodos, "+e.linkDataArray.length+" enlaces"})))),myDiagram.model=new go.GraphLinksModel(node,link),document.getElementById("blobButton").addEventListener("click",makeBlob)}function myCallback(e){var o=window.URL.createObjectURL(e),n=document.createElement("a");n.style="display: none",n.href=o,n.download="myBlobFile.png",void 0===window.navigator.msSaveBlob?(document.body.appendChild(n),requestAnimationFrame((function(){n.click(),window.URL.revokeObjectURL(o),document.body.removeChild(n)}))):window.navigator.msSaveBlob(e,"myBlobFile.png")}function makeBlob(){myDiagram.makeImageData({scale:1,background:"white",returnType:"blob",callback:myCallback})}function reload(){myDiagram.model=new go.GraphLinksModel(node,link)}