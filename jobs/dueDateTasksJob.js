import cron from "node-cron";
import { TASK_STATUS } from "../config/constants";
import taskServices from "../services/taskServices";

cron.schedule('* * * * *', async () => {
    try {
        const task_status_1 = await taskServices.getAll({ status: TASK_STATUS['Assigned'] });
        task_status_1.map( async (item, key)=>{
            //console.log("fecha task---->",(item.due_date));
            //console.log("fecha now----->",((new Date())));
            if(item.due_date < (new Date()) ){
                await taskServices.updateStatus(item._id, TASK_STATUS['Due Date']);
                console.log(`task with id ${item._id} update to due date `);
            }
        });
        console.log("task update");
    } catch (error) {
        console.log("error--->",error);
    }
    

    const task_status_2 = await taskServices.getAll({ status: TASK_STATUS['Progress'] });
    task_status_2.map( async (item, key)=>{
        //console.log("fecha task---->",(item.due_date));
        //console.log("fecha now----->",((new Date())));
        if(item.due_date < (new Date()) ){
            await taskServices.updateStatus(item._id,TASK_STATUS['Due Date']);
            console.log(`task with id ${item._id} update to due date `);
        }
    })
    console.log('cron executing...');
});

export default cron;