import counterModel from "../models/counter/counter.model.js";

export const generateCustomId = async ({
  modelName,
  rolePrefix = "USR",
  companyPrefix = "",
  pad = 4,
}) => {
  // Create string ID for counter
  const counterId = companyPrefix ? `${companyPrefix}_${modelName}` : modelName;

  const updated = await counterModel
    .findByIdAndUpdate(
      counterId, // <--- THIS MUST BE STRING
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    .lean();

  const sequenceNumber = updated.sequence_value;
  const paddedNumber = String(sequenceNumber).padStart(pad, "0");

  return companyPrefix
    ? `${rolePrefix}-${companyPrefix}-${paddedNumber}`
    : `${rolePrefix}-${paddedNumber}`;
};
