var led = new Promise((resolve, reject) => {
  fetch('/api/common?db=led')
    .then(response => response.json())
    .then(data => {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        array.push([data[i].nombre, data[i]._id]);
      }
      Blockly.Blocks['led'] = {
        init: function () {
          this.appendDummyInput()
            .appendField(locale().INTERACTION.LED)
            .appendField(new Blockly.FieldDropdown(array), "leds");
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip(locale().INTERACTION.LED);
          this.setHelpUrl("");
        }
    };
    })
  resolve();
})

Blockly.Blocks['led'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(locale().INTERACTION.LED)
        .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"], ["option", "OPTIONNAME"]]), "leds");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(locale().INTERACTION.LED);
      this.setHelpUrl("");
    }
};