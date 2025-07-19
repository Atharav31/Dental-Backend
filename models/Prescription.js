const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
	appointmentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Appointment",
		required: true,
	},

	treatments: [
		{
			treatment: {
				type: String,
				enum: [
					"general_checkup",
					"root_canal",
					"crown",
					"cosmetic_procedure",
					"filling",
					"dental_implant",
					"teeth_replacement",
					"extraction",
					"mouth_guard",
					"child_procedure",
					"gum_care",
					"orthodontic",
					"x_ray",
				],
			},
			toothNumber: { type: String },
		},
	],
	medicines: [
		{
			type: { type: String },
			name: { type: String },
			dosage: { type: String },
			frequency: { type: String },
			duration: { type: String },
		},
	],
	instructions: {
		type: [String],
	},
	proceduresPerformed: [
		{
			procedureName: { type: String },
			notes: { type: String },
		},
	],
	allergies: {
		type: [String],
		default: [],
	},
	followUpRequired: {
		type: Boolean,
		default: false,
	},
	nextVisit: {
		type: Date,
	},
	additionalNotes: {
		type: String,
	},
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
