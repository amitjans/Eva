var dataLed = [["option", "OPTIONNAME"]];
var led = new Promise((resolve, reject) => {
  fetch('/api/common?db=led')
    .then(response => response.json())
    .then(data => {
      dataLed = [];
      for (let i = 0; i < data.length; i++) {
        dataLed.push([data[i].nombre, data[i]._id]);
      }
    })
  resolve();
})

Blockly.Blocks['led'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(locale().INTERACTION.LED)
        .appendField(new Blockly.FieldDropdown(dataLed), "leds");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(locale().INTERACTION.LED);
      this.setHelpUrl("");
    }
};