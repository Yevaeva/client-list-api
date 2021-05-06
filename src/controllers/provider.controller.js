const errorConfig = require('../../config/error.config')
const ObjectId = require('mongoose').Types.ObjectId
const clientSchema = require('../schemas/client.schema');
const providerSchema = require('../schemas/provider.schema');
const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId

class ProviderController {



    getProviders = async (req, res, next) => {
        try {
         
            const dbQuery = {};

            const providers = await providerSchema.find(dbQuery).exec();
            if (!providers) throw errorConfig.taskNotFound;

            res.json(providers);  
        }
        catch (err) {
            next(err)
        }
    }

    createProvider = async (req, res, next) => {
      
        try {
            const data = req.body
            // const clientData = {
            //     name: data.name,
            //     email: data.email,
            //     phone: data.phone
            // }

            const newProvider = await providerSchema.create({
                name: data.name
            });

            newProvider.save(function (err) {
                if (err) return handleError(err);

                // const newClient = new clientSchema({  
                //     ...clientData,
                //     providers: [newProvider._id]// assign the _id from the person
                // });

                // newClient.save(function (err) {
                //     if (err) return handleError(err);
                //     // that's it!
                // });
                res.json(newProvider); 

            });


        } 
        catch (err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = new ProviderController();
