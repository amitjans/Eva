import * as fs from 'fs';
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

Promise.all(
    fs.readdirSync(__dirname + '/').filter(f => f !== 'index.js')
        .map((file) => {
            import(`./${file}`);
        })
).then((modules) => modules.forEach((module) => module.load()));