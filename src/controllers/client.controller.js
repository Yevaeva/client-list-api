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




            // getMessagesInRoom = async (req, res) => {

            //     const info = await MsgModel
            //         .find({ to: req.params.roomId })
            //         .sort({ created: -1 })
            //         .limit(50)
            //         .populate({ path: 'senderId' });
            //     let result = info.map((i) => {
            //         return {
            //             body: i.text,
            //             id: i._id,
            //             room: i.to,
            //             user: {
            //                 id: i.senderId._id,
            //                 name: i.senderId.name,
            //                 picture: "/Messanger/static/media/avatar.79bfd233.png"
            //             }
            //         }
            //     })
            //     res.json({ 'messages': result })
            // }

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

            
            const providers = await providerSchema.find({name: {$in: data.providers}}).exec();
            console.log('providers', providers)

            let prov = providers.map(p=>p._id) 
            clientSchema.create({
                ...clientData,
                providers: [...prov]
            }, async function (err) {
                if (err) return err
                const client = await clientSchema.findOne({ name: clientData.name }).populate({ path: 'providers' }).exec();
                if (!client) throw errorConfig.taskNotFound; 
                console.log(client)
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
                
                const {name, email, phone} = req.body;
                name && ( client.name = name);
                email && (client.email = email);
                phone && ( client.phone = phone);

                const providers = await providerSchema.find({name: {$in: req.body.providers}}).exec();
                console.log('providers', providers)
    
                let prov = providers.map(p=>p._id) 
                  prov && ( client.providers = [...prov]);
                await client.save();
                console.log(client)

                const editedClient = await clientSchema.findOne({ _id: req.params.id,}).populate({ path: 'providers' }).exec();
                if (!client) throw errorConfig.taskNotFound; 
                console.log(editedClient)
                res.json(editedClient);
              
            } catch (err) {
                next(err)
            }
        }

        deleteClient = async (req, res, next) => {
            try {
                const client = await clientSchema.findOneAndDelete({
                    _id: req.params.id,
                   
                });
                
                if (!client) throw errorConfig.taskNotFound;
                res.json({success: true});
            } catch (err) {
                next(err)
            }
        }
        
        
    

}

module.exports = new ClientController();
