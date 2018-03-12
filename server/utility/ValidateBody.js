function ValidateBody(requiredProperties, processor) {
    return (req, res) => {
        const body = req.body;
        if(!body || requiredProperties.some(prop => !body[prop]))
            return res.status(406).send('Invalid data format');
        processor(body, res);
    }
}

module.exports = ValidateBody;