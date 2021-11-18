var dataListen = [["option", "OPTIONNAME"]];
var dataFilter = [[locale().INTERACTION.ALL, ""]];
var listen = new Promise((resolve, reject) => {
    fetch('/api/common?db=googlestt')
        .then(response => response.json())
        .then(data => {
            dataListen = [];
            for (let i = 0; i < data.length; i++) {
                if (!!data[i]['enabled']) {
                    if (!!data[i]['watson']) {
                        dataListen.push([`Watson (${data[i]['watson'].split('_')[0]})`, data[i]['watson']]);
                    }
                    if (!!data[i]['codigo']) {
                        dataListen.push([`Google (${data[i]['codigo'].split('_')[0]})`, data[i]['codigo']]);
                    }
                }
            }
        });
    fetch('/api/filters')
        .then(response => response.json())
        .then(data => {
            dataFilter = [[locale().INTERACTION.ALL, ""]];
            for (let i = 0; i < data.length; i++) {
                dataFilter.push([data[i], data[i]]);
            }
        })
    resolve();
});

Blockly.Blocks['listen'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(`${locale().INTERACTION.LISTEN}: ${locale().INTERACTION.LANGUAGE}`)
            .appendField(new Blockly.FieldDropdown(dataListen), "language")
            .appendField(locale().INTERACTION.GET)
            .appendField(new Blockly.FieldDropdown(dataFilter), "listenopt");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip(locale().INTERACTION.LISTEN);
        this.setHelpUrl("");
    }
};