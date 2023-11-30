import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken';

interface DecodedToken {
    email: string;
    role: string;
}

const authToken = (req: Request, res: Response, next: NextFunction) => {
    try {

        const tokenAuth = req.header('Authorization');

        if (!tokenAuth) {
            return res.status(401).json({ auth: false, message: 'Token no proporcionado' });
        }

        let token = tokenAuth!.split(' ')[1];

        let secretKey = process.env.SECRET_KEY

        jwt.verify(token, secretKey!, (err: VerifyErrors | null, decoded) => {
            if (err) {
                console.log("error", err);
                return res.status(401).json({ auth: false, message: 'Error al autenticar el token' });
            }

            if (decoded) {
                // El token es válido, puedes acceder a las propiedades del token
                const { email, role } = decoded as DecodedToken;

                res.setHeader('emailToken', email)
                res.setHeader('rolToken', role)

                next();

            } else {
                return res.status(401).json({ auth: false, message: 'Token inválido' });
            }
        });

    } catch (error) {
        console.log("ERROR: " + error);

    }
};

export default authToken;