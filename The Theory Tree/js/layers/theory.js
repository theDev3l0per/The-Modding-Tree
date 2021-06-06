addLayer("t", {
    name: "theory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#8624d1",
    requires: D(10), // Can be a function that takes requirement increases into account
    base: D(10),
    resource: "theory points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for theory points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    current() {
        let current = player.t.points
        Object.keys(this.upgrades).forEach(function(i) {
            if (hasUpgrade("t", i)) current = current.sub(tmp.t.upgrades[i].cost)
        })
        return current
    },
    layerShown(){return true},
    canBuyMax() {
        return false
    },
    autoPrestige() {
        return false
    },
    resetsNothing() {
        return false
    },
    tabFormat() {
        return [
            ["display-text", function() {return `<div><span v-if="player.t.points.lt('1e1000')">You have </span><h2 style="color: ${tmp.t.color}; text-shadow: 0px 0px 10px ${tmp.t.color}">${data ? format(tmp.t.current, data) : formatWhole(tmp.t.current)}</h2> ${tmp.t.resource}<br><br></div>`}()],
            "prestige-button",
            "blank",
            "master-button",
            "blank",
            ["upgrade-tree", [
                [11],
                [21]
            ]],
        ]
    },
    upgrades: {
        11: {
            title: "The game has begun",
            description: "Start generating 1 point per second",
            cost: D(0),
            canAfford() {
                tmp.t.current.gte(this.cost)
            },
            pay() {}
        },
        22: {
            title: "The theory cost didnt decrease?",
            description: "Multiply point generation by 5",
            cost: D(1),
            unlocked() {
                return hasUpgrade("t", 11)
            },
            canAfford() {
                tmp.t.current.gte(this.cost)
            },
            pay() {},
            branches: [11]
        },
    },
    clickables: {
        masterButtonPress() {
            player.t.upgrades = []
        },
        masterButtonText: "Respec Upgrades",
        showMasterButton() {
            return true
        }
    }
})
