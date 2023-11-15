const {
    AssetsModel,
} = require('../../../models')
class assetService {
    createAsset = async (req, mediaType) => {
        try {
            if (req.file == undefined) {
                return res.status(400).send("Please upload a file!");
            }
            const p = []
            p.push(req.file)
            const assetData = [];
            p.forEach(element => {
                if (element.originalname != undefined && element.originalname != null) {
                    assetData.push({
                        "originalname": element.originalname,
                        "name": element.originalname,
                        "path": `uploads` + element.filename,
                        "creator": req
                            .auth
                            .userData
                            ._id
                            .toString(),
                        "mediatype": mediaType,
                        "alttext": element.originalname,
                        "filedata": element,
                        "mimetype": element.mimetype
                    });
                }
            });
            const assets = await AssetsModel.create(assetData);
            return assets;
        } catch (error) {
            return {
                error: error.toString()
            }
        }
    }
}

module.exports = new assetService;