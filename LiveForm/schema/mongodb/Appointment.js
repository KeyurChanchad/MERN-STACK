import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({}, {strict: false});
const appointments = new mongoose.model("appointments", appointmentSchema);
const allAppointments = await appointments.find();

export default allAppointments;