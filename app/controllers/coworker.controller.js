const User = require("../models/user.model.js");

//works
 const findAll = async (req, res) => {
	//Über die id role finden, dann Fallunterscheidung
	const role = await req.userRole
	console.log("/coworkers/all with findAll function says userrole is", role)
	const userId = req.userId
	console.log(userId)
	User.findById(req.userId).populate('coworkers').then(function( user,err){
		console.log("here is the found user:", user)
		if (role==="editor"){
			try {
				console.log(user)
				const coWorkers = user.coworkers
				return res.json(coWorkers).status(200)
				
			}
			catch(err){
			return res.json({message: err.message})
			}
		}
		if (role==="creator"){
			try {
				const coWorkers = user.coworkers.find({}, {name:1})
				return res.json(coWorkers).status(200)	 
			}
			catch(err){
				return res.json({message: err.message})
			}
		}
		if (role==="admin"){
			res.json({message: "An admin has no coworkers. Go to users."})
		}
console.log(err)
return

}
)
 }

//works
 const getById = async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

//works
const addCoworker = async (req, res) => {
	if(req.userRole != "admin"){
	    try {
	        const user = await User.findById(req.userId);
	        const newco = req.body.id;	
			user.coworkers.push(newco)
			user.save()
	        res.status(200).json(user);
	    } catch (error) {
	        res.status(400).json({message: error.message});
	    }
	}
	else{
		res.status(402).json({message: "Admin kann keine Coworker adden."});
	}
}
//works
const deleteOne = async (req, res) => {
	//Über die id role finden, dann Fallunterscheidung
	const role = req.userRole
	console.log(req.userId)
	const user = await User.findById(req.userId);
	console.log(user)
		if (role!="admin"){
			try{
				console.log(user)
				console.log("id to pull", req.params.id)
				user.coworkers.pull(req.params.id)
				user.save()	
				res.status("200").json({message:"success"})		
			}
			catch{
				res.status("400").json({message:"something went wrong"})
			}
		}
		else{
			    try {
			        const deleteduser =  User.deleteOne({_id:req.params.id});
			        res.status(200).json(deleteduser);
			    } catch (error) {
			        res.status(400).json({message: error.message});
				}
		   }
	}


//komplett andere Funktion als Admin: hier wird der User wirklich gelöscht, nicht nur die  Referenz.
	


module.exports = {findAll, addCoworker, deleteOne, getById}