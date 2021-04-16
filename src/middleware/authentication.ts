const jwt = require('jsonwebtoken');

export function userAuthenticated(token: any) {
    try {

        if (!token) return false;
        const verified = jwt.verify(token, process.env.token_pass, {
            expiresIn: '1h'
        })
        return verified;

    } catch (err) {
        return false;
    }
}
