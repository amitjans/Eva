var dataScript = [["option", "OPTIONNAME"]];
var script = new Promise((resolve, reject) => {
  fetch('/api/common?db=script')
    .then(response => response.json())
    .then(data => {
      dataScript = [];
      for (let i = 0; i < data.length; i++) {
        dataScript.push([data[i].nombre, data[i]._id]);
      }
    })
  resolve();
});

Blockly.Blocks['script'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.SCRIPT)
      .appendField(new Blockly.FieldDropdown(dataScript), "script")
      .appendField(locale().INTERACTION.RANDOM)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "random");
    this.appendDummyInput()
      .appendField(locale().INTERACTION.SCRIPT_OPTS.ORDERBY)
      .appendField(new Blockly.FieldDropdown([["No", "none"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "order")
      .appendField(locale().INTERACTION.SCRIPT_OPTS.UNIQUE)
      .appendField(new Blockly.FieldDropdown([["No", "none"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "unique")
      .appendField(locale().INTERACTION.SCRIPT_OPTS.DELETEONUSE)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "remove");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.SCRIPT_OPTS.DESC);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dsci'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.SCRIPT_OPTS.DSCI);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.SCRIPT_OPTS.DSCI_DESC);
    this.setHelpUrl("");
  }
};