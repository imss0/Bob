'use strict';
import { Request, Response } from "express";
const db = require('../models');

exports.getUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (!id) throw new Error('id is required');
    let user = await db.User.findOrCreate({
      where: { user_id : id }
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
