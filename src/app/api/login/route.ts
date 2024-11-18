'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';
import { PinataSDK } from 'pinata-web3';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "rose-supposed-gamefowl-223.mypinata.cloud",
});

const network = "sepolia";
const provider = ethers.getDefaultProvider(network,{etherscan:process.env.NEXT_PUBLIC_ETHERSCAN_API});

// Replace with your private key (use a test account for security)
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key is not defined. Please check your environment variables.');
}
const wallet = new ethers.Wallet(privateKey, provider);
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
const key = process.env.NEXT_PUBLIC_END_KEY;
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
              if(!key){
                return
              }
              const data = CryptoJS.AES.encrypt(JSON.stringify({al:{allergy:''}}), key).toString();
              const file = new File([data], "hello.json", { type: "application/json" })
              const upload = await pinata.upload.file(file)
              if(!process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){
                return ;
              }
              const systemContract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet); 
              const patientAccount = await systemContract.getPatientAccount(aadharHash)
              const patientContract=  new ethers.Contract(`${patientAccount}`, userAbi,wallet);
               const allergy = await patientContract.setAlergies(`ipfs://${upload.IpfsHash}`);
              return NextResponse.json({success:true,message:'login successful',profile_data:check_user})
            }}
          }
          return NextResponse.json({success:false,message:'try again'})
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}