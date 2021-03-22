
exports.success = (res, obj) => {

  const { code, message, data, pagination } = obj;

  return res.status(code).json({ status: true, message, data, pagination })
};


exports.error = (res, e) => {

  const { code, message } = e;

  return res.status(this.validateError(code)).json({ status: false, message, data: null, pagination: null })
};

exports.validateError = (code) => {

  const errorCode = [100,101,200,201,202,
    203, 204,205,206,300,
    301,302, 303,304,305,
    306,307, 400,401,402,
    403,404,405,406,407,
    408,409,410,411,412,
    413,414,415,416,417,
    500,501,502,503,504,505];

  return errorCode.includes(code)? code: 503
};