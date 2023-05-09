import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    createTask(task: createTaskDto) {
        const newTask = this.taskRepository.create(task)
        return this.taskRepository.save(newTask)
    }

    getTasks() {
       return this.taskRepository.find()
    }

    async getTask(id:number) {
        const taskFound = await this.taskRepository.findOne({
            where:{
                id
            }
        })
        if(!taskFound){
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }
        return taskFound
    }

    async deleteTask(id:number){
        const result = await this.taskRepository.delete({id})
        if(result.affected === 0){
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }
        return result
    }

    async updateTask(id:number, task: createTaskDto){
        const taskFound= await this.taskRepository.findOne({
            where:{
                id
            }
        })
        if(!taskFound){
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)
        }
        const updateTask = Object.assign(taskFound, task)
        return this.taskRepository.save(updateTask)
    }
}
