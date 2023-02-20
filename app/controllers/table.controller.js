const {Soll, Haben} = require("../models/table.model.js");
const {getTaskById} = require("./task.controller.js");
const multer = require('multer')
const csvtojson = require('csvtojson')
//ready

//Anmerkung: Da der Table im Task- Dokument gespeichert ist,
//ist es ausreichend, nur Veränderungen zu speichern (update)
//wenn nicht mehr gebraucht, kann man den Task löschen oder den table leer speichern.

const getTableByTaskId = async (req, res) => {
    try {
        const task = getTaskById(req, res)
        const table = task.table
        res.json(table);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateTable = async (req, res) => {
    try {
        var excelStorage = multer.diskStorage({  
            destination:(req,file,cb)=>{  
                 cb(null,'./public/excelUploads');      // file added to the public folder of the root directory
            },  
            filename:(req,file,cb)=>{  
                 cb(null,file.originalname);  
            }  
        });  
        var excelUploads = multer({storage:excelStorage}); 
        
        // upload excel file and import in mongodb
       
                    importFile('./public' + '/excelUploads/' + req.file.filename);
                    function importFile(filePath){
                      //  Read Excel File to Json Data
                            const task = getTaskById(req, res)
                            const table = task.table
                      
                            csvtojson().fromFile(filePath).then(source => {
                            // Fetching the all data from each row
                        
                                for (var i = 0; i < source.length; i++) {
                                    const SollValue = source[i]["Soll"]
                                    const HabenValue = source[i]["Haben"]
                                    console.log(SollValue)
                                    console.log(HabenValue)

                                    const SollCell = new Soll({order: i, value: SollValue})
                                    const HabenCell = new Haben({order: i, value: HabenValue})

                                    table.cells.push(SollCell, HabenCell)
                                }
                            
                                //inserting into the task
                                task.save()
                                res.status(200).json(task);    
                            }) 
                           
                    }         
        
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
    
}
module.exports = { updateTable, getTableByTaskId }