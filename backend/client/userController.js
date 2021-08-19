
const UserModel =require('../client/userModel')
const ObjectID = require("mongoose").Types.ObjectId;

module.exports={

    //get all user
    getAllUsers: async (req, res) => {
        const users = await UserModel.find().select("-password");
        res.status(200).json(users);
      },
         //get 1 user
    userInfo: (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        UserModel.findById(req.params.id, (err, docs) => {
          if (!err) res.send(docs);
          else console.log("ID unknown : " + err);
        }).select("-password");
      },


      // update  User => bio

      updateUser : async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                bio: req.body.bio,
               
              },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              if (err) return res.status(500).send({ message: err });
            }
          );
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      },

      deleteUser: async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await UserModel.remove({ _id: req.params.id }).exec();
          res.status(200).json({ message: "Successfully deleted. " });
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      },

      follow: async (req, res) => {
        if (
          !ObjectID.isValid(req.params.id) ||
          !ObjectID.isValid(req.body.idToFollow)
        )
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          // add to the follower (1) list
          await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
              if (!err) res.status(201).json(docs);
              else return res.status(400).json(err);
            }
          );
          // add to following (2) list
          await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
              // if (!err) res.status(201).json(docs); => 2 res n-p-b-p
              if (err) return res.status(400).json(err);
            }
          );
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      },
      
      unfollow: async (req, res) => {
        if (
          !ObjectID.isValid(req.params.id) ||
          !ObjectID.isValid(req.body.idToUnfollow)
        )
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
              if (!err) res.status(201).json(docs);
              else return res.status(400).json(err);
            }
          );
          // remove to following list
          await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
              // if (!err) res.status(201).json(docs);
              if (err) return res.status(400).json(err);
            }
          );
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      }
      






}


