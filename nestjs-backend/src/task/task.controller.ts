import { Controller, Body , Post , Get, Delete,Put, Param, ParseIntPipe} from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService){}
    
    @Get()
    getTasks(){
        return this.taskService.getTasks();
        
    }

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id:number){
        return this.taskService.getTask(id)
    }

    @Post()
    createTask(@Body() newTask : createTaskDto){
        return this.taskService.createTask(newTask)
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id:number){
        return this.taskService.deleteTask(id)
    }

    @Put(':id')
    updateTask(@Param('id', ParseIntPipe) id:number , @Body() task: createTaskDto){
        return this.taskService.updateTask(id,task)
    }

}
