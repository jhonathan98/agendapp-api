import jwt from "jsonwebtoken";
import environments from "../config/environments";

export const authVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('token is mandatory');
    }

    const token = authHeader.split(' ')[1];
    try {
        // Restringir algoritmos esperados evita la falla donde una clave pública
        // puede usarse como secreto HMAC (vulnerabilidad de auth0/node-jws).
        const decoded = jwt.verify(token, environments.secret, { algorithms: ['HS256'] });
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}
