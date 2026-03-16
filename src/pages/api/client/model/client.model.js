import mongoose from "mongoose";

const Client = new mongoose.Schema({
    companyId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        require: true
    }),
    userId: ({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }),
    name: ({
        type: String,
        require: true,
    }),
    project_name: ({
        type: String,
        require: true,
    }),
    platform: ({
        type: String,
        require: true,
    }),
    communication: ({
        type: String
    }),
    status: ({
        type: String,
        require: true,
        enum: ['Open', 'Sale', 'Close']
    }),
    payment_terms: ({
        type: String,
        require: true
    }),
    account: ({
        type: String,
        require: true
    }),
    rate: ({
        type: String,
        require: true
    }),
}, {
    timestamps: true
})

const clientModel = mongoose.models.Client || mongoose.model("Client", Client);

export default clientModel;