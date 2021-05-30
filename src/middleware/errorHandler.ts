import { BusinessLogic } from "../shared/BusinessLogicInterface";

export const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      next(err);
    }
  }
}