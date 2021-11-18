Blockly.Blocks['emotion'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(locale().INTERACTION.EMOTION)
            .appendField(new Blockly.FieldDropdown([
                [locale().EMOTION_TYPE.NEUTRAL, "ini"], 
                [locale().EMOTION_TYPE.JOY, "joy"], 
                [locale().EMOTION_TYPE.SURPRISE, "surprise"], 
                [locale().EMOTION_TYPE.SAD, "sad"], 
                [locale().EMOTION_TYPE.ANGER, "anger"]
            ]), "emotion")
            .appendField(locale().INTERACTION.LEVEL)
            .appendField(new Blockly.FieldDropdown([
                [locale().INTERACTION.ONLY_EYES, "0"], 
                [locale().INTERACTION.MOV, "2"], 
                [locale().INTERACTION.INCREMENTAL, "-1"]
            ]), "level");            
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip(locale().INTERACTION.EMOTION);
        this.setHelpUrl("");
    }
};