import crypto from 'crypto'

export default function (value, algorithm = 'md5') {
    return crypto.createHash(algorithm).update(value).digest("hex");
}