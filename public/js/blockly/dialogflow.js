Blockly.Blocks['dialogflow'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(locale().INTERACTION.PROYECT)
        .appendField(new Blockly.FieldTextInput(""), "proyect")
        .appendField(locale().INTERACTION.DIALOGUE)
        .appendField(new Blockly.FieldTextInput(""), "dialogparam");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip(locale().INTERACTION.DIALOGFLOW);
      this.setHelpUrl("");
    }
};