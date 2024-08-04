const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://fsw-barber.s3.amazonaws.com/barbers/01.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/02.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/03.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/04.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/05.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/06.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/07.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/08.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/09.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/10.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/11.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/12.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/13.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/14.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/15.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/16.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/17.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/18.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/19.png",
      "https://fsw-barber.s3.amazonaws.com/barbers/20.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ];

    // Endereços fictícios para as barbearias
    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl: "https://fsw-barber.s3.amazonaws.com/servicos/corte.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl: "https://fsw-barber.s3.amazonaws.com/servicos/barba.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl: "https://fsw-barber.s3.amazonaws.com/servicos/pezinho.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl:
          "https://fsw-barber.s3.amazonaws.com/servicos/sombrancelha.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl: "https://fsw-barber.s3.amazonaws.com/servicos/massagem.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl:
          "https://fsw-barber.s3.amazonaws.com/servicos/sombrancelha.png",
      },
    ];

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
          phones: ["(11) 99999-9999", "(11) 99999-9999"],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.",
        },
      });

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
        });
      }

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
