// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      'https://fsw-barber.s3.amazonaws.com/barbers/01.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/02.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/03.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/04.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/05.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/06.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/07.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/08.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/09.png',
      'https://fsw-barber.s3.amazonaws.com/barbers/10.png',
    ]
    // Nomes criativos para as barbearias
    const creativeNames = [
      'Barbearia Vintage',
      'Corte & Estilo',
      'Barba & Navalha',
      'The Dapper Den',
      'Cabelo & Cia.',
      'Machado & Tesoura',
      'Barbearia Elegance',
      'Aparência Impecável',
      'Estilo Urbano',
      'Estilo Clássico',
    ]

    // Endereços fictícios para as barbearias
    const addresses = [
      'Rua da Barbearia, 123',
      'Avenida dos Cortes, 456',
      'Praça da Barba, 789',
      'Travessa da Navalha, 101',
      'Alameda dos Estilos, 202',
      'Estrada do Machado, 303',
      'Avenida Elegante, 404',
      'Praça da Aparência, 505',
      'Rua Urbana, 606',
      'Avenida Clássica, 707',
    ]

    const services = [
      {
        name: 'Corte de Cabelo',
        description: 'Estilo personalizado com as últimas tendências.',
        price: 60.0,
        imageUrl: 'https://fsw-barber.s3.amazonaws.com/servicos/corte.png',
      },
      {
        name: 'Barba',
        description: 'Modelagem completa para destacar sua masculinidade.',
        price: 40.0,
        imageUrl: 'https://fsw-barber.s3.amazonaws.com/servicos/barba.png',
      },
      {
        name: 'Pézinho',
        description: 'Acabamento perfeito para um visual renovado.',
        price: 35.0,
        imageUrl: 'https://fsw-barber.s3.amazonaws.com/servicos/pezinho.png',
      },
      {
        name: 'Sobrancelha',
        description: 'Expressão acentuada com modelagem precisa.',
        price: 20.0,
        imageUrl:
          'https://fsw-barber.s3.amazonaws.com/servicos/sobrancelha.png',
      },
      {
        name: 'Massagem',
        description: 'Relaxe com uma massagem revigorante.',
        price: 50.0,

        imageUrl: 'https://fsw-barber.s3.amazonaws.com/servicos/massagem.png',
      },
      {
        name: 'Hidratação',
        description: 'Hidratação profunda para cabelo e barba.',
        price: 25.0,
        imageUrl: 'https://fsw-barber.s3.amazonaws.com/servicos/hidratacao.png',
      },
    ]

    const phones = [
      ['(11) 98967-4945', '(11) 98967-4945'],
      ['(11) 98967-4946', '(11) 98967-4946'],
      ['(11) 98967-4947', '(11) 98967-4947'],
      ['(11) 98967-4948', '(11) 98967-4948'],
      ['(11) 98967-4949', '(11) 98967-4949'],
      ['(11) 98967-4950', '(11) 98967-4950'],
      ['(11) 98967-4951', '(11) 98967-4951'],
      ['(11) 98967-4952', '(11) 98967-4952'],
      ['(11) 98967-4953', '(11) 98967-4953'],
      ['(11) 98967-4954', '(11) 98967-4954'],
    ]

    const descriptions = [
      'Onde o estilo clássico encontra o moderno. Corte, barba e cuidado masculino com excelência em cada detalhe.',
      'A arte de barbear levada a sério. Estilo autêntico e atendimento personalizado para homens que sabem o valor de uma boa aparência.',
      'Cortes precisos, barbas impecáveis. Um espaço dedicado ao cuidado masculino, onde você é tratado como rei.',
      'Resgatando a tradição com um toque contemporâneo. Corte clássico e tratamento premium em um só lugar.',
      'Estilo, conforto e cuidado em um só lugar. Experiência relaxante com um toque de luxo.',
      'Uma barbearia que entende o homem moderno. Serviços sob medida para quem valoriza elegância e bem-estar.',
      'Autenticidade e estilo em cada detalhe. Ambiente acolhedor e profissionais experientes.',
      'Onde cada detalhe importa. Do corte tradicional ao estilo moderno, o melhor em cuidados pessoais.',
      'Uma barbearia para quem vive a cidade. Ambiente descontraído e serviço de excelência.',
      'Inspirada nas barbearias de antigamente, mas com um toque de modernidade. Atendimento com atenção e respeito.',
    ]

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = []
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]
      const phone = phones[i]
      const description = descriptions[i]

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl,
          phones: phone,
          description,
        },
      })

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        })
      }

      barbershops.push(barbershop)
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro ao criar as barbearias:', error)
  }
}

seedDatabase()
