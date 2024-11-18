'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';

const uri =process.env.NEXT_PUBLIC_MONGODB_URI;
let client:MongoClient
//smart contract
const network = "sepolia";
const provider = ethers.getDefaultProvider(network,{etherscan:process.env.NEXT_PUBLIC_ETHERSCAN_API});
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key is not defined. Please check your environment variables.');
}
const wallet = new ethers.Wallet(privateKey, provider);

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
export async function GET(request:NextRequest){
    try{
        const aadharHash = request.cookies.get('LoginHash')?.value||'';
        if(!process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){
            return ;
        }
        const systemContract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet); 
        const patientAccount = await systemContract.getPatientAccount(aadharHash)
        const patientContract=  new ethers.Contract(`${patientAccount}`, userAbi,wallet);
        const medicine=await patientContract.getMedicineRecords()
        console.log(medicine)
        if(medicine){
            const medicineStringified = bigIntToString(medicine);
        return NextResponse.json({success:true,reports:medicineStringified});
    }
    return NextResponse.json('wrong');
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}