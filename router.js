import express from 'express'
import userController from './controller/users'

export const router = express.Router

router.use('/user', userController)