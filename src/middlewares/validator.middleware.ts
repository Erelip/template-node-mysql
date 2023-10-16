import { BadRequestException } from "@exceptions";
import type { Request, Response, NextFunction } from "express";
import { checkSchema, validationResult } from "express-validator";

type ValidationMiddleware = (
    schema: any
) => (req: Request, res: Response, next: NextFunction) => void;

const rateLimits = new Map();
const MAX_WORDS_PER_DAY = 80000;

export const validate: ValidationMiddleware = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await checkSchema(schema).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return next(new BadRequestException(errors.array().at(0)?.msg));
        return next();
    };
};