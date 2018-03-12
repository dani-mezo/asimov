var Hash = require('password-hash');
var crypto = require('crypto');

var Crypto = function(){

    var random = function() {
        var sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        return sha.digest('hex');
    };

    return {
        random: random,
        hash: Hash.generate,
        verify: Hash.verify
    }
}

module.exports=Crypto;