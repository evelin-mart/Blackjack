import jwt from 'jsonwebtoken';
import { UserAuthData } from '../types/auth';

export class Jwt {
    private static readonly secretKey = 'b3Uk526d';
    private static readonly header = { alg: 'HS256', typ: 'JWT' };

    static signToken(payload: UserAuthData) {
        const token = jwt.sign(payload, Jwt.secretKey, { header: this.header });
        return token;
    }

    static decode(token: string) {
        try {
            const data = jwt.verify(token, this.secretKey) as UserAuthData;
            if (!data.login || !data.password) {
                throw new Error();
            }
            return data;
        } catch {
            return undefined;
        }
    }
}
