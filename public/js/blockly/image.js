var dataImage = [["option", "OPTIONNAME"]];
var image = new Promise((resolve, reject) => {
  fetch('/api/images')
    .then(response => response.json())
    .then(data => {
      dataImage = [];
      for (let i = 0; i < data.length; i++) {
        dataImage.push([data[i].nombre, data[i].nombre]);
      }
    })
  resolve();
});

Blockly.Blocks['image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.IMAGE)
      .appendField(new Blockly.FieldDropdown(dataImage), "image");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.IMAGE);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reset'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.SCREEN_RESET);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.SCREEN_RESET);
    this.setHelpUrl("");
  }
};