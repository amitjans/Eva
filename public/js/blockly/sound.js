var sound = new Promise((resolve, reject) => {
  fetch('/api/audio')
    .then(response => response.json())
    .then(data => {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        array.push([data[i].nombre, data[i].nombre]);
      }
      Blockly.Blocks['sound'] = {
        init: function () {
          this.appendDummyInput()
            .appendField(locale().INTERACTION.SOUND)
            .appendField(new Blockly.FieldDropdown(array), "sound")
            .appendField(locale().INTERACTION.WAIT)
            .appendField(new Blockly.FieldCheckbox("FALSE"), "wait");
          this.appendStatementInput("led")
            .setCheck(null)
            .appendField(locale().INTERACTION.LED);
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip(locale().INTERACTION.SOUND);
          this.setHelpUrl("");
        }
      };
    })
  resolve();
})

Blockly.Blocks['sound'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.SOUND)
      .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "sound");
    this.appendStatementInput("led")
      .setCheck(null)
      .appendField(locale().INTERACTION.LED);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.SOUND);
    this.setHelpUrl("");
  }
};