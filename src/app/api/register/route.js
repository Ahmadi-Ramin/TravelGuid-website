// import db from '@/lib/db'
// import { NextResponse } from 'next/server'
// import bcryptjs from 'bcryptjs'

// export async function POST(req) {
//     try {
//         const body = await req.json()

//         const {
//             email,
//             username,
//             password
//         } = body

//         const isExisting = await db.user.findUnique({
//             where: {
//                 email
//             }
//         })

//         if (isExisting) {
//             return NextResponse.error({ message: "You've already registered" }, { status: 409 })
//         }

//         const hashedPassword = await bcryptjs.hash(password, 10)

//         await db.user.create({
//             data: {
//                 email,
//                 username,
//                 password: hashedPassword
//             }
//         })

//         return NextResponse.json({ message: "User has registered successfully" }, { status: 201 })
//     } catch (error) {
//         return NextResponse.error(error)
//     }
// }






import db from '@/lib/db';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            email,
            username,
            password,
        } = body;

        const isExisting = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (isExisting) {
            return NextResponse.json({ message: "You've already registered" }, { status: 409 });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        // Explicitly set isAdmin to false
        await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                isAdmin: false, // Explicitly set to prevent unintended behavior
            },
        });

        return NextResponse.json({ message: "User has registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
