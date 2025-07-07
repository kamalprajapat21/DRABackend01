import createPatientModel from "../../models/Pharamcy/Patient.js";

export const getAllPatients = async (req, res) => {
  try {
    const { conn2 } = req.app.locals; // conn2 = PWA
    const Patient = createPatientModel(conn2);

    const patients = await Patient.find();
    console.log(patients);
    res.status(200).json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};


export const getPatientById = async (req, res) => {
  try {
    const { conn2 } = req.app.locals;
    const Patient = createPatientModel(conn2);

    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).json({ error: "Failed to fetch patient details" });
  }
};
