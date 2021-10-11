var interaction = new Promise((resolve, reject) => {
  fetch('/api/common?db=interaccion')
    .then(response => response.json())
    .then(data => {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        array.push([data[i].nombre, data[i]._id]);
      }
      Blockly.Blocks['int'] = {
        init: function () {
          this.appendDummyInput()
            .appendField(locale().INTERACTION.INT)
            .appendField(new Blockly.FieldDropdown(array), "int");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip(locale().INTERACTION.INT);
          this.setHelpUrl("");
        }
      };
    })
  resolve();
})

Blockly.Blocks['int'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.INT)
      .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "int");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.INT);
    this.setHelpUrl("");
  }
};