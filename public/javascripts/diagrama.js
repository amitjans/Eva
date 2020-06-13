var myDiagram;
var id = 0;
var node = [];
var link = [];

function init() {
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            "undoManager.isEnabled": true,
            //layout: $(go.TreeLayout)
            //layout: $(go.LayeredDigraphLayout)
            layout: $(go.TreeLayout, { angle: 90, sorting: go.TreeLayout.SortingAscending })
        });

    // define a simple Node template
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",  // the Shape will go around the TextBlock
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
                {
                    portId: "", cursor: "pointer",
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                },
                // Shape.fill is bound to Node.data.color
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                { margin: 8, font: "bold 14px sans-serif", stroke: '#333' }, // Specify a margin to add some room around the text
                // TextBlock.text is bound to Node.data.key
                new go.Binding("text", "name"))
        );

    // but use the default Link template, by not setting Diagram.linkTemplate
    myDiagram.linkTemplate =
        $(go.Link,
            { toShortLength: 3, relinkableFrom: true, relinkableTo: true },  // allow the user to relink existing links
            $(go.Shape,
                { strokeWidth: 2 },
                new go.Binding("stroke", "color")),
            $(go.Shape,
                { toArrow: "Standard", stroke: null },
                new go.Binding("fill", "color"))
        );
    //-------------------------------------------------------------------------------------------------------------------------------
    // Define the appearance and behavior for Groups:
    function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
        var g = adornment.adornedPart;  // get the Group that the tooltip adorns
        var mems = g.memberParts.count;
        var links = 0;
        g.memberParts.each(function (part) {
            if (part instanceof go.Link) links++;
        });
        return "Ciclo: " + g.data.name + "\n" + mems + " acciones y " + links + " enlaces";
    }
    // Groups consist of a title in the color given by the group node data
    // above a translucent gray rectangle surrounding the member parts
    myDiagram.groupTemplate =
        $(go.Group, "Vertical",
            {
                selectionObjectName: "PANEL",  // selection handle goes around shape, not label
                ungroupable: true,  // enable Ctrl-Shift-G to ungroup a selected Group
                layout: $(go.TreeLayout, { angle: 90, sorting: go.TreeLayout.SortingAscending })
            },
            $(go.TextBlock,
                {
                    alignment: go.Spot.Left,
                    font: "bold 19px sans-serif",
                    isMultiline: false,  // don't allow newlines in text
                    editable: true  // allow in-place editing by user
                },
                new go.Binding("text", "name").makeTwoWay(),
                new go.Binding("stroke", "color")),
            $(go.Panel, "Auto",
                { name: "PANEL" },
                $(go.Shape, "Rectangle",  // the rectangular shape around the members
                    {
                        fill: "rgba(0,0,0,0)", stroke: "gray", strokeWidth: 3,
                        portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                    }),
                $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
            ),
            { // this tooltip Adornment is shared by all groups
                toolTip:
                    $("ToolTip",
                        $(go.TextBlock, { margin: 4 },
                            // bind to tooltip, not to Group.data, to allow access to Group properties
                            new go.Binding("text", "", groupInfo).ofObject())
                    )
            }
        );
    // provide a tooltip for the background of the Diagram, when not over any Part ------------------------------------------------
    function diagramInfo(model) {  // Tooltip info for the diagram's model
        return "Diagrama:\n" + model.nodeDataArray.length + " nodos, " + model.linkDataArray.length + " enlaces";
    }

    myDiagram.toolTip =
        $("ToolTip",
            $(go.TextBlock, { margin: 4 },
                new go.Binding("text", "", diagramInfo))
        );
    // ----------------------------------------------------------------------------------------------------------------------------

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = new go.GraphLinksModel(node, link);
    document.getElementById("blobButton").addEventListener("click", makeBlob);
}

function myCallback(blob) {
    var url = window.URL.createObjectURL(blob);
    var filename = "myBlobFile.png";

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    // IE 11
    if (window.navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }

    document.body.appendChild(a);
    requestAnimationFrame(function() {
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  function makeBlob() {
    var blob = myDiagram.makeImageData({ scale: 1, background: "white", returnType: "blob", callback: myCallback });
  }

function reload() {
    myDiagram.model = new go.GraphLinksModel(node, link);
}

init();