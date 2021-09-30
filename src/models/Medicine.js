const mongoose= require('mongoose')

// const Constant = require('../helper/Constant');

const medicineSchema = mongoose.Schema({
    c_name:{ 
        type: String,
        required: true,
    },
    c_batch_no:{ 
        type: String,
        trim: true,
    },
    d_expiry_date:{
        type: String,
    },
    n_balance_qty:{ 
        type: String,
    },
    c_packaging:{ 
        type: String,
    },
    c_unique_code:{ 
        type: String,
    },
    c_schemes:{ 
        type: String,
    },
    n_mrp:{ 
        type: String,
    },
    c_manufacturer:{
        type: String,
    },
    hsn_code:{
        type: String,
    }
})


let medicine = mongoose.model('medicine', medicineSchema)
module.exports= medicine;