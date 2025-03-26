import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  const categories = [
    { id: 'sports', name: 'Sports', color: 'lightblue' },
    { id: 'museum', name: 'Museum', color: 'yellow' },
    { id: 'games', name: 'Games', color: 'orange' },
    { id: 'nature', name: 'Nature', color: 'lightgreen' },
    { id: 'trips', name: 'Trips', color: 'blue' }
  ].map(async (category) =>
    prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name,
        color: category.color
      }
    })
  )
  console.log(categories)

  const activities = [
    {
      name: 'Verkehrshaus der Schweiz',
      slug: 'verkehrshaus-der-schweiz',
      url: 'https://www.verkehrshaus.ch',
      category: 'museum',
      location: { city: 'Luzern', state: 'LU', country: 'CH' }
    },
    {
      name: 'SwissMiniatur',
      slug: 'swissminiatur',
      url: 'https://www.swissminiatur.ch',
      category: 'trips',
      location: { city: 'Melide', state: 'TI', country: 'CH' }
    },
    {
      name: 'Ballenberg',
      slug: 'ballenberg',
      description: 'ballenberg',
      url: 'https://www.ballenberg.ch',
      category: 'museum',
      location: { city: 'Brienz', state: 'BE', country: 'CH' }
    },
    {
      name: 'Uno',
      slug: 'uno',
      description: 'verschiedene Varianten',
      category: 'games'
    }
  ].map(async (activity) => {
    return prisma.activity
      .upsert({
        where: { slug: activity.slug },
        update: {},
        create: {
          name: activity.name,
          slug: activity.slug,
          url: activity.url,
          category: {
            connect: {
              id: activity.category
            }
          },
          location: activity.location
            ? {
                connectOrCreate: {
                  where: {
                    city_state_country: {
                      city: activity.location.city,
                      state: activity.location.state,
                      country: activity.location.country
                    }
                  },
                  create: {
                    city: activity.location.city,
                    state: activity.location.state,
                    country: activity.location.country
                  }
                }
              }
            : undefined
        }
      })
      .catch((reason) => {
        console.error(reason + ' ' + activity.name)
      })
  })
  console.log(activities)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
