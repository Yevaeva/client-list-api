const errorConfig = require('../../config/error.config');
const clientSchema = require('../schemas/client.schema');
const providerSchema = require('../schemas/provider.schema');
const mongoose = require('mongoose')



class ClientController {

    getClients = async (req, res, next) => {
        try {

            const { query } = req;

            const dbQuery = {};

            if (query.search) {
                const searchReg = new RegExp(query.search, 'ig');
                dbQuery.$or = [{ name: searchReg }, { email: searchReg }];
            }


            const sort = {};
            if (query.sort) {
                switch (query.sort) {
                    case 'a-z':
                        sort.name = 1;
                        break;
                    case 'z-a':
                        sort.name = -1;
                        break;
                }
            }

            const clients = await clientSchema.find(dbQuery).sort(sort).populate({ path: 'providers' }).exec();
            if (!clients) throw errorConfig.clientNotFound;
            res.json(clients);



        }
        catch (err) {
            next(err)
        }
    }

    create = async (req, res, next) => {

        try {
            const data = req.body
            const names = data.providers.map((prov) => prov.name)
            const providers = await providerSchema.find({ name: { $in: names } }).exec();
            if (providers.length === 0 && !!names[0]) throw errorConfig.providerNotFound
            const prov = providers.map(p => p._id)

            const clientData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                providers: [...prov]
            }
            clientSchema.create({ ...clientData }, async function (err) {
                try {
                    if (err) throw err
                    const client = await clientSchema.findOne({ email: clientData.email }).populate({ path: 'providers' }).exec();
                    if (!client) throw errorConfig.emailValidationError

                    res.json(client);
                }
                catch (err) {
                    next(err)
                }
            });
        }
        catch (err) {
            next(err)
        }
    }

    update = async (req, res, next) => {
        try {
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) throw errorConfig.clientNotFound
            const client = await clientSchema.findOne({
                _id: req.params.id,
            });
            if (!client) throw errorConfig.clientNotFound;
            const { name, email, phone } = req.body;
            if (!name || !email || !phone) {
                throw errorConfig.pathIsRequired
            }

            const names = req.body.providers.map(p => p.name)
            const providers = await providerSchema.find({ name: { $in: names } }).exec();
            let prov = providers.map(p => p._id)
            prov && (client.providers = [...prov]);
            name && (client.name = name);
            email && (client.email = email);
            phone && (client.phone = phone);
            await client.save();

            const editedClient = await clientSchema.findOne({ _id: req.params.id, }).populate({ path: 'providers' }).exec();
            if (!client) throw errorConfig.taskNotFound;
            res.json(editedClient);

        } 
        catch (err) {
            next(err)
        }
    }

    delete = async (req, res, next) => {
        try {
            const validId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (!validId) throw errorConfig.clientNotFound

            const client = await clientSchema.findOneAndDelete({
                _id: req.params.id,
            });

            if (!client) throw errorConfig.taskNotFound;
            res.json({ success: true });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ClientController();
