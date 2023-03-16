import { Injectable } from '@nestjs/common';
import { State } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { StateCreateDataProcessor, StateCreateInputData } from '../interfaces/state.dto';
import { StateFilter } from '../interfaces/state.filter';

@Injectable()
export class StatesService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number): Promise<State | null> {
    return await this.repo.state.findFirst({
      where: {
        id: id,
      },
      include: {
        country: true,
        addresses: true
      }
    });
  }

  filter(filter: StateFilter): Promise<State[]> {
    return this.repo.state.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.state.delete({
      where: {
        id: id,
      },
    });
  }

  create(state: StateCreateInputData) {
    const processor = new StateCreateDataProcessor();
    return this.repo.state.create({
      data: processor.process(state),
    });
  }

  update(id: number, state: StateCreateInputData) {
    const processor = new StateCreateDataProcessor();
    return this.repo.state.update({
      where: {
        id: id,
      },
      data: processor.process(state),
    });
  }
}
