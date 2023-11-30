import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateToken from '../helpers/generate-token';
import Provider from '../models/Provider';
import Grocer from '../models/Grocer';
import { loginGrocer } from '../services/grocer-service';
import { loginProvider } from '../services/provider-service';

export const provider = async (req: Request, res: Response) => {

    try {
        let { email_provider, password_provider } = req.body;

        if (!password_provider) {
            return res.status(400).json({ Status: 'La contraseña es obligatoria' });
        }
        const data: any = {
            email_provider,
            password_provider
        };

        loginProvider(data, (error: any, verificar: any) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else
                if (verificar) {
                    let secret_key: any = process.env.SIGNING_KEY_TOKEN;
                    let token: any = generateToken(
                        { role: "provider", email: email_provider },
                        secret_key, new Date().getTime() + (2 * 60 * 1000)
                    )
                    return res.status(200).json({ status: 'Successful authentication', token: token });
                } else {
                    return res.status(401).json({ Status: 'Incorrect credentials' });
                }
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }

};

export const grocer = async (req: Request, res: Response) => {
    try {
        let { email_grocer, password_grocer } = req.body;

        if (!password_grocer) {
            return res.status(400).json({ Status: 'Password is required' });
        }
        const data: any = {
            email_grocer,
            password_grocer
        };

        loginGrocer(data, (error: any, verificar: any) => {
            if (error) {
                res.status(500).json({ "error": error.message });
            } else
                if (verificar) {
                    let secret_key: any = process.env.SIGNING_KEY_TOKEN;
                    let token: any = generateToken(
                        { role: "grocer", email: email_grocer },
                        secret_key, new Date().getTime() + (2 * 60 * 1000)
                    )
                    return res.status(200).json({ status: 'Successful authentication', token: token });
                } else {
                    return res.status(401).json({ Status: 'Incorrect credentials' });
                }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `failed to login`
        });
    }
};