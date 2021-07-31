import jwt from 'jsonwebtoken';
import config from '../config';
import { userInfo } from '../interface/userInfo';

export const jwtGenerate = (userInfo: userInfo) => {
    const payload = {
        data: userInfo,
    }
    return jwt.sign(payload, config.secretKey as string, {expiresIn: "1h"} );
}