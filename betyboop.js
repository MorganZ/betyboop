
let _placements = [];
let _settlement = {}
let winSelection = "";

function placement(player, selection) {
    _placements.push({ player, selection, bet: 1 });
}

function getInfo() {
    return {
        placements : _placements,
        winSelection,
        settlement : _settlement
    }
}

function settlement(s) {
    let totalBet = 0;
    winSelection = s;
    let result = _placements.reduce((p, c) => {
        p[c.selection] = p[c.selection] ?? { bet : 0 , players : new Set()};
        p[c.selection].bet += c.bet;
        p[c.selection].players.add(c.player);
        totalBet += c.bet;
        return p;
    }, {})
    console.log(totalBet);
    console.log(result);
    let earnByPlayer = totalBet / result[s].bet;
    console.log(earnByPlayer);

    _settlement=Object.fromEntries([... result[s].players.values()].map(p => [p, earnByPlayer]));
}

placement("deni", "win");
placement("morgan", "loose");
placement("thomas", "loose");

settlement("loose");

console.log(JSON.stringify(getInfo()));