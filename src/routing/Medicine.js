const medicines = require('../models/Medicine');
const router = require('express').Router();
const upload = require('../helper/Upload'); 
const path = require('path');
let xlsxFile = require('read-excel-file/node');

router.post('/import/medicines', upload.single('medicines'), async(req, res)=>{
    try {
        let reqPath = path.join(__dirname, '../../uploads/');
        let medicineList = [], obj;
        let medicinesData = await xlsxFile(reqPath + req.file.filename);
        if (medicinesData.length == 0) {
            return res.status(400).send({ Error: "Please insert data into sheet"});
        }else{
            medicinesData.forEach(element => {
                medicineList.push(new medicines({
                    c_name : element[0],
                    c_batch_no : element[1],
                    d_expiry_date: element[2],
                    n_balance_qty: element[3],
                    c_packaging: element[4],
                    c_unique_code: element[5],
                    c_schemes	: element[6],
                    n_mrp	: element[7],
                    c_manufacturer	: element[8],
                    hsn_code: element[9],
                }));
            });
            await medicines.insertMany(medicineList);
            return res.send({medicineList, message: "Data added successfullly."});
        }
    } catch (error) {
        return res.status(400).send({error});
    }
})

router.get('/medicines', async(req,res)=>{
    try {
        let medicineList = [];
        medicineList = await medicines.find({});
        if (medicineList.length == 0) {
            return res.status(200).send("No records found.");
        }else{
            return res.status(200).send({medicineList});
        }
    } catch (error) {
        return res.status(400).send({error});
    }
})

router.get('/medicines/searchByNameOrBatchNumber', async(req,res)=>{
    try {
        let medicineData;
        if (!Boolean(req.query.searchByNameOrBatchNumber)) {
            return res.status(400).send({messgae:"Please enter name or batch number"});
        }
        medicineData = await medicines.find({$or: [{"c_name" : req.query.searchByNameOrBatchNumber}, {"c_batch_no" : req.query.searchByNameOrBatchNumber}]});

        if (medicineData.length == 0) {
            return res.status(200).send({message: "No records found."});
        }
        return res.status(200).send(medicineData);
    } catch (error) {
        return res.status(400).send({error});
    }
})

router.patch('/update/medicine', async(req,res)=>{
    try {
        if (!Boolean(req.query.id)) {
            return res.status(400).send({message:"Please enter id"});
        }
        let updatedData = await  medicines.findByIdAndUpdate(req.query.id, req.body, {new: true});
        let medicine = await medicines.findById(req.query.id);
        if (!medicine) {
            return res.status(200).send({message: "No record found"});
        }
        return res.status(200).send({updatedData, message: "Data updated successfully"});
    } catch (error) {
        return res.status(400).send({error});
    }
})

router.delete('/delete/medicine', async(req,res)=>{
    try {
        if (!Boolean(req.query.id)) {
            return res.status(400).send({message:"Please enter id"});
        }
        let medicine = await medicines.findById(req.query.id);
        if (!medicine) {
            return res.status(200).send({message: "No record found"});
        }
        medicine = await medicines.findByIdAndDelete(req.query.id);
        return res.send({data:medicine, message: "Data deleted successfully"});
    } catch (error) {
        return res.status(400).send({error});
    }
})

module.exports = router;