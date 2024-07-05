//máximo común divisor
function gcd(a, b) {
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

//modular
function modInverse(e, phi) {
    let [a, b] = [e, phi];
    let [u0, u1] = [0n, 1n];
    while (a !== 0n) {
        let [q, r] = [b / a, b % a];
        [u0, u1] = [u1, u0 - q * u1];
        [b, a] = [a, r];
    }
    return u0 < 0n ? u0 + phi : u0;
}


function generateKeys(p, q, e) {
    const n = p * q;
    const phi = (p - 1n) * (q - 1n);
    if (gcd(e, phi) !== 1n && phi<n) {
        throw new Error("e debe ser coprimo con φ(n) o menor a phi");
    }
    const d = modInverse(e, phi);
    return { publicKey: { e, n }, privateKey: { d, n } };
}

function encrypt(publicKey, message) {
    const m = BigInt(message);
    return m ** publicKey.e % publicKey.n;
}

function decrypt(privateKey, ciphertext) {
    return ciphertext ** privateKey.d % privateKey.n;
}


function rsaEncrypt() {
    try {
        const p = BigInt(document.getElementById('InputP').value);
        const q = BigInt(document.getElementById('InputQ').value);
        const e = BigInt(document.getElementById('InputE').value);
        const { publicKey, privateKey } = generateKeys(p, q, e);
        const message = document.getElementById('InputText').value;
        const ciphertext = encrypt(publicKey, BigInt(message));
        document.getElementById('InputResult').value = ciphertext.toString();
        document.getElementById('publicKey').textContent = `Public Key: e=${publicKey.e}, n=${publicKey.n}`;
        document.getElementById('privateKey').textContent = `Private Key: d=${privateKey.d}, n=${privateKey.n}`;
    } catch (error) {
        alert(error.message);
    }
}

function rsaDecrypt() {
    const privateKeyParts = document.getElementById('privateKey').textContent.split(',');
    const privateKey = {
        d: BigInt(privateKeyParts[0].split('=')[1]),
        n: BigInt(privateKeyParts[1].split('=')[1])
    };
    const ciphertext = BigInt(document.getElementById('InputText').value);
    const plaintext = decrypt(privateKey, ciphertext);
    document.getElementById('InputResult').value = plaintext.toString();
}
