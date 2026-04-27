import { Router } from "express";
import checkAccess from "../checking/checkAccess.js";
import setApplicant from "./setApplicant.js";
import getApplicant from "./getApplicant.js";
import deleteApplicant from "./deleteApplicant.js";
import getApplicants from "./getApplicants.js";
import getProfiles from "../users/getProfiles.js";
import acceptApplicant from "./acceptApplicant.js";

export const applicantsRouter = Router();


applicantsRouter.get("/:courseId/setApplicant", setApplicant);
applicantsRouter.get("/:courseId/getApplicant", getApplicant);
applicantsRouter.get("/:courseId/getApplicants", getApplicants, getProfiles);
applicantsRouter.get("/:courseId/deleteApplicant", deleteApplicant);


applicantsRouter.post("/:courseId/acceptApplicant", checkAccess, acceptApplicant, deleteApplicant);
applicantsRouter.delete("/:courseId/declineApplicant", checkAccess, deleteApplicant);