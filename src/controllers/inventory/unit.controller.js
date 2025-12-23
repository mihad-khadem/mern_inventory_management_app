import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  createConversion,
  getAllConversions,
  getConversionById,
  updateConversion,
  deleteConversion,
  convertUnit,
} from "../../services/inventory/unit.service.js";

// UNIT CONTROLLERS

// Create Unit
export const createUnitController = catchAsync(async (req, res) => {
  const unit = await createUnit(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "Unit created successfully",
    data: unit,
  });
});

// Get all Units
export const getAllUnitsController = catchAsync(async (req, res) => {
  const units = await getAllUnits(req.query);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Units fetched successfully",
    data: units,
  });
});

// Get single Unit
export const getUnitByIdController = catchAsync(async (req, res) => {
  const unit = await getUnitById(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit fetched successfully",
    data: unit,
  });
});

// Update Unit
export const updateUnitController = catchAsync(async (req, res) => {
  const unit = await updateUnit(req.params.id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit updated successfully",
    data: unit,
  });
});

// Delete Unit
export const deleteUnitController = catchAsync(async (req, res) => {
  const unit = await deleteUnit(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit deleted successfully",
    data: unit,
  });
});

// UNIT CONVERSION CONTROLLERS

// Create Conversion
export const createConversionController = catchAsync(async (req, res) => {
  const conversion = await createConversion(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "Unit conversion created successfully",
    data: conversion,
  });
});

// Get all Conversions
export const getAllConversionsController = catchAsync(async (req, res) => {
  const conversions = await getAllConversions(req.query);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit conversions fetched successfully",
    data: conversions,
  });
});

// Get single Conversion
export const getConversionByIdController = catchAsync(async (req, res) => {
  const conversion = await getConversionById(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit conversion fetched successfully",
    data: conversion,
  });
});

// Update Conversion
export const updateConversionController = catchAsync(async (req, res) => {
  const conversion = await updateConversion(req.params.id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit conversion updated successfully",
    data: conversion,
  });
});

// Delete Conversion
export const deleteConversionController = catchAsync(async (req, res) => {
  const conversion = await deleteConversion(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Unit conversion deleted successfully",
    data: conversion,
  });
});
