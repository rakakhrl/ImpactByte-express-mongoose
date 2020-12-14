const Racks = require("../models/racks");

class RacksController {
  static async getAllRacks(req, res, next) {
    try {
      const racksData = await Racks.find();

      res.status(200).json({
        message: "Get list of racks.",
        length: racksData.length,
        data: racksData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRackById(req, res, next) {
    try {
      const id = req.params.id;
      const rackData = await Racks.findById(id);

      if (rackData) {
        res.status(200).json({
          message: "Get list of books.",
          length: rackData.length,
          data: rackData,
        });
      } else {
        res.status(404).json({
          message: `Cannot find rack with id of ${id}`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addNewRack(req, res, next) {
    try {
      const newRack = new Racks(req.body);

      const result = await newRack.save();

      res.status(201).json({
        message: "Rack created.",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateRack(req, res, next) {
    try {
      const id = req.params.id;
      const update = req.body;
      const rackData = await Racks.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      res.status(200).json({
        message: `Rack with id ${id} updated successfully.`,
        data: rackData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteRack(req, res, next) {
    try {
      const id = req.params.id;
      const rackData = await Racks.findByIdAndDelete({ _id: id });

      res.status(200).json({
        message: `Rack with id ${id} deleted successfully.`,
        data: rackData,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RacksController;
