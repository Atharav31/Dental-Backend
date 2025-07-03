const mongoose = require('mongoose');
const fs = require('fs');
const Prescription = require('../models/Prescription');

async function exportPrescriptions() {
  try {
    await mongoose.connect('mongodb+srv://dentalBackend:6f6dUd2mDUmNXxIX@cluster0.c09n2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const prescriptions = await Prescription.find().lean().exec();
    fs.writeFileSync('prescriptions.json', JSON.stringify(prescriptions, null, 2));
    console.log('Exported prescriptions!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error exporting prescriptions:', err);
    process.exit(1);
  }
}

exportPrescriptions();
