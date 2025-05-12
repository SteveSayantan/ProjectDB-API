const Institute = require("../models/Institute");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const validateProfileData = require("../utils/validateProfileData");

const getAllInstitutes = async (req, res, next) => {
    try {
        const allInstitutes = await Institute.find({}, { password: 0 });
        res.status(StatusCodes.OK).json({
            success: true,
            institutes: allInstitutes,
        });
    } catch (err) {
        next(err);
    }
};

const getSingleInstitute = async (req, res, next) => {
    const instituteId = req.params.id;
    try {
        const institute = await Institute.findById(instituteId).select(
            "-password"
        );
        if (!institute) {
            throw new AppError(
                "Institute is not registered",
                StatusCodes.NOT_FOUND
            );
        }
        res.status(StatusCodes.OK).json({ success: true, institute });
    } catch (err) {
        next(err);
    }
};

const createInstitute = async (req, res, next) => {
    const instituteDetails = req.body;
    try {
        validateProfileData(instituteDetails);
        instituteDetails.password = await bcrypt.hash(
            instituteDetails.password,
            10
        );

        const institute = new Institute(instituteDetails);
        await institute.save();

        const { password, ...safeInstituteDetails } = institute.toObject();
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Institute created Successfully",
            instituteDetails: safeInstituteDetails,
        });
    } catch (err) {
        next(err);
    }
};

const deleteInstitute = async (req, res, next) => {
    const instituteId = req.params.id;
    const { password } = req.body;
    try {
        const institute = await Institute.findById(instituteId);
        if (!institute) {
            throw new AppError("Institute not found", StatusCodes.NOT_FOUND);
        }
        const isMatch = await institute.validatePassword(password);
        if (!isMatch) {
            throw new AppError("Incorrect Password", StatusCodes.UNAUTHORIZED);
        }
        await institute.deleteOne();
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Institute deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllInstitutes,
    getSingleInstitute,
    createInstitute,
    deleteInstitute,
};
