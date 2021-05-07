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

    updateProvider = async (req, res, next) => {
        try {
            const provider = await providerSchema.findOne({
                _id: req.params.id,
               
            });
            if (!provider) throw errorConfig.taskNotFound;
            
            const {name} = req.body;
            name && ( provider.name = name);
           

            // const providers = await providerSchema.find({name: {$in: req.body.providers}}).exec();
            console.log('providers', provider)

            // let prov = providers.map(p=>p._id) 
            //   prov && ( client.providers = [...prov]);
            await provider.save();
            

            const editedClient = await clientSchema.find({}).populate({ path: 'providers' }).exec();
            // if (!client) throw errorConfig.taskNotFound; 
            // console.log(editedClient)
            res.json(provider);
          
        } catch (err) {
            next(err)
        }
    }

    deleteProvider = async (req, res, next) => {
        try {
            const provider = await providerSchema.findOneAndDelete({
                _id: req.params.id,
               
            });
            
            if (!provider) throw errorConfig.taskNotFound;
            res.json({success: true});
        } catch (err) {
            next(err)
        }
    }
    

}

module.exports = new ProviderController();
