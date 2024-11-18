'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

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
            const otpdb= db.collection('otp')
            const uiddb = client.db('aadhardb');
            const uidCol= uiddb.collection('aadhar')
            const uidUser = await uidCol.findOne({uniqueNumber:data.aadhar})
            console.log(uidUser)
            if(uidUser === null){
              return NextResponse.json({success:false,message:'try again'})
            }
            const  otp=await otpdb.findOne({email_id:uidUser.email})
            const check_user= await user.findOne({email_address:uidUser.email});
            if(otp){
            if(check_user && otp.otp === data.otp){
              const aadharHash = CryptoJS.SHA256(data.aadhar);
              const expiryTimestamp = Date.now() + (365 * 24 * 60 * 60 * 1000);
              cookies().set('LoginHash', `${aadharHash}`, { expires: expiryTimestamp });
              return NextResponse.json({success:true,message:'login successful',profile_data:check_user})
            }}
          }
          return NextResponse.json({success:false,message:'try again'})
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}