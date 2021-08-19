const PostModel =require('../commenter/postModel');
const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require('../client/userModel');
const { uploadErrors } = require("../utils/errorsUtils");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports={

    readPost: (req, res) => {
        PostModel.find((err, docs) => {
          if (!err) res.send(docs);
          else console.log("Error to get data : " + err);
        }).sort({createdAt: -1}); // .sort .... pour afficher le plus recent -> le plus ancien
      },

      createPost: async (req, res) => {

        let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../frantend/public/uploads/posts/${fileName}`
      )
    );
  }
      const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
      });
    
      try {
        const post = await newPost.save();
        return res.status(201).json(post);
      } catch (err) {
        return res.status(400).send(err);
      }
    },

    updatePost :(req, res) =>{
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
      const updatedRecord = {
        message: req.body.message,
      };
    
      PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Update error : " + err);
        }
      );
    },



    deletePost :(req, res) =>{
        if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

        PostModel.findByIdAndDelete(
            req.params.id,
            (err,docs)=>{
                if(!err){
                    return res.send(docs)
                }else{
                    console.log("Delete error : " + err)
                }
            }
        )
    },

    likePost : async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
              if (err) return res.status(400).send(err);
            }
          );
          await UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
              if (!err) res.send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
      },

      unlikePost : async (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          await PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
              if (err) return res.status(400).send(err);
            }
          );
          await UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
              if (!err) res.send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
      },

      // post comment
      commentPost: (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          return PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $push: {
                comments: {
                  commenterId: req.body.commenterId,
                  commenterPseudo: req.body.commenterPseudo,
                  text: req.body.text,
                  timestamp: new Date().getTime(),
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
      },


      // edit comment post
      editCommentPost: (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          return PostModel.findById(req.params.id, (err, docs) => {
            // theComment => comment a edit
            const theComment = docs.comments.find((comment) =>
              comment._id.equals(req.body.commentId)
            );
      
            if (!theComment) return res.status(404).send("Comment not found");
            theComment.text = req.body.text;
      
            return docs.save((err) => {
              if (!err) return res.status(200).send(docs);
              return res.status(500).send(err);
            });
          });
        } catch (err) {
          return res.status(400).send(err);
        }
      },


      // delete   Comment   Post

      deleteCommentPost: (req, res) => {
        if (!ObjectID.isValid(req.params.id))
          return res.status(400).send("ID unknown : " + req.params.id);
      
        try {
          return PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $pull: {
                comments: {
                  _id: req.body.commentId,
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) return res.send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (err) {
          return res.status(400).send(err);
        }
      },      





}