var anim = { name: "", time: 0, frames: [] };
var colors = new Set();
var cframe = -1;
var checkedFrames = [];
var debugFrame = 0;
var animEmulation;
var currentColor = "";

eva.controller('lededitor', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    $scope.init = function () {
        if (!!$routeParams.id) {
            getAnim($routeParams.id)
        } else {
            anim = { name: "", time: 0, frames: [] };
            colors = new Set();
            cframe = -1;
            debugFrame = 0;
        }
    }
    $scope.init();
}]);

function writeTable() {
    let body = "";
    colors = new Set();
    for (let i = 0; i < anim.frames.length; i++) {
        body += writeTr(i, anim.frames[i], anim.checked);
    }
    document.getElementById("frames").innerHTML = body;

    document.getElementById("palette").style.display = 'block';
    let colorPalette = '<p>Paleta de colores:&nbsp;</p>';
    for (const item of colors) {
        colorPalette += `<input type="color" color-old="${item}" value="${item}" onchange="updateColor(this)" oncontextmenu="setAsDefault(event, this)"></input>&nbsp;`;
    }
    document.getElementById("palette").style.display = 'block';
    document.getElementById("palette").innerHTML = colorPalette;

    debugFrame = 0;
}

function writeTr(frame, color = [], checked = false) {
    let row = `<tr id="${frame}"><td>
    <div class="form-check">
        <input class="form-check-input frameCheckbox" type="checkbox" value="${frame}" 
            ${(checkedFrames[frame] ? 'checked' : '')} onclick="checkFrame(this)">
        <label class="form-check-label" for="flexCheckChecked">
            ${frame}
        </label>
    </div></td>`;
    for (let i = 0; i < 18; i++) {
        row += writeTd(frame, i, color[i] ?? "#000000");
    }
    row += `<td><i class="fa-solid fa-gear hand" onclick="options(${frame})"></i></td>`;
    row += `<td><i class="fa-solid fa-trash hand" onclick="eliminarUnFrame(${frame})"></i></td>`;
    row += "</tr>";
    return row;
}

function writeTd(frame, led, color = "#000000") {
    colors.add(color);
    return `<td><input type="color" id="f${frame}l${led}" name="f${frame}l${led}" value="${color}" onchange="updateSingleColor(this)" onclick="handleColorChange(event, this)"></td>`;
}

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function importAnim() {
    anim = JSON.parse(document.getElementById("import").value);
    document.getElementById("import").value = "";
    document.getElementById("inlineName").value = anim.name;
    document.getElementById("inlineTime").value = anim.time;
    document.getElementById("inlineBucle").checked = !!anim.bucle;
    document.getElementById("inlineRotate").checked = !!anim.rotate;
    bucleChange();
    writeTable();
    $('#importAnim').modal('hide');
}

function options(value) {
    cframe = value;
    document.getElementById("optionsTitle").innerText = `Frame: ${cframe}`;
    document.getElementById("currentFrame").value = cframe;
    document.getElementById("currentFrame").setAttribute('max', cframe);
    document.getElementById("untilFrame").setAttribute('max', (anim.frames.length - cframe));
    $('#options').modal('show');
}

function eliminarFrames() {
    let from = document.getElementById("currentFrame").value;
    let count = document.getElementById("untilFrame").value;
    anim.frames.splice(parseInt(from), parseInt(count));
    writeTable();
}

function eliminarUnFrame(value) {
    anim.frames.splice(parseInt(value), 1);
    writeTable();
}

function deleteAllLeds() {
    for (let i = checkedFrames.length - 1; i >= 0; i--) {
        if (checkedFrames[i]) {
            anim.frames.splice(parseInt(i), 1);
        }
    }
    checkedFrames.fill(false);
    document.getElementById("allFrames").checked = false;
    writeTable();
}

function moveAllLeds(dir) {
    moveAllLedsOfAnim(anim, dir);
    writeTable();
}

function moveAllLedsOfAnim(arr, dir) {
    if (checkedFrames.some(f => f)) {
        for (let i = 0; i < checkedFrames.length; i++) {
            if (checkedFrames[i]) {
                arr.frames[i] = arrayRotate(arr.frames[i], dir);
            }
        }
    } else {
        for (let i = 0; i < arr.frames.length; i++) {
            arr.frames[i] = arrayRotate(arr.frames[i], dir);
        }
    }
}

function moveAllLedsUp() {
    if (checkedFrames.indexOf(!checkedFrames[0]) == -1) {
        anim.frames = arrayRotate(anim.frames, false);
    } else {
        for (let i = 0; i < checkedFrames.length; i++) {
            if (checkedFrames[i]) {
                if (i != 0) {
                    let temp = anim.frames[i];
                    anim.frames[i] = anim.frames[i - 1];
                    anim.frames[i - 1] = temp;
                    let aux = checkedFrames[i];
                    checkedFrames[i] = checkedFrames[i - 1];
                    checkedFrames[i - 1] = aux;
                } else {
                    anim.frames.push(anim.frames.shift());
                    checkedFrames.push(checkedFrames.shift());
                    break;
                }
            }
        }
    }
    writeTable();
}

function moveAllLedsDown() {
    if (checkedFrames.indexOf(!checkedFrames[0]) == -1) {
        anim.frames = arrayRotate(anim.frames, true);
    } else {
        for (let i = checkedFrames.length - 1; i >= 0; i--) {
            if (checkedFrames[i]) {
                if (i < anim.frames.length - 1) {
                    let temp = anim.frames[i];
                    anim.frames[i] = anim.frames[i + 1];
                    anim.frames[i + 1] = temp;
                    let aux = checkedFrames[i];
                    checkedFrames[i] = checkedFrames[i + 1];
                    checkedFrames[i + 1] = aux;
                } else {
                    anim.frames.unshift(anim.frames.pop());
                    checkedFrames.unshift(checkedFrames.pop());
                    break
                }
            }
        }
    }
    writeTable();
}

function cloneFrame() {
    anim.frames.splice(cframe + 1, 0, clone(anim.frames[cframe]));
    cframe++;
    options(cframe);
    writeTable();
}

function cloneFrameUp() {
    anim.frames.unshift(clone(anim.frames[cframe]));
    cframe++;
    options(cframe);
    writeTable();
}

function cloneFrameDown() {
    anim.frames.push(clone(anim.frames[cframe]));
    writeTable();
}

function newFrame() {
    anim.frames.push(new Array(18).fill("#000000"));
    checkedFrames.push(false);
    writeTable();
}

function updateColor(obj) {
    let oldColor = obj.getAttribute('color-old');
    let newColor = obj.value;
    for (let i = 0; i < anim.frames.length; i++) {
        for (let j = 0; j < 18; j++) {
            if (anim.frames[i][j] === oldColor) {
                anim.frames[i][j] = newColor;
            }
        }
    }
    writeTable();
}

function updateSingleColor(obj) {
    let location = obj.id.substring(1).split("l");
    anim.frames[parseInt(location[0])][parseInt(location[1])] = obj.value;
    writeTable();
}

function gradient() {
    let init = parseInt(document.getElementById("colorInit").value);
    let end = parseInt(document.getElementById("colorEnd").value);

    let colorList = generateColor(anim.frames[cframe][init], anim.frames[cframe][end], (end - init - 1));
    let i = init + 1;
    for (const item of colorList) {
        anim.frames[cframe][i] = item;
        i++;
    }
    writeTable();
}

function save() {
    anim.name = document.getElementById("inlineName").value;
    anim.time = parseInt(document.getElementById("inlineTime").value);
    anim.bucle = document.getElementById("inlineBucle").checked;
    anim.rotate = document.getElementById("inlineRotate").checked;
    anim.loops = parseInt(document.getElementById("inlineLoops").value);
    anim.skip = parseInt(document.getElementById("inlineFrameSkipLoops").value);
    postData('/api/common?db=led', anim)
        .then((data) => {
            anim._id = data.obj._id;
            notify(locale().LED.NOTIFY.POST.SUCCESS);
        })
        .catch((error) => {
            notify(locale().LED.NOTIFY.ERROR, 'danger');
        });
}

function saveForceNew() {
    delete anim._id;
    save();
}

function getAnim(id) {
    getData(`/api/common/${id}?db=led`)
        .then((data) => {
            anim = data;
            document.getElementById("inlineName").value = anim.name;
            document.getElementById("inlineTime").value = anim.time;
            document.getElementById("inlineBucle").checked = !!anim.bucle;
            document.getElementById("inlineRotate").checked = !!anim.rotate;
            document.getElementById("inlineLoops").value = anim.loops || 0;
            document.getElementById("inlineFrameSkipLoops").value = anim.skip || 0;
            bucleChange();
            cframe = 1;
            checkedFrames = new Array(anim.frames.length).fill(false);
            debugFrame = 0;
            writeTable();
        })
        .catch((error) => {
            notify(locale().LED.NOTIFY.ERROR, 'danger');
        });
}

function execute() {
    anim.time = parseInt(document.getElementById("inlineTime").value);
    anim.bucle = document.getElementById("inlineBucle").checked;
    anim.rotate = document.getElementById("inlineRotate").checked;
    anim.loops = parseInt(document.getElementById("inlineLoops").value);
    anim.skip = parseInt(document.getElementById("inlineFrameSkipLoops").value);
    postData('/nodes', { type: 'led', ...anim });
}

function executeById(obj) {
    postData('/nodes', { type: 'led', _id: obj.id, frames: [] });
}

function executeDebug() {
    document.getElementById(`${(debugFrame - 1 < 0) ? (anim.frames.length - 1) : (debugFrame - 1)}`).removeAttribute("style");

    var dFrame = document.getElementById(`${debugFrame}`);
    dFrame.style.backgroundColor = "rgba(0, 0, 0, .05)";
    dFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });

    postData('/nodes', { type: 'led', name: '', time: 0, frames: [anim.frames[debugFrame]] });
    debugFrame = (debugFrame == anim.frames.length - 1) ? 0 : debugFrame + 1;
}

function executeStop() {
    postData('/nodes', { type: 'led' });
    debugFrame = 0;
}

function executeEmulator() {
    $('#emulator').modal('show');
    anim.time = parseInt(document.getElementById("inlineTime").value);
    anim.bucle = document.getElementById("inlineBucle").checked;
    anim.rotate = document.getElementById("inlineRotate").checked;
    anim.loops = parseInt(document.getElementById("inlineLoops").value);
    anim.skip = parseInt(document.getElementById("inlineFrameSkipLoops").value);
    animEmulation = runAnim();
}

function stopEmulator() {
    clearInterval(animEmulation);
    for (let j = 0; j < 17; j++) {
        document.getElementById(`l${j}`).style.backgroundColor = `rgba(0, 0, 0, 0.0)`;
    }
    $('#emulator').modal('hide');
}

const runAnim = () => {
    let i = 0;
    let anim2 = clone(anim);
    let loop = setInterval(() => {
        for (let j = 0; j < anim2.frames[i].length; j++) {
            document.getElementById(`l${j}`).style.backgroundColor = anim2.frames[i][j] == "#000000" ? `rgba(0, 0, 0, 0.0)` : anim2.frames[i][j];
        }
        i++;
        if ((!anim2.bucle || (anim2.bucle && anim2.loops == 1)) && i >= anim2.frames.length) {
            clearInterval(loop);
        }
        if (anim2.frames.length <= i) {
            anim2.loops--;
            i = anim2.skip;
            if (!!anim2.rotate) {
                moveAllLedsOfAnim(anim2, true);
            }
        }
    }, anim2.time);
    return loop;
}

function bucleChange() {
    if (document.getElementById("inlineBucle").checked) {
        document.getElementById("inlineLoops").removeAttribute('disabled');
        document.getElementById("inlineFrameSkipLoops").removeAttribute('disabled');
    } else {
        document.getElementById("inlineLoops").setAttribute('disabled', 'disabled');
        document.getElementById("inlineFrameSkipLoops").setAttribute('disabled', 'disabled');
    }
}

// --- Checkbox Frames ---

function checkAllFrames(e) {
    checkedFrames.fill(e.checked);
    writeTable();
}

function checkFrame(e) {
    checkedFrames[parseInt(e.value)] = !checkedFrames[parseInt(e.value)];
    if (checkedFrames.indexOf(!checkedFrames[0]) == -1) {
        document.getElementById("allFrames").checked = checkedFrames[0];
        document.getElementById("allFrames").indeterminate = false;
    } else {
        document.getElementById("allFrames").indeterminate = true;
    }
    writeTable();
}

// --- Gradient ---

function hex(c) {
    var s = "0123456789abcdef";
    var i = parseInt(c);
    if (i == 0 || isNaN(c))
        return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

function convertToHex(rgb) {
    return `#${hex(rgb[0])}${hex(rgb[1])}${hex(rgb[2])}`;
}

function trim(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

function convertToRGB(hex) {
    var color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
}

function generateColor(colorStart, colorEnd, colorCount) {
    var start = convertToRGB(colorStart);
    var end = convertToRGB(colorEnd);
    var len = colorCount;
    var alpha = 0.0;
    var salida = [];
    for (i = 0; i < len; i++) {
        var c = [];
        alpha += (1.0 / len);
        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];
        salida.push(convertToHex(c));
    }
    return salida.reverse();
}

// --- Clone ---
function clone(params) {
    return JSON.parse(JSON.stringify(params));
}

// --- Color Picker ---
function setAsDefault(e, obj) {
    e.preventDefault();
    if (currentColor == obj.value) {
        currentColor = "";
        notify(`${locale().LEDEDITOR.UNSET_DEFAULT_COLOR}`);
    } else {
        currentColor = obj.value;
        notify(`${locale().LEDEDITOR.SET_DEFAULT_COLOR} ${obj.value}`);
    }
}

function handleColorChange(e, obj) {
    if (currentColor != "") {
        e.preventDefault();
        obj.value = currentColor;
        updateSingleColor(obj);
    }
};

