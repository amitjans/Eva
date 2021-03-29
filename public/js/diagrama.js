var myDiagram;
var id = 0;
var node = [];
var link = [];

function init() {
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
        {
            "undoManager.isEnabled": true,
            mouseDrop: function (e) { finishDrop(e, null); },
            //layout: $(go.TreeLayout)
            //layout: $(go.LayeredDigraphLayout)
            layout: $(go.TreeLayout, { angle: 90, sorting: go.TreeLayout.SortingAscending })
        });

    function nodeInfo(d) {  // Tooltip info for a node data object
        var str = "";
        switch (d.type) {
            case 'emotion':
                str = 'Emoción: ' + d.emotion;
                break;
            case 'speak':
                let t = d.text;
                if (t.length > 30) {
                    let until = Math.floor(t.length / 30);
                    let temp = Array.from(t);
                    for (let i = 0; i < until; i++) {
                        temp[t.indexOf(" ", ((i + 1) * 30))] = '\n';
                    }
                    t = temp.join('');
                }
                str = 'Texto: ' + t;
                break;
            case 'listen':
                str = 'Filtro: ' + d.opt;
                break;
            case 'wait':
                str = 'Espera: ' + d.time + ' milisegundos';
                break;
            case 'for':
                str = 'Ciclo: ' + d.iteraciones + ' iteraciones';
                break;
            case 'if':
                str = 'Condición: ' + d.text;
                break;
            case 'mov':
                str = 'Movimiento: ' + d.mov;
                break;
            case 'int':
                str = 'Interacción';
                break;
            case 'script':
                str = 'Script';
                break;
            case 'sound':
                str = 'Sonido: ' + d.src + '\nEsperar: ' + d.wait;
                break;
            case 'led':
                str = 'Animación: ' + d.anim;
                break;
            case 'voice':
                str = 'Voz: ' + d.voice;
                break;
            case 'counter':
                str = 'Contador: ' + d.count + '\nValor: ' + d.value;
                break;
            default:
                break;
        }
        return str;
    }
    // define a simple Node template
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",  // the Shape will go around the TextBlock
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "lightblue" },
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
                new go.Binding("text", "name")),
            { // this tooltip Adornment is shared by all nodes
                toolTip:
                    $("ToolTip",
                        $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling nodeInfo(data)
                            new go.Binding("text", "", nodeInfo))
                    )
            }
        );

    // but use the default Link template, by not setting Diagram.linkTemplate
    // myDiagram.linkTemplate =
    //     $(go.Link,
    //         { toShortLength: 3, relinkableFrom: true, relinkableTo: true },  // allow the user to relink existing links
    //         $(go.Shape,
    //             { strokeWidth: 2 },
    //             new go.Binding("stroke", "color")),
    //         $(go.Shape,
    //             { toArrow: "Standard", stroke: null },
    //             new go.Binding("fill", "color"))
    //     );
    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
            {
                //curve: go.Link.Bezier, 
                adjusting: go.Link.Stretch,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                //curve: go.Link.JumpGap, 
                corner: 4,
                resegmentable: true,
                //routing: go.Link.Orthogonal,
                relinkableFrom: true,
                relinkableTo: true
            },
            new go.Binding("curviness"),
            $(go.Shape,  // the link shape
                { stroke: "#000000", strokeWidth: 1 }),
            $(go.Shape,  // the arrowhead
                { toArrow: "standard", fill: "#000000", stroke: null, scale: 1.5 })
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
    function finishDrop(e, grp) {
        var ok = (grp !== null
            ? grp.addMembers(grp.diagram.selection, true)
            : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok) e.diagram.currentTool.doCancel();
    }
    // Groups consist of a title in the color given by the group node data
    // above a translucent gray rectangle surrounding the member parts
    myDiagram.groupTemplate =
        $(go.Group, "Auto",
            {
                computesBoundsAfterDrag: true,
                // when the selection is dropped into a Group, add the selected Parts into that Group;
                // if it fails, cancel the tool, rolling back any changes
                mouseDrop: finishDrop,
                handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                // Groups containing Groups lay out their members horizontally
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
    requestAnimationFrame(function () {
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