import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { TasksStatus } from 'src/application/enums/tasks-status';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  public async createTask(createTaskDto: CreateTaskDto): Promise<GetTaskDto> {
    try {
      const task = {
        ...createTaskDto,
        priority: createTaskDto.priority ? createTaskDto.priority : 1,
        status: TasksStatus.UNDONE,
      };
      return await this.taskRepository.save(task);
    } catch (e) {
      throw e;
    }
  }

  public async findAllTasks(
    queryFilter?: QueryFilterDto,
  ): Promise<GetTaskDto[]> {
    try {
      let queryBuilder = this.taskRepository.createQueryBuilder('task');

      if (queryFilter?.name) {
        const name = `%${queryFilter.name}%`;
        queryBuilder = queryBuilder.where(
          'LOWER(task.name) LIKE LOWER(:name)',
          { name },
        );
      }

      if (queryFilter?.status) {
        queryBuilder = queryBuilder.andWhere('task.status = :status', {
          status: queryFilter.status,
        });
      }

      if (queryFilter?.priority) {
        queryBuilder = queryBuilder.orderBy(
          'priority',
          queryFilter.priority.toUpperCase() as 'ASC' | 'DESC',
        );
      }

      const tasks = await queryBuilder.getMany();
      return tasks;
    } catch (e) {
      throw e;
    }
  }

  public async findOneTask(id: string): Promise<GetTaskDto> {
    try {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .where('task.id = :id', { id })
        .getOne();
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (e) {
      throw e;
    }
  }

  public async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    try {
      await this.taskRepository.update(id, updateTaskDto);
      return await this.findOneTask(id);
    } catch (e) {
      throw e;
    }
  }

  public async removeTask(id: string): Promise<GetTaskDto> {
    try {
      const task = await this.findOneTask(id);
      await this.taskRepository.delete(id);
      return task;
    } catch (e) {
      throw e;
    }
  }
}
