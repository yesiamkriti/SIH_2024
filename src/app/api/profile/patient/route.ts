'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';
import CryptoJS from 'crypto-js';


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
export async function GET(req:NextRequest){
    try{
        const a=await client.connect()
        if(a){
          const db= client.db('ayuraksha');
          const user= db.collection('users_data')

          const aadharHash = req.cookies.get('LoginHash')?.value||'';
          if(!process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){
              return ;
          }
          const systemContract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet); 
          const patientAccount = await systemContract.getPatientAccount(aadharHash)
          const patientContract=  new ethers.Contract(`${patientAccount}`, userAbi,wallet);
          const check_user= await user.findOne({auid:`${patientAccount}`});
          console.log(check_user)
          const profile = await patientContract.patientProfileCid();
          console.log(profile)
          const allergy = await patientContract.patientAlergiesCid();
          const response = await fetch(convertIpfsUriToHttp(profile));
          const responseAl = await fetch(convertIpfsUriToHttp(allergy));
          const blob = await response.blob(); // Get the file as a Blob
          const blobAl = await responseAl.blob(); // Get the file as a Blob
          console.log(await blob.text())
          const mimeType = blob.type; // Get the MIME type of the blob
          if(!process.env.NEXT_PUBLIC_END_KEY){
            return
          }
          const content = CryptoJS.AES.decrypt(await blob.text(),process.env.NEXT_PUBLIC_END_KEY)
          const contentAl = CryptoJS.AES.decrypt(await blobAl.text(),process.env.NEXT_PUBLIC_END_KEY)
          if(profile){
            const profileStringified =content.toString(CryptoJS.enc.Utf8);
            const AlStringified =contentAl.toString(CryptoJS.enc.Utf8);
            console.log(JSON.parse(profileStringified))
        return NextResponse.json({success:true,reports:JSON.parse(profileStringified),personalInfo:check_user,allergy:JSON.parse(AlStringified).al.allergy});
    }
          }
          return NextResponse.json({success:false,message:'try again'})
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}