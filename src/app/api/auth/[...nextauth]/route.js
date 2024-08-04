import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                // return true;
                const { email, password } = credentials;
                if (!email || !password) return null;

                const db = await connectDB();
                const currentUser = await db.collection('users').findOne({ email });
                if (!currentUser) return null;

                const passwordMatched = await bcrypt.compare(password, currentUser.password);
                if (!passwordMatched) return null;

                return currentUser;
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        //signIn function k jodi ami modify korte chai tobe callback function er maddhome korte hoy.
        async signIn({user, account}) {
            
            if(account.provider === 'google' || account.provider === 'github') {
                const {name, email, image} = user;
                try {
                    const db = await connectDB();
                    const userCollection = db.collection('users');
                    const isExists = await userCollection.findOne({email});
                    if(!isExists) {
                        // await userCollection.insertOne(user);
                        await userCollection.insertOne({...user, accountType : 'employee'});
                        return user;
                    }
                    else {
                        return user;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                return user;
            }
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
