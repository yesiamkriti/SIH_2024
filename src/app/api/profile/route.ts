'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const uri =process.env.NEXT_PUBLIC_MONGODB_URI;
let client:MongoClient

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (uri) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
} else {
  // Handle the case where uri is undefined
  console.error("URI is undefined");
}
export async function POST(req:Request){
    try{
        const data=await req.json();
        const a=await client.connect()
        console.log(data)
        if(a){
            
            const db= client.db('ayuraksha');
            const user= db.collection('users_data')
            const check_user= await user.findOne({email_address:data.email});
            
            if(check_user ){
              return NextResponse.json({success:true,profile_data:check_user})
            }
          }
          return NextResponse.json({success:false,message:'try again'})
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}