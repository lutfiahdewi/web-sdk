import { createYoga } from "graphql-yoga"
import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import { DateTimeResolver } from "graphql-scalars"
import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';

import type PrismaTypes from "@pothos/plugin-prisma/generated"
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../lib/prisma"

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

builder.queryType({})

builder.mutationType({})

// Tipe-tipe objek
builder.prismaObject("Tamu", {
  fields: t => ({
    tamuId: t.exposeID("tamuId"),
    tNama: t.exposeString("tNama"),
    email: t.exposeString("email"),
    nomor: t.exposeString("nomer"),
    keperluan: t.exposeString("keperluan"),
    keperluanDetail: t.exposeString("keperluanDetail"),
    pekerjaan: t.exposeString("pekerjaan"),
    kategoriInstansi: t.exposeString("kategoriInstansi"),
    namaInstansi: t.exposeString("namaInstansi"),
    sarana: t.relation("sarana"),
    data: t.relation("data"),
    dataDetail: t.exposeString("dataDetail"),
    noAntrian: t.exposeString("noAntrian"),
    pegawai: t.relation("pegawai"),
    bukti: t.exposeString("bukti"),
    status: t.exposeBoolean("status"),
  }),
})

builder.prismaObject("Sarana", {
  fields: t => ({
    saranaId: t.exposeID("saranaId"),
    sNama: t.exposeString("sNama"),
    Tamu: t.relation("Tamu"),
  }),
})

builder.prismaObject("Data", {
  fields: t => ({
    dataId: t.exposeID("dataId"),
    dNama: t.exposeString("dNama"),
    Tamu: t.relation("Tamu"),
  }),
})

builder.prismaObject("Pegawai", {
  fields: t => ({
    pegawaiId: t.exposeID("pegawaiId"),
    pNama: t.exposeString("pNama"),
    NIP: t.exposeString("NIP"),
    Tamu: t.relation("Tamu"),
  }),
})

// Query
// 1. Tabel Sarana
builder.queryField("sarana", t =>
  t.prismaField({
    type: ["Sarana"],
    resolve: async (query, _parent, _args, _info) => prisma.sarana.findMany(),
  })
)
// 2. Tabel Data
builder.queryField("data", t =>
  t.prismaField({
    type: ["Data"],
    resolve: async (_parent, _args, _info) => prisma.data.findMany(),
  })
)
// 3. Tabel Pegawai
builder.queryField("pegawai", t =>
  t.prismaField({
    type: ["Pegawai"],
    resolve: async (_parent, _args, _info) => prisma.pegawai.findMany(),
  })
)
// 4. Data Tamu
builder.queryField('Tamu', (t) =>
  t.prismaField({
    type: ['Tamu'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.tamu.findMany({
        ...query,
      })
  })
)


// Mutation
// 1. Buat data Tamu
builder.mutationField('createTamu', (t) =>
  t.prismaField({
    type: 'Tamu',
    args: {
      nama: t.arg.string({required: true}),
      email: t.arg.string({required: true}),
      nomer: t.arg.string({required: true}),
      keperluan: t.arg.string({required: true}),
      keperluanDetail: t.arg.string(),
      pekerjaan: t.arg.string({required: true}),
      kategoriInstansi: t.arg.string(),
      namaInstansi: t.arg.string(),
      saranaId: t.arg.int({required: true}),
      dataId: t.arg.int(),
      dataDetail: t.arg.string(),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.tamu.create({
        ...query,
        data: {
          tNama: args.nama,
          email: args.email,
          nomer: args.nomer,
          keperluan: args.keperluan,
          keperluanDetail: args.keperluanDetail,
          pekerjaan: args.pekerjaan,
          kategoriInstansi: args.kategoriInstansi,
          namaInstansi: args.namaInstansi,
          sarana: {
            connect: {saranaId: args.saranaId}
          },
          data: {
            connect: {dataId: args.dataId ?? undefined}
          },
          dataDetail: args.dataDetail,
          noAntrian: '123A',
          status: false,
        }
      })
  })
)

// 2. Ubah data Tamu
// 3. Hapus data Tamu
builder.mutationField('deleteTamu', (t) =>
  t.prismaField({
    type: 'Tamu',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.tamu.delete({
        ...query,
        where: {
          tamuId: Number(args.id),
        }
      })
  })
)

/*
builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
    posts: t.relation("posts")
  })
})

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content', { nullable: true }),
    published: t.exposeBoolean('published'),
    author: t.relation('author')
  })
})

builder.queryField('feed', (t) =>
  t.prismaField({
    type: ['Post'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: true }
      })
  })
)

builder.queryField('post', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.post.findUnique({
        ...query,
        where: {
          id: Number(args.id)
        }
      })
  })
)

builder.queryField('drafts', (t) =>
  t.prismaField({
    type: ['Post'],
    resolve: async (query, _parent, _args, _info) =>
      prisma.post.findMany({
        ...query,
        where: { published: false }
      })
  })
)

builder.queryField('filterPosts', (t) =>
  t.prismaField({
    type: ['Post'],
    args: {
      searchString: t.arg.string({ required: false })
    },
    resolve: async (query, _parent, args, _info) => {
      const or = args.searchString
        ? {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        }
        : {}
      return prisma.post.findMany({
        ...query,
        where: { ...or }
      })
    }
  })
)

builder.mutationField('signupUser', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      name: t.arg.string({ required: false }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.user.create({
        ...query,
        data: {
          email: args.email,
          name: args.name
        }
      })
  })
)

builder.mutationField('deletePost', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.delete({
        ...query,
        where: {
          id: Number(args.id),
        }
      })
  })
)

builder.mutationField('publish', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          published: true,
        }
      })
  })
)

builder.mutationField('createDraft', (t) =>
  t.prismaField({
    type: 'Post',
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string(),
      authorEmail: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.post.create({
        ...query,
        data: {
          title: args.title,
          content: args.content,
          author: {
            connect: { email: args.authorEmail }
          }
        }
      })
  })
)*/

const schema = builder.toSchema()
const schemaAsString = printSchema(lexicographicSortSchema(schema));
 
writeFileSync('./schema.graphql', schemaAsString);

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
})

export const config = {
  api: {
    bodyParser: false,
  },
}
