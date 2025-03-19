// Usage: npx ts-node prisma/seed.ts if npx prisma db seed is not working
// Description: This script seeds the database with some initial data.
// It creates three tasks with different statuses: TODO and DONE for initial usage.
// The tasks are used to demonstrate the CRUD operations in the API.
// The tasks are created with a unique ID (UUID), description, status, and creation date.
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.tasks.createMany({
    data: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Create a new project',
        description: 'Implement user authentication',
        status: 'TODO',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Design the landing page',
        description: 'Design the landing page',
        status: 'TODO',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        title: 'Set up CI/CD pipeline',
        description: 'Set up CI/CD pipeline',
        status: 'DONE',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        title: 'Create a new feature',
        description: 'Create a new feature',
        status: 'TODO',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        title: 'Fix the bug',
        description: 'Fix the bug',
        status: 'DONE',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        title: 'Update the documentation',
        description: 'Update the documentation',
        status: 'TODO',
        createdAt: new Date
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        title: 'Optimize the performance',
        description: 'Optimize the performance',
        status: 'DONE',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        title: 'Refactor the code',
        description: 'Refactor the code',
        status: 'TODO',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        title: 'Add new tests',
        description: 'Add new tests',
        status: 'DONE',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        title: 'Deploy the application',
        description: 'Deploy the application',
        status: 'TODO',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        title: 'Monitor the application',
        description: 'Monitor the application',
        status: 'DONE',
        createdAt: new Date(),
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        title: 'Scale the application',
        description: 'Scale the application',
        status: 'TODO',
        createdAt: new Date(),
      }
    ],
  });

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
