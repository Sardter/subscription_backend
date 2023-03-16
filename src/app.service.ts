import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class GeneratorService {
  constructor(private readonly repo: PrismaService) {}

  async generateMockData() {
    await this.repo.country.createMany({
      data: [
        { name: 'Türkiye' },
        { name: 'Amerika' },
        { name: 'Yeni Zellanda' },
        { name: 'Almanya' },
        { name: 'Italya' },
      ],
    });

    await this.repo.state.createMany({
      data: [
        { name: 'Ankara', countryId: 1 },
        { name: 'Istanbul', countryId: 1 },
        { name: 'New Jersey', countryId: 2 },
        { name: 'Christchurch', countryId: 3 },
        { name: 'San Francisco', countryId: 2 },
        { name: 'Münich', countryId: 4 },
        { name: 'San Marino', countryId: 5 },
      ],
    });

    await this.repo.user.createMany({
      data: [
        { username: 'Ahmet', email: 'mail1' },
        { username: 'Şimal', email: 'mail2' },
        { username: 'Jacob', email: 'mail3' },
        { username: 'Henriata', email: 'mail4' },
        { username: 'Jonas', email: 'mail5' },
        { username: 'Mario', email: 'mail6' },
      ],
    });

    await this.repo.address.createMany({
      data: [
        {
          countryId: 1,
          userId: 1,
          stateId: 1,
          selected: true,
          city: 'Çankaya',
          phone: '1234567',
        },
        {
          countryId: 1,
          userId: 2,
          stateId: 2,
          selected: false,
          city: 'Bostancı',
          phone: '1234567',
        },
        {
          countryId: 1,
          userId: 2,
          stateId: 2,
          selected: true,
          city: 'Fenerbahçe',
          phone: '1234567',
        },
        {
          countryId: 2,
          userId: 3,
          stateId: 3,
          selected: false,
          city: 'Queens',
          phone: '1234567',
        },
        {
          countryId: 2,
          userId: 3,
          stateId: 5,
          selected: true,
          city: 'Pale Alto',
          phone: '1234567',
        },
        {
          countryId: 3,
          userId: 4,
          stateId: 4,
          selected: true,
          city: 'Sydenham',
          phone: '1234567',
        },
      ],
    });

    await this.repo.subscription.createMany({
      data: [{ date: new Date() }, { date: new Date() }],
    });

    await this.repo.subscription.update({
      where: {
        id: 1,
      },
      data: {
        users: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 3,
            },
          ],
        },
      },
    });

    await this.repo.subscription.update({
      where: {
        id: 2,
      },
      data: {
        users: {
          connect: [
            {
              id: 4,
            },
            {
              id: 5,
            },
            {
              id: 6,
            },
          ],
        },
      },
    });
  }
}
