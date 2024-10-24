import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const dataData: Prisma.DataCreateInput[] = [
  {
    dNama: "Kependudukan",
  },
  {
    dNama: "Kemiskinan",
  },
  {
    dNama: "Tenaga Kerja",
  },
  {
    dNama: "Pendidikan",
  },
  {
    dNama: "Ekonomi",
  },
  {
    dNama: "Geografi",
  },
  {
    dNama: "Pertanian/Peternakan/PerikananPerkebunan/Kehutanan",
  },
  {
    dNama: "Lainnya",
  }
]

const dataSarana: Prisma.SaranaCreateInput[] = [
  {
    sNama: "Kunjungan Langsung",
  },
  {
    sNama: "Whatsapp",
  },
  {
    sNama: "Email",
  },
  {
    sNama: "DM instagram",
  },
  
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of dataData) {
      const data = await prisma.data.create({
        data: u,
      })
      console.log(`Created data with id: ${data.dataId}`)
    }for (const u of dataSarana) {
      const sarana = await prisma.sarana.create({
        data: u,
      })
      console.log(`Created sarana with id: ${sarana.saranaId}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
