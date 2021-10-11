Blockly.Blocks['wait'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(`${locale().INTERACTION.WAIT}:`)
      .appendField(locale().INTERACTION.TIME)
      .appendField(new Blockly.FieldNumber(0, 0), "time");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(locale().INTERACTION.WAIT);
      this.setHelpUrl("");
    }
};