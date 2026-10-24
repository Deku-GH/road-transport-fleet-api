import {Router} from 'express'
import { analyseRouter } from '../Analytics.route.js'

const v2Route =Router()

v2Route.use("/analyse",analyseRouter);

export default v2Route ; 