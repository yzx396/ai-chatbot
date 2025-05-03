import 'dotenv/config';

const { VCAP_SERVICES } = process.env;

let cred = { uri: '', sslcert: '', sslrootcert: '' };

// CF
if (VCAP_SERVICES) {
    cred = JSON.parse(VCAP_SERVICES)['postgresql-db'][0].credentials;
} else { // local
    if (!process.env.POSTGRES_URL) {
        throw new Error('POSTGRES_URL is not defined');
    }
    cred.uri = process.env.POSTGRES_URL;
}
export const dbConfig = {
    connectionString: cred.uri,
    ssl: cred.sslcert && cred.sslrootcert ? { cert: cred.sslcert, ca: cred.sslrootcert } : false,
}
