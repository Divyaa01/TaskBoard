import Task from "../model/taskModel.js";



//create a task

export async function createTask(req, res) {
    try{
    const { title, description, completed, createAt } = req.body;
    const task = new Task({ title, description,owner : req.user.id, completed, createAt });

    const saved= await task.save();

    return res.status(201).json({success:true, task:saved , message: "Task created successfully" });
}
    catch(error){
        console.log(error);
        return res.status(400).json({success:false, message: "Task couldnt be created" });
    }

   
}

//get all tasks - loggedin user

export async function getTasks(req,res) {

    try{
        const tasks = await Task.find({owner : req.user.id}).sort({createdAt: -1});
        return res.status(200).json({success:true, tasks});
    }
    catch(error){
        return res.status(500).json({success:false, message: "Issue getting tasks "});
    }
}


//get task by id
export async function getTaskById(req,res) {
    const taskid = req.params.id;

    try{
        const task = await Task.findOne({_id: taskid , owner : req.user.id});

        if(!task){
            return res.status(404).json({success:false, message: "Task not found" });
        }
        return res.status(200).json({success:true, task});

    }
    catch(error){
        return res.status(400).json({success:false, message: "Issue getting task "});
    }

}


//update task
export async function updateTask(req,res) {

    try{
         const data = {...req.body};
         
         if(data.completed !== undefined){
            data.completed = data.completed === 'true' || data.completed === true;
         }
         
         const updated = await Task.findOneAndUpdate({_id: req.params.id, owner : req.user.id}, data, {new: true , runValidators: true});

         if(!updated){
            return res.status(404).json({success:false, message: "Task not found" });
         }

            return res.status(200).json({success:true, task: updated, message: "Task updated successfully" });

    }

    catch(error){
        console.log(error);
        return res.status(400).json({success:false, message: "Issue updating task "});
    }
}
    

//delete a task

export async function deleteTask(req,res) {
    try{

        const deleted = await Task.findOneAndDelete({_id: req.params.id, owner : req.user.id});

        if(!deleted){
            return res.status(404).json({success:false, message: "Task not found" });
        }

        return res.status(200).json({success:true, message: "Task deleted successfully" });
    }
    catch(error){
            console.log(error);
            return res.status(400).json({success:false, message: "Issue deleting task "});
    }
}
