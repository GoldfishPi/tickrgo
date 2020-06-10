import sjcl from 'sjcl';
import 'buffer';
/**
 * Some very basic crypto wrappers
 */
var pcrypt = {
    random_number: function () {
        if (window.crypto && window.crypto.getRandomValues) {
            return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
        }
        else {
            return Math.random();
        }
    },

    random_bytes: function (nBytes:number) {
        // NOTE: this was taken directly from CryptoJS' random() function, but
        // updated to use tcrypt.random_number() instead of Math.random().
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
            words.push((pcrypt.random_number() * 0x100000000) | 0);
        }
        return words;
    },

    to_utf8: function (str:string) {
        return unescape(encodeURIComponent(str))
    },

    from_utf8: function (str:string) {
        return decodeURIComponent(escape(str));
    },

    pbkdf2: function (password:string, salt:string, iterations:number, size_bytes:any) {
        var passbits = sjcl.codec.utf8String.toBits(pcrypt.to_utf8(password));
        var key = sjcl.misc.pbkdf2(passbits, salt, iterations, size_bytes * 8, function (p:any) {
            return new sjcl.misc.hmac(p, sjcl.hash.sha256);
        });
        return key;
    },

    sha256: function (string:string) {
        var hasher = sjcl.hash.sha256.hash(string);
        return sjcl.codec.hex.fromBits(hasher);
    },
    to_base64: function (obj:any) {
        if (typeof (btoa) != 'undefined' && btoa instanceof Function) {
            return btoa(obj);
        } else {
            return (new Buffer(obj)).toString('base64');
        }
    },
    gen_auth: function (username:string, password?:string) {
        if (username.match(/^[0-9a-f]+$/)) {
            return 'Basic ' + this.to_base64(username)
        } else {
            return 'Basic ' + this.to_base64(username + ':' + password);
        }
    },
    derivePassword(password_str:string, salt_str:string) {
        var split = salt_str.split(":");
        var iter = parseInt(split[0]);
        var salt_base64 = split[1];

        var passbits = sjcl.codec.utf8String.toBits(
            pcrypt.to_utf8(password_str)
        );
        var salt = sjcl.codec.base64.toBits(salt_base64);
        let res = pcrypt.pbkdf2(passbits, salt, iter, 64);
        return {password:sjcl.codec.base64.fromBits(res), salt:salt_str};
    },
    createPassword( password:string, options:any) {
        var iter = 24000;
        var salt = pcrypt.random_bytes(32);
        var salt_str = iter + ':' + sjcl.codec.base64.fromBits(salt);
        return this.derivePassword(password, salt_str);
    },
}

export default pcrypt;
