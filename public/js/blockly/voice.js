var dataVoice = [["option", "OPTIONNAME"]];
var dataSource = [["option", "OPTIONNAME"]];
var voice = new Promise((resolve, reject) => {
  fetch('/api/common?db=voice')
    .then(response => response.json())
    .then(data => {
      dataVoice = [];
      dataSource = [];
      for (let i = 0; i < data.length; i++) {
        dataVoice.push([`${data[i].nombre}(${data[i].idioma})`, data[i].codigo]);
        let sourceCode = data[i].codigo.substring(0, 2);
        if (!dataSource.some((item) => item[1] == `${sourceCode}`)) {
          dataSource.push([`${sourceCode.toUpperCase()}`, `${sourceCode}`]);
        }
      }
    })
  resolve();
});

Blockly.Blocks['voice'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(locale().INTERACTION.VOICE)
      .appendField(new Blockly.FieldDropdown(dataVoice), "voice")
      .appendField(locale().INTERACTION.TRANSLATE)
      .appendField(new Blockly.FieldCheckbox("FALSE"), "translate")
      .appendField(locale().INTERACTION.SOURCE)
      .appendField(new Blockly.FieldDropdown(dataSource), "source");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip(locale().INTERACTION.VOICE);
    this.setHelpUrl("");
  }
};