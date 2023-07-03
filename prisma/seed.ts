import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  const users = [
    await prisma.user.create({
      data: {
        email: 'omiputrakarunia@gmail.com',
        username: 'Ommi',
        fullName: 'Ommi Putera',
        role: 'OWNER',
        passwordHash:
          '$2a$10$Y632TQG4s/MdTmIBjHl3..YlKO5CtiFnOmRHP6McJyyh9DPPoz/9e',
        projects: {
          create: [
            {
              name: 'Naufal Ghifari',
              description: 'Web Development / Personal Website',
              type: 'Digital Product',
              heroId: 'naufalHero',
              liveLink: 'http://www.naufalghfr.com',
              content: 'none',
            },
          ],
        },
      },
    }),
    await prisma.user.create({
      data: {
        email: 'naufal@gmail.com',
        username: 'Naufal',
        fullName: 'Naufal Ghifari',
        role: 'CLIENT',
        passwordHash:
          '$2a$10$MXqGNKtKwsjNJsSCSDLoHuI36q.NaK1TKOKm7HdBWB./CfUGlcBOe',
      },
    }),
  ]
  return Promise.all(users)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
