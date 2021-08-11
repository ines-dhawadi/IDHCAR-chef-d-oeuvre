const USER = require("./clientModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


module.exports = {
  //add_User

  addUser: async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const image = req.body.image
    const salt = await bcrypt.genSalt(10);
    const hashedPasswor = await bcrypt.hash(req.body.password, salt);
    const password = hashedPasswor;
    try {
      User = new USER({
        nom,
        prenom,
        telephone,
        email,
        image,
        password,
      });
      await User.save();
      res.json(User);
    } catch (error) {
      console.error(error.message);
    }
  },

  //getAllUsers

  getAllUsers: async (req, res) => {
    try {
      const User = await USER.find();
      res.json(User);
    } catch (error) {
      console.error(error.message);
    }
  },

  //deleteUser

  deleteUser: async (req, res) => {
    try {
      const User = await USER.findByIdAndDelete(req.params.id);
      res.json(User);
    } catch (error) {
      console.error(error.message);
    }
  },

  //updateUser

  updateUser: async (req, res) => {
    try {
      const User = await USER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(User);
    } catch (error) {
      console.error(error.message);
    }
  },

  //getUser
  
  getUser: async (req, res) => {
    try {
      const User = await USER.findById(req.params.id);
      res.json(User);
    } catch (error) {
      console.error(error.message);
    }
  },
};