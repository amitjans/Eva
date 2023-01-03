const { getThis } = require('../server/controllers/common.controller');
const { xmlToJson } = require('../utils/xml2json');
const { LoadScriptData } = require('./Node')
var { generarNumeroRandom } = require('../utils/Random');
const Blockly = require('blockly');

async function unifyById(value) {
    return await unify(await findById(value));
}

async function find(value) {
    return await getThis(value, 'interaccion');
}

async function findById(value) {
    const temp = await getThis(value, 'interaccion');
    return xmlToJson(Blockly.Xml.textToDom(temp.xml));
}

async function unifyByInt(value) {
    let clone = JSON.parse(JSON.stringify(value.data));
    return await unify(clone.node, clone.link);
}

async function unify(obj) {
    let nodes = [];
    if(!!obj.block) {
        let temp = obj.block;
        let node = { key: temp["@attributes"].id, type: temp["@attributes"].type }
        switch (temp["@attributes"].type) {
            case "controls_if":
                node.type = 'if';
                node['condition'] = [];
                let values = [].concat(temp.value);
                for (let i = 0; i < values.length; i++) {
                    const element = values[i];
                    if (!!element.block && element.block['@attributes']['type'] == "logic_compare") {
                        let condition = { OP: element.block.field['#text'] };
                        for (let j = 0; j < element.block.value.length; j++) {
                            const attr = element.block.value[j];
                            if (attr.block['@attributes'].type == 'speak_script') {
                                condition[attr['@attributes'].name] = `%${attr.block.field['#text']}`;
                            } else {
                                condition[attr['@attributes'].name] = attr.block.field['#text'];
                            }
                        }
                        let thenDo = temp.statement
                        .find(x => x['@attributes'].name == `DO${element['@attributes'].name.substring(2)}`);
                        if (!!thenDo || !!temp.next){
                            condition['next'] = !!thenDo ? thenDo.block['@attributes'].id : temp.next.block['@attributes'].id;
                        }
                        node['condition'].push(condition);
                        if (!!thenDo){
                            nodes.push(...(await unify(thenDo)));
                        }
                    }
                }
                let elseDo = temp.statement.find(x => x['@attributes'].name == 'ELSE');
                node['condition'].push({ next: elseDo.block['@attributes'].id });
                nodes.push(...(await unify(elseDo)));
                break;
            case "controls_repeat_ext":
                node.type = 'for';
                if (!!temp.value.block && temp.value.block['@attributes'].type == 'math_random_int') {
                let valueBlock = temp.value.block.value;
                    node['min'] = (!!valueBlock[0].block ? valueBlock[0].block.field['#text'] : valueBlock[0].shadow.field['#text']);
                    node['max'] = (!!valueBlock[1].block ? valueBlock[1].block.field['#text'] : valueBlock[1].shadow.field['#text']);
                } else {
                    node['iteraciones'] = parseInt(temp.value.shadow.field['#text']);
                }
                node['first'] = temp.statement.block["@attributes"].id;
                break;
            case "emotion":
                node['emotion'] = temp.field[0]['#text'];
                node['level'] = parseInt(temp.field[1]['#text']);
            case "image":
                node['url'] = temp.field['#text'];
                break;
            case "led":
                node['anim'] = temp.field['#text'];
                break;
            case "listen":
                node['service'] = temp.field[0]['#text'].includes('BroadbandModel') ? 'watson' : 'google';
                node['langcode'] = temp.field[0]['#text'];
                node['opt'] = temp.field[1]['#text'] || "";
                break;
            case "mov":
                node['mov'] = temp.field['#text'];
                break;
            case "record":
            case "wait":
                node['time'] = parseInt(temp.field['#text']);
                break;
            case "sound":
                node['src'] = temp.field[0]['#text'];
                node['wait'] = temp.field[1]['#text'] == 'TRUE';
                if (!!temp.statement) {
                    node['anim'] = temp.statement.block.field['#text'];
                }
                break;
            case "script":
                node['sc'] = temp.field[0]['#text'];
                node['random'] = temp.field[1]['#text'] == 'TRUE';
                node['read'] = temp.field[2]['#text'] == 'TRUE';
                node['order'] = temp.field[3]['#text'];
                node['unique'] = temp.field[4]['#text'];
                node['remove'] = temp.field[5]['#text'] == 'TRUE';
                node['data'] = await LoadScriptData(node);
                break;
            case "speak":
                node['text'] = temp.field['#text'];
                break;
            case "speak_combine":
                node = { ...node, type: 'speak', text: '' };
                let subText = temp.value;
                while (!!subText.block) {
                    if (subText.block['@attributes'].type == 'speak_text') {
                        node.text += ` ${ subText.block.field['#text'] }`;
                    } else if (subText.block['@attributes'].type == 'speak_var') {
                        node.text += ` #${subText.block.field['#text']}`;
                    } else if (subText.block['@attributes'].type == 'speak_script') {
                        node.text += ` %${subText.block.field['#text']}`;
                    } else if (subText.block['@attributes'].type == 'math_random_int') {
                        node.text += 'r' + (!!subText.block.value[0].block 
                          ? subText.block.value[0].block.field['#text'] 
                          : subText.block.value[0].shadow.field['#text']) 
                        + 't' + (!!subText.block.value[1].block 
                          ? subText.block.value[1].block.field['#text']
                          : subText.block.value[1].shadow.field['#text']);
                      }
                    subText = subText.block.value || {};
                }
                node.text = node.text.trim();
                break;
            case "variables_set":
                node = { ...node, type: 'counter', count: temp.field['#text'] };
                if (temp.value.block['@attributes'].type == 'math_arithmetic') {
                    node['ops'] = temp.value.block.field['#text'];
                    let valueBlock = temp.value.block.value;
                    node['first'] = (!!valueBlock[0].block ? valueBlock[0].block.field['#text'] : valueBlock[0].shadow.field['#text']);
                    node['second'] = (!!valueBlock[1].block ? valueBlock[1].block.field['#text'] : valueBlock[1].shadow.field['#text']);
                } else if (temp.value.block['@attributes'].type == 'math_random_int') {
                    node['ops'] = 'random';
                    let valueBlock = temp.value.block.value;
                    node['first'] = (!!valueBlock[0].block ? valueBlock[0].block.field['#text'] : valueBlock[0].shadow.field['#text']);
                    node['second'] = (!!valueBlock[1].block ? valueBlock[1].block.field['#text'] : valueBlock[1].shadow.field['#text']);
                } else {
                    node = { ...node, ops: 'assign', value: temp.value.block.field['#text'] };
                }
                break;
            case "voice":
                node['voice'] = temp.field[0]['#text'];
                node['translate'] = temp.field[1]['#text'] == 'TRUE';
                node['sourcelang'] = temp.field[2]['#text'];
            default:
                break;
        }
        if(!!temp.next) {
            if (temp.next.block['@attributes'].type == 'int') {
                temp.next = await findById(temp.next.block.field['#text']);
            }
            node['next'] = temp.next.block['@attributes'].id;
        }
        nodes.push(node);
        if(!!node.first && node.type == 'for') {
            nodes.push(...(await unify(temp.statement)));
        }
        if(!!node.next) {
            nodes.push(...(await unify(temp.next)));
        }
    }
    return nodes;
}

module.exports = {
    find,
    unifyById,
    unifyByInt,
    unify
};