// custom response
import httpStatus from "http-status";
const sendResponse = (res, data) => {
  res.status(data.status ?? httpStatus.OK).json({
    success: data.success ?? true,
    meta: data.meta ?? null,
    statusCode: data.status ?? httpStatus.OK,
    message: data.message ?? null,
    data: data.data ?? null,
  });
};
export default sendResponse;
