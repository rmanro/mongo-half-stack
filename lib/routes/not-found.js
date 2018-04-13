module.exports = (req, res) => {
    res.statusCode = 404;
    res.end(`${res.statusCode} Cannot ${req.method} ${req.url}`);
};