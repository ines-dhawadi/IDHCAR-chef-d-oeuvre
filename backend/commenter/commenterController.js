const TESTIMONY = require("./commenterModel");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || '5000';

module.exports = {
  //add_Testimony

  addTestimony: async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const comment = req.body.comment;

    try {
      Testimonys = await new TESTIMONY({
        userId,
        comment,
      });
      await Testimonys.save();
      res.json(Testimonys);
    } catch (error) {
      console.error(error.message);
    }
  },

  //getAllTestimonys

  getAllTestimonys: async (req, res) => {
    try {
      const Testimonys = await TESTIMONY.find();
      res.json(Testimonys);
    } catch (error) {
      console.error(error.message);
    }
  },

  //deleteTestimony

  deleteTestimony: async (req, res) => {
    try {
      const Testimonys = await TESTIMONY.findByIdAndDelete(req.params.id);
      res.json(Testimonys);
    } catch (error) {
      console.error(error.message);
    }
  },

  //updateTestimonys

  updateTestimonys: async (req, res) => {
    try {
      const Testimonys = await TESTIMONY.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(Testimonys);
    } catch (error) {
      console.error(error.message);
    }
  },

  //getTestimony
  
  getTestimony: async (req, res) => {
    try {
      const Testimony = await TESTIMONY.findById(req.params.id).then(
        (TESTIMONY) => {
          axios.get(`http://localhost:5000/idhcar/client/getClient/` + TESTIMONY.userId)
            .then((response) => {
              var testimonyObject = {
                nom: response.data.nom,
                prenom: response.data.prenom,
                image: response.data.image,
                comment: TESTIMONY.comment
              };
              res.json(testimonyObject);
            });
        }
      );
    } catch(error) {
      console.error(error.message);
    }
  }
};