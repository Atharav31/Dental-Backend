const Appointment = require("../models/appointment");
const moment = require("moment");

exports.dashboardData = async (req, res) => {
  try {
    const today = moment().format("DD/MM/YYYY");
    const startOfWeek = moment().startOf("isoWeek").format("DD/MM/YYYY");
    const startOfMonth = moment().startOf("month").format("DD/MM/YYYY");

    const allAppointments = await Appointment.find();

    const totalAppointments = allAppointments.length;
    const completedAppointments = allAppointments.filter(
      (appt) => appt.status === "completed"
    ).length;
    const pendingAppointments = allAppointments.filter(
      (appt) => appt.status === "pending"
    ).length;

    const dailyPatients = allAppointments.filter(
      (appt) => appt.date === today
    ).length;

    const weeklyPatients = allAppointments.filter(
      (appt) =>
        moment(appt.date, "DD/MM/YYYY").isSameOrAfter(startOfWeek) &&
        moment(appt.date, "DD/MM/YYYY").isSameOrBefore(moment())
    ).length;

    const monthlyPatients = allAppointments.filter(
      (appt) =>
        moment(appt.date, "DD/MM/YYYY").isSameOrAfter(startOfMonth) &&
        moment(appt.date, "DD/MM/YYYY").isSameOrBefore(moment())
    ).length;

    res.status(200).json({
      totalAppointments, // total apo
      completedAppointments,
      pendingAppointments,
      dailyPatients,
      weeklyPatients,
      monthlyPatients,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Erro");
  }
};
