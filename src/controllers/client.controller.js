const errorConfig = require('../../config/error.config')
const clientSchema = require('../schemas/client.schema');
const providerSchema = require('../schemas/provider.schema');
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId

class ClientController {



    getClients = async (req, res, next) => {
        try {
            const { userId } = res.locals,
                { query } = req;

            const dbQuery = {

            };

            const sort = {};

            const clients = await clientSchema.find(dbQuery).sort(sort).populate({ path: 'providers' }).exec();
            if (!clients) throw errorConfig.taskNotFound;

            res.json(clients);

        }
        catch (err) {
            next(err)
        }
    }

    create = async (req, res, next) => {

        try {
            const data = req.body
            const clientData = {
                name: data.name,
                email: data.email,
                phone: data.phone
            }

            const names = data.providers.map((prov) => prov.name)

            const providers = await providerSchema.find({ name: { $in: names } }).exec();
            console.log('providers', providers)
            console.log('names', names)

            let prov = providers.map(p => p._id)
            clientSchema.create({
                ...clientData,
                providers: [...prov]
            }, async function (err) {
                if (err) return err
                const client = await clientSchema.findOne({ email: clientData.email }).populate({ path: 'providers' }).exec();
                if (!client) throw errorConfig.taskNotFound;
                console.log('client', client)
                res.json(client);

            });
        }
        catch (err) {
            console.log(err)
            next(err)
        }
    }

    update = async (req, res, next) => {
        try {
            const client = await clientSchema.findOne({
                _id: req.params.id,

            });
            if (!client) throw errorConfig.taskNotFound;

            const { name, email, phone } = req.body;
            name && (client.name = name);
            email && (client.email = email);
            phone && (client.phone = phone);

            const names = req.body.providers.map(p=>p.name)
            const providers = await providerSchema.find({ name: { $in: names } }).exec();
            console.log('providers', providers)

            let prov = providers.map(p => p._id)
            prov && (client.providers = [...prov]);
            await client.save();
            console.log(client)

            const editedClient = await clientSchema.findOne({ _id: req.params.id, }).populate({ path: 'providers' }).exec();
            if (!client) throw errorConfig.taskNotFound;
            console.log(editedClient)
            res.json(editedClient);

        } catch (err) {
            next(err)
        }
    }

    delete = async (req, res, next) => {
        try {
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
