'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';
import CryptoJS from 'crypto-js';
import { PinataSDK } from "pinata-web3";

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
function bigIntToString(obj: any): any {
  if (typeof obj === 'bigint') {
    return obj.toString(); // Convert BigInt to string
  } else if (Array.isArray(obj)) {
    return obj.map(bigIntToString); // Recursively handle arrays
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigIntToString(value)])
    ); // Recursively handle objects
  }
  return obj; // Return other data types as-is
}
function convertIpfsUriToHttp(ipfsUri:any) {
  if (ipfsUri.startsWith('ipfs://')) {
    return ipfsUri.replace('ipfs://', 'https://rose-supposed-gamefowl-223.mypinata.cloud/ipfs/');
  }
  return ipfsUri; // Return the original URI if it's not IPFS format
}
const key = process.env.NEXT_PUBLIC_END_KEY;

export async function POST(req:NextRequest){
    try{
        const al= await req.json();
        console.log(al)
        const a=await client.connect()
        if(a){
          const db= client.db('ayuraksha');
          const user= db.collection('users_data')

          const aadharHash = req.cookies.get('LoginHash')?.value||'';
          if(!process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){
              return ;
          }
          if(!key){
            return
          }
          const data = CryptoJS.AES.encrypt(JSON.stringify({al}), key).toString();
          const file = new File([data], "hello.json", { type: "application/json" })
          const upload = await pinata.upload.file(file)
          const systemContract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet); 
          const patientAccount = await systemContract.getPatientAccount(aadharHash)
          const patientContract=  new ethers.Contract(`${patientAccount}`, userAbi,wallet);
           const allergy = await patientContract.setAlergies(`ipfs://${upload.IpfsHash}`);
          if(allergy){

        return NextResponse.json({success:true,message:'successful'});
    }
          }
          return NextResponse.json({success:false,message:'try again'})
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}