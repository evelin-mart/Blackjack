import { KJUR, b64utoutf8 } from 'jsrsasign';
import { UserAuthData } from '../types';

export class Jwt {
    private static readonly algorithm = 'HS256';
    private static readonly secretKey = 'b3Uk526d';
    private static readonly header = JSON.stringify({ alg: this.algorithm, typ: 'JWT' });

    static signToken(payload: UserAuthData) {
        const sPayload = JSON.stringify(payload);
        const token = KJUR.jws.JWS.sign(this.algorithm, this.header, sPayload, {
            utf8: this.secretKey,
        });
        return token;
    }

    static decode(token: string) {
        try {
            const isValid = KJUR.jws.JWS.verifyJWT(token, this.secretKey, {
                alg: [this.algorithm],
            });

            if (!isValid) {
                throw new Error();
            }

            const data = KJUR.jws.JWS.readSafeJSONString(
                b64utoutf8(token.split('.')[1]),
            ) as UserAuthData;

            if (!data.login || !data.password) {
                throw new Error();
            }
            return data;
        } catch {
            return undefined;
        }
    }
}
