var dataMov = [["option", "OPTIONNAME"]];
var mov = new Promise((resolve, reject) => {
  fetch('/api/common?db=mov')
    .then(response => response.json())
    .then(data => {
      dataMov = [];
      for (let i = 0; i < data.length; i++) {
        dataMov.push([data[i].nombre, data[i].codigo]);
      }
    })
  resolve();
});

Blockly.Blocks['mov'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.MOV)
      .appendField(new Blockly.FieldDropdown(dataMov), "movement");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.MOV);
    this.setHelpUrl("");
  }
};