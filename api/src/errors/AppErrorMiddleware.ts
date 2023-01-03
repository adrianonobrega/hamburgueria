import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';

export function logger(req: Request, res: Response, next: NextFunction,error:Error) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }

    return res.status(500).json({
        message: 'Internal server error',
    })
};