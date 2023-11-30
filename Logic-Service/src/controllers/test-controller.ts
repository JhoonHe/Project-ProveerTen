import { Request, Response } from 'express';

export const test = (req: Request, res: Response) => {

    let token = res.getHeader('emailToken');
    let rolToken = res.getHeader('rolToken');

    if(rolToken){

    }

    res.status(200).json({ "Status": "Ok", token, rolToken });
}
