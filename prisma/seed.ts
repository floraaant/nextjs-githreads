import { Prisma, PrismaClient } from "@prisma/client";
import {faker} from "@faker-js/faker"
 
const prisma = new PrismaClient();

const main = async() => {
    const users = [];

    for (let i = 0; i < 10; i++){
        const user = {
            username: faker.internet.userName(),
            image: faker.image.avatar(),
            name: faker.person.firstName(),
            bio: faker.lorem.paragraph(),
            link: faker.internet.url(),
            email: faker.internet.email(),
        } satisfies Prisma.UserCreateInput;
        const dbUser = await prisma.user.create({data: user})
        
        users.push(dbUser);
    }

    const posts = [];
    for (let i =0; i < 100; i++){
        const randomIndex = faker.number.int({
            min: 0,
            max: users.length - 1,
        })
        const randomWorld = faker.number.int({
            min: 5,
            max: 12,
        })
        const post = 
        {
            content: faker.lorem.sentence(randomWorld),
            userId: users[randomIndex].id,
        } satisfies Prisma.PostUncheckedCreateInput;

        const p = await prisma.post.create({data: post})
        posts.push(p)
    }
    const likes = []
    for (let i =0; i < 200; i++){
        const randomIndex = faker.number.int({
            min: 0,
            max: users.length - 1,
        })
        const randomPosts = faker.number.int({
            min: 0,
            max: posts.length - 1,
        })

        const like = {
            postId: posts[randomPosts].id,
            userId: users[randomIndex].id,
        } satisfies Prisma.LikeUncheckedCreateInput;

        const l = await prisma.like.create({data: like})
        likes.push(l)
    }
}

main().then(async() => {
    await prisma.$disconnect();
}).catch(async e =>{
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})