import { sequelize } from "../../models/sequelize.js";


export async function startTransaction(req, res, next) {

    req.transaction = await sequelize.transaction();

    next();

}

export async function completeTransaction(req, res) {

    await req.transaction.commit();

    if (Object.keys(res.locals).length) {
        return res.status(201).json(res.locals);
    }

    res.sendStatus(200);
}