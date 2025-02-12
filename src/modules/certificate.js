
class certificate{

    name = "RSASSA-PKCS1-v1_5";
    modulusLength = 2048;
    publicExponent= [0x01, 0x00, 0x01];
    hash = "SHA-256";
    
    generateCertificate = () =>{
        return {
            name : this.name,
            modulusLength : this.modulusLength,
            publicExponent : new Uint8Array(this.publicExponent),
            hash : this.hash
        }
    }
}

module.exports = certificate;