var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}

const D = Decimal
// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: {
        "Theory": {
            embedLayer:"t"
        }
    },
    previousTab: "",
    leftTab: true,
})