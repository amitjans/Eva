function anterior(value) {
    return value - 1 < 0 ? anterior(19 + (value - 1)) : value - 1;
}

function siguiente(value) {
    return value + 1 >= 18 ? siguiente(value - 18) : value + 1;
}

function frente (value) {
	return siguiente(value + 8);
}

function hexToRgb(value) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
}

function rgbToHex(value) {
    return `#${("0" + value.r.toString(16)).slice(-2)}${("0" + value.g.toString(16)).slice(-2)}${("0" + value.b.toString(16)).slice(-2)}`;
}

function modColor(value, mod, upper = { r: 255, g: 255, b: 255 }, lower = { r: 0, g: 0, b: 0 } ) {
    let rgb = hexToRgb(value);
    let arr = ['r', 'g', 'b']
    for (let i = 0; i < arr.length; i++) {
        if (rgb[arr[i]] + mod < lower[arr[i]]) {
            rgb[arr[i]] = lower[arr[i]];
        } else if (rgb[arr[i]] + mod > upper[arr[i]]) {
            rgb[arr[i]] = upper[arr[i]];
        } else {
            rgb[arr[i]] = rgb[arr[i]] + mod;
        }
    }
    return rgbToHex(rgb);
}

function gradient(lower = '#000000', upper = '#ffffff', steps = 1, reverse = false) {
    let rgb_lower = hexToRgb(lower);
    let rgb_upper = hexToRgb(upper);
    let result = [];
    let local_steps = { r: Math.ceil(Math.abs(rgb_upper.r - rgb_lower.r) / steps),
        g: Math.ceil(Math.abs(rgb_upper.g - rgb_lower.g) / steps),
        b: Math.ceil(Math.abs(rgb_upper.b - rgb_lower.b) / steps) };
    result.push(rgbToHex(rgb_lower));
    let temp_color = rgb_lower;
    for (let i = 0; i < steps; i++) {
        temp_color = {
            r: gradient_value(temp_color.r, rgb_upper.r, local_steps.r),
            g: gradient_value(temp_color.g, rgb_upper.g, local_steps.g),
            b: gradient_value(temp_color.b, rgb_upper.b, local_steps.b)
        };
        result.push(rgbToHex(temp_color));
    }
    return reverse ? result.reverse() : result;
}

function gradient_value(ini, end, step) {
    if (ini <= end) {
        return (ini + step > end) ? end : ini + step;
    } else {
        return (ini - step < end) ? end : ini - step;
    }
}

module.exports = {
    anterior,
    siguiente,
    frente,
    hexToRgb,
    rgbToHex,
    modColor,
    gradient
}