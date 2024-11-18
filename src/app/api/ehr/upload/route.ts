'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';
import { create } from 'kubo-rpc-client';
import CryptoJS from 'crypto-js';



import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "rose-supposed-gamefowl-223.mypinata.cloud",
});


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
  async function getIPFSContent(cid:string) {
    try {
      const content = [];
      const ipfs = create('/ip4/127.0.0.1/tcp/5001');
      // `ipfs.cat` returns an AsyncGenerator, so you need to iterate over it.
      for await (const chunk of ipfs.get(cid)) {
        content.push(chunk);
      }
  
      // Convert the Buffer chunks to a string
      const result = Buffer.concat(content).toString();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching IPFS content:", error);
    }
  }
  const key = process.env.NEXT_PUBLIC_END_KEY;

export async function POST(request:NextRequest){
    try{
        if(!key){
            return;
          }
          const ipfs = create('/ip4/127.0.0.1/tcp/5001');
        const data =await request.json();
        const aadharHash = request.cookies.get('LoginHash')?.value||'';
        if(!process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){
            return ;
        }
        const systemContract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet); 
        const patientAccount = await systemContract.getPatientAccount(aadharHash)
        const patientContract=  new ethers.Contract(`${patientAccount}`, userAbi,wallet);
        const fileHash = CryptoJS.AES.encrypt(data.file, key).toString();
        const file = new File([fileHash], "hello.txt", { type: "text/plain" })
        const upload = await pinata.upload.file(file)
        if(upload){
        //clientInfura.pin.add(cid.cid)
        const ehr=await patientContract.setMedicalRecord(Date.now(),data.issue,data.doctorName,data.consultedBy,`ipfs://${upload.IpfsHash}`)
        // console.log(ehr)
        if(ehr){
            const ehrStringified = bigIntToString(ehr);
        return NextResponse.json({success:true,message:'uploaded successfully'});
    }
}
    return NextResponse.json('wrong');
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}