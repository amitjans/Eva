Blockly.Blocks['record'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(`${locale().INTERACTION.RECORD}:`)
      .appendField(locale().INTERACTION.TIME)
      .appendField(new Blockly.FieldNumber(0, 0), "time");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(locale().INTERACTION.RECORD);
      this.setHelpUrl("");
    }
};