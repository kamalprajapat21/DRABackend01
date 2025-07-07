import Earning from "../../models/EarningHome.js";
// import Earning from "../models/Earning.js";

export const createEarning = async (req, res) => {
  try {
    const { serviceAmount, tds, convenienceFee } = req.body;

    if (serviceAmount == null || tds == null || convenienceFee == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = serviceAmount - tds - convenienceFee;

    const newEarning = new Earning({
      serviceAmount,
      tds,
      convenienceFee,
      total
    });

    await newEarning.save();

    res.status(201).json(newEarning);
  } catch (error) {
    console.error("Failed to create earning:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
