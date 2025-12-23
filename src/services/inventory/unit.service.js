import UnitModel from "../../models/inventory/unit.model.js";
import UnitConversionModel from "../../models/inventory/unitConversion.model.js";
import ApiError from "../../error/apiError.js";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder.js";

// UNIT CRUD

// Create Unit
export const createUnit = async (payload) => {
  const exists = await UnitModel.findOne({ name: payload.name });
  if (exists) throw new ApiError(httpStatus.CONFLICT, "Unit already exists");

  const unit = await UnitModel.create(payload);
  return unit;
};

// Get all Units
export const getAllUnits = async (query) => {
  const qb = new QueryBuilder(UnitModel.find(), query)
    .search(["name", "shortName", "symbol"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return qb.exec();
};

// Get one Unit
export const getUnitById = async (id) => {
  const unit = await UnitModel.findById(id);
  if (!unit) throw new ApiError(httpStatus.NOT_FOUND, "Unit not found");
  return unit;
};

// Update Unit
export const updateUnit = async (id, payload) => {
  const unit = await UnitModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!unit) throw new ApiError(httpStatus.NOT_FOUND, "Unit not found");
  return unit;
};

// Delete Unit
export const deleteUnit = async (id) => {
  const unit = await UnitModel.findByIdAndDelete(id);
  if (!unit) throw new ApiError(httpStatus.NOT_FOUND, "Unit not found");
  return unit;
};

// UNIT CONVERSION CRUD

// Create Conversion
export const createConversion = async ({
  fromUnit,
  toUnit,
  factor,
  description,
}) => {
  if (fromUnit.toString() === toUnit.toString())
    throw new ApiError(httpStatus.BAD_REQUEST, "Cannot convert unit to itself");

  const exists = await UnitConversionModel.findOne({ fromUnit, toUnit });
  if (exists)
    throw new ApiError(httpStatus.CONFLICT, "Conversion already exists");

  const conversion = await UnitConversionModel.create({
    fromUnit,
    toUnit,
    factor,
    description,
  });
  return conversion;
};

// Get all conversions
export const getAllConversions = async (query) => {
  const qb = new QueryBuilder(
    UnitConversionModel.find().populate(
      "fromUnit toUnit",
      "name shortName symbol"
    ),
    query
  )
    .search(["description"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return qb.exec();
};

// Get single conversion
export const getConversionById = async (id) => {
  const conversion = await UnitConversionModel.findById(id).populate(
    "fromUnit toUnit",
    "name shortName symbol"
  );
  if (!conversion)
    throw new ApiError(httpStatus.NOT_FOUND, "Conversion not found");
  return conversion;
};

// Update conversion
export const updateConversion = async (id, payload) => {
  const conversion = await UnitConversionModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!conversion)
    throw new ApiError(httpStatus.NOT_FOUND, "Conversion not found");
  return conversion;
};

// Delete conversion
export const deleteConversion = async (id) => {
  const conversion = await UnitConversionModel.findByIdAndDelete(id);
  if (!conversion)
    throw new ApiError(httpStatus.NOT_FOUND, "Conversion not found");
  return conversion;
};

//UNIT HELPER

// Convert quantity from one unit to another
export const convertUnit = async (fromUnitId, toUnitId, quantity) => {
  if (fromUnitId.toString() === toUnitId.toString()) return quantity;

  const conversion = await UnitConversionModel.findOne({
    fromUnit: fromUnitId,
    toUnit: toUnitId,
  });
  if (!conversion)
    throw new ApiError(httpStatus.BAD_REQUEST, "Unit conversion not defined");

  return quantity * conversion.factor;
};
