Blockly.Blocks['speak'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(locale().INTERACTION.DIALOGUE)
            .appendField(new Blockly.FieldTextInput(""), "text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip(locale().INTERACTION.DIALOGUE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['speak_combine'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(locale().INTERACTION.DIALOGUE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['speak_var'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable(null), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['speak_text'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(new Blockly.FieldTextInput(""), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['speak_script'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(`${locale().SCRIPT_DATA.SCRIPT}.${locale().SCRIPT_DATA.FIELD}`)
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]]), "NAME")
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};