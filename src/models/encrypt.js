import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';


const Encrypt = {
    oninit: () => {
        // update localstorage-slim
        ls.config.encrypt = true; // global encryption
        ls.config.secret = 'v4.Metrovirtual'; // global secret

        // update encrypter to use AES encryption
        ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();

        // update decrypter to decrypt AES-encrypted data
        ls.config.decrypter = (data, secret) => {
            try {
                return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
            } catch (e) {
                // incorrect/missing secret, return the encrypted data instead
                return data;
            }
        };
    },
    setDataNotificaciones: (_data) => {
        Encrypt.oninit();
        return ls.set('updatesNotificaciones', _data);
    },
    getDataNotificaciones: () => {
        Encrypt.oninit();
        return ls.get('updatesNotificaciones');
    },
    setData: (_data) => {
        Encrypt.oninit();
        return ls.set('updates', _data);
    },
    setDataUser: (_data) => {
        Encrypt.oninit();
        return ls.set('dataUser', _data);
    },
    getData: (_data) => {
        Encrypt.oninit();
        return ls.get('updates');
    },
    getDataUser: (_data) => {
        Encrypt.oninit();
        return ls.get('dataUser');
    },

};

export default Encrypt;