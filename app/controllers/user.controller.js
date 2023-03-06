const User =require( "../models/user.model.js");

const getUsers = async (req, res) => {
	// const role = req.userRole
	// if (role!="admin"){
	// 	return	res.json({message: "You need the admin role."})
	// }
		try {
			User.find({}, function(err, users){
				return res.json(users).status(200)
			})
		} catch (error) {
	        res.status(500).json({message: error.message});
	    }

}

 const getUserById = async (req, res) => {
	const role = req.userRole
	if (role!="admin"){
		return	res.json({message: "You need the admin role."})
	}
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {

	const role = req.userRole
	if (role!="admin"){
		return	res.json({message: "You need the admin role to delete users."})
	}

	if(role==="admin"){
		    try {
		        const deleteduser = await User.deleteOne({_id:req.params.id});
		        res.status(200).json(deleteduser);
		    } catch (error) {
		        res.status(400).json({message: error.message});
		}
	}
}

module.exports={getUsers, getUserById, deleteUser}