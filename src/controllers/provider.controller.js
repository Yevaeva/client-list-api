const errorConfig = require('../../config/error.config')
const providerSchema = require('../schemas/provider.schema');
const mongoose = require('mongoose')


class ProviderController {

    getProviders = async (req, res, next) => {

        try {
            const providers = await providerSchema.find({}).exec();
            if (!providers) throw errorConfig.providerNotFound;

            res.json(providers);
        }
        catch (err) {
            next(err)
        }
    }

    createProvider = async (req, res, next) => {

        try {
            const data = req.body 
            console.log(data) 

            const newProvider = await providerSchema.create({
                name: data.name
            });

            if (!newProvider) throw errorConfig.providerNotFound;

            newProvider.save(function (err) {
                if (err) throw errorConfig.providerNotFound
                res.json(newProvider);
            });
        }
        catch (err) {
            console.log(err)
            next(err)
        }
    }

    updateProvider = async (req, res, next) => {

        try {
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) throw errorConfig.providerNotFound;
            const { name } = req.body;

            if (!name) throw errorConfig.nothingToUpdate
            const provider = await providerSchema.findOne({
                _id: req.params.id,

            });
            if (!provider) throw errorConfig.providerNotFound;
            name && (provider.name = name);
            await provider.save();
            res.json(provider);

        }
        catch (err) {
            next(err)
        }
    }

    deleteProvider = async (req, res, next) => {

        try {
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) throw errorConfig.providerNotFound;

            const provider = await providerSchema.findOneAndDelete({
                _id: req.params.id,
            });

            if (!provider) throw errorConfig.providerNotFound;
            res.json({ success: true });
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = new ProviderController();
