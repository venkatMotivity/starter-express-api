const commonResponse = ({
    req,
    res,
    status = false,
    message = "",
    data = null,
    statusCode = '',
    error = null
}) => {
    let finalMessage = status ? message == '' ? "Success" : message : message == '' ? "Error Something went wrong" : message;
    let code = status ? 200 : statusCode;
    res.status(parseInt(code)).json({
        status,
        "message": finalMessage,
        data,
        error
    });
};

module.exports = {
    commonResponse,
};