var voice = new Promise((resolve, reject) => {
    fetch('/api/common?db=voice')
      .then(response => response.json())
      .then(data => {
        let array = [];
        let source = [];
        for (let i = 0; i < data.length; i++) {
          array.push([`${data[i].nombre}(${data[i].idioma})`, data[i].codigo]);
          let sourceCode = data[i].codigo.substring(0, 2);
          if (!source.some((item) => item[1] == `${sourceCode}`)) {
              source.push([`${sourceCode.toUpperCase()}`, `${sourceCode}`]);
          }
        }
        Blockly.Blocks['voice'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField(locale().INTERACTION.VOICE)
                    .appendField(new Blockly.FieldDropdown(array), "voice")
                    .appendField(locale().INTERACTION.TRANSLATE)
                    .appendField(new Blockly.FieldCheckbox("FALSE"), "translate")
                    .appendField(locale().INTERACTION.SOURCE)
                    .appendField(new Blockly.FieldDropdown(source), "source");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(230);
                this.setTooltip("Voz");
                this.setHelpUrl("");
            }
        };
      })
    resolve();
  })

Blockly.Blocks['voice'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(locale().INTERACTION.VOICE)
            .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "voice")
            .appendField(locale().INTERACTION.TRANSLATE)
            .appendField(new Blockly.FieldCheckbox("FALSE"), "translate")
            .appendField(locale().INTERACTION.SOURCE)
            .appendField(new Blockly.FieldDropdown([["option", "OPTIONNAME"]]), "source");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Voz");
        this.setHelpUrl("");
    }
};