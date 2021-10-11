var listen = new Promise((resolve, reject) => {
    fetch('/api/common?db=googlestt')
      .then(response => response.json())
      .then(data => {
        let array = [];
        for (let i = 0; i < data.length; i++) {
            if (!!data[i]['watson']) {
                array.push([`Watson (${data[i]['watson'].split('_')[0]})`, data[i]['watson']]);
            } else if (!!data[i]['codigo']) {
                array.push([`Google (${data[i]['codigo'].split('_')[0]})`, data[i]['codigo']]);
            }
        }
        fetch('/api/filters')
        .then(response => response.json())
        .then(data => {
          let filter = [[locale().INTERACTION.ALL, ""]];
          for (let i = 0; i < data.length; i++) {
            filter.push([data[i], data[i]]);
              }
        Blockly.Blocks['listen'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField(`${locale().INTERACTION.LISTEN}: ${locale().INTERACTION.LANGUAGE}`)
                    .appendField(new Blockly.FieldDropdown(array), "language")
                    .appendField(locale().INTERACTION.GET)
                    .appendField(new Blockly.FieldDropdown(filter), "listenopt");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(230);
                this.setTooltip(locale().INTERACTION.LISTEN);
                this.setHelpUrl("");
            }
        };
    })
      })
    resolve();
  })

Blockly.Blocks['listen'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(`${locale().INTERACTION.LISTEN}: ${locale().INTERACTION.LANGUAGE}`)
            .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "language")
            .appendField(locale().INTERACTION.GET)
            .appendField(new Blockly.FieldDropdown([[locale().INTERACTION.ALL, ""]]), "listenopt");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip(locale().INTERACTION.LISTEN);
        this.setHelpUrl("");
    }
};