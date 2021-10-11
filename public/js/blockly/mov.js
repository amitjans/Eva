var mov = new Promise((resolve, reject) => {
    fetch('/api/common?db=mov')
      .then(response => response.json())
      .then(data => {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          array.push([data[i].nombre, data[i].codigo]);
        }
        Blockly.Blocks['mov'] = {
          init: function () {
            this.appendDummyInput()
              .appendField(locale().INTERACTION.MOV)
              .appendField(new Blockly.FieldDropdown(array), "movement");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip(locale().INTERACTION.MOV);
            this.setHelpUrl("");
          }
      };
      })
    resolve();
  })

Blockly.Blocks['mov'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(locale().INTERACTION.MOV)
            .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "movement");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip(locale().INTERACTION.MOV);
        this.setHelpUrl("");
    }
};