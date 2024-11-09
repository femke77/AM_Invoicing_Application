import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 0; i < 10; i++) {
    // not hashing here or we won't be able to log in with these users
    // to test hashing, create a user through the API
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password({ length: 8 }),
        },
      }),
    );
  }

  // matches the swagger example for ease of testing
  // FIXME comment this out if you want to bring the compose up again after the initial seed.

  await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: 'password123',
      name: 'user',
    },
  });

  console.log(users);

  // Create random invoices
  for (const user of users) {
    for (let j = 0; j < 4; j++) {
      // Each user gets 4 invoices
      await prisma.invoice.create({
        data: {
          vendor_name: faker.company.name(),
          amount: faker.number.int({ min: 100, max: 1000 }),
          due_date: faker.date.future().toISOString(),
          description: faker.commerce.productDescription(),
          user: {
            connect: { id: user.id },
          },
          paid: faker.datatype.boolean(),
        },
      });
    }
  }

  console.log('Created invoices for users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
