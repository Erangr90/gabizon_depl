// // Install Prisma Client if not already installed
// // npm install @prisma/client

// import { Creator, Post, User } from '@prisma/client'
// import { db } from '../db'

// export async function insertDummyData() {
//   // Create Creators
//   const creators: Creator[] = []
//   for (let i = 1; i <= 20; i++) {
//     const creator = await db.creator.create({
//       data: {
//         firstName: `CreatorFirstName${i}`,
//         lastName: `CreatorLastName${i}`,
//       },
//     })
//     creators.push(creator)
//   }

//   // Create Posts
//   const posts: Post[] = []
//   for (let i = 1; i <= 20; i++) {
//     const post = await db.post.create({
//       data: {
//         title: `Post Title ${i}`,
//         creatorId: creators[i % creators.length].id,
//         time: Math.floor(Math.random() * 100),
//       },
//     })
//     posts.push(post)
//   }

//   // Create Users
//   const users: User[] = []
//   for (let i = 1; i <= 20; i++) {
//     const user = await db.user.create({
//       data: {
//         firstName: `UserFirstName${i}`,
//         lastName: `UserLastName${i}`,
//       },
//     })
//     users.push(user)
//   }

//   // Create Saved records
//   for (let i = 0; i < 20; i++) {
//     await db.saved.create({
//       data: {
//         userId: users[i % users.length].id,
//         postId: posts[i % posts.length].id,
//       },
//     })
//   }

//   // Create Watched records
//   for (let i = 0; i < 20; i++) {
//     await db.watched.create({
//       data: {
//         userId: users[i % users.length].id,
//         postId: posts[i % posts.length].id,
//         count: Math.floor(Math.random() * 10),
//       },
//     })
//   }

//   console.log('Dummy data created successfully')
// }
