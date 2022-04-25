const responseMaker = (status, res, data) => {
  return res.status(status).json(
    status < 400
      ? {
          status: "successful",
          code: status,
          [typeof data === "string" ? "message" : "data"]: data,
        }
      : {
          status: "rejected",
          code: status,
          message: data,
        }
  );
};

module.exports = responseMaker;
