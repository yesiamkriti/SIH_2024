'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ethers } from 'ethers';
import { systemAbi, userAbi } from '@/app/components/abi';
import { userBytecode } from '@/app/components/bytecode';
import sjcl from 'sjcl'
import {create} from 'kubo-rpc-client'
import CryptoJS from "crypto-js";

import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "rose-supposed-gamefowl-223.mypinata.cloud",
});

const network = "sepolia";
const provider = ethers.getDefaultProvider(network, {infura:process.env.NEXT_PUBLIC_INFURA_API});

// Replace with your private key (use a test account for security)
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key is not defined. Please check your environment variables.');
}
const wallet = new ethers.Wallet(privateKey, provider);
const deployContract = async (profileCid:string) => {
  try {
    // Create a ContractFactory to deploy the contract
    const factory = new ethers.ContractFactory(userAbi, userBytecode, wallet);

    // Deploy the contract (pass constructor arguments here if needed)
    const contract = await factory.deploy(profileCid);

    console.log('Deploying contract...');
    

    // Wait for the transaction to be mined
    const deploymentTx = await contract.waitForDeployment();
    const txResponse = deploymentTx.deploymentTransaction();

    if (txResponse !== null) {
      console.log(txResponse.hash);
    } else {
      console.error('Deployment transaction is null');
    }

    console.log(`Contract deployed at address: ${(await contract.getAddress()).toString()}`);
    return (await contract.getAddress()).toString();
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
};
const key = process.env.NEXT_PUBLIC_END_KEY;

function encryptData(data:any) {
  if(!key){
    return
  }
  const encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
}


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
interface userData{
  first_name:string;
  last_name:string;
  phone_no:string;
  email_address:string;
  created_date:string;
  auid:string;
}
export async function POST(req:Request){
    try{
        const data=await req.json();
        const a=await client.connect()
        const ipfs = create('/ip4/127.0.0.1/tcp/5001');

        if(a){
          const db= client.db('ayuraksha');
          const user= db.collection('doctor_data')
          const otpdb= db.collection('otp')
          const uiddb = client.db('doctor');
          const uidCol= uiddb.collection('licence')
          const uidUser = await uidCol.findOne({uniqueNumber:data.licence})
          const userProfile = encryptData(JSON.stringify({
            firstName:uidUser?.firstName,
            lastName:uidUser?.lastName,
            dob:uidUser?.dob,
            fathername:uidUser?.fatherName,
            mothername:uidUser?.motherName,
            gender:uidUser?.gender,
            image:uidUser?.image
          }));
          console.log(userProfile)
          const  otp=await otpdb.findOne({email_id:data.email})
          if(otp && process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS){      
            const check_user= await user.findOne({email_address:data.email});
            if(!check_user && otp.otp === data.otp &&userProfile){

              const file = new File([userProfile], "hello.json", { type: "application/json" })
              const upload = await pinata.upload.file(file)
              
               const contractAdd = await deployContract(`ipfs://${upload.IpfsHash}`)
               const contract = new ethers.Contract(process.env.NEXT_PUBLIC_SYSTEM_CONTRACT_ADDRESS, systemAbi,wallet);  // signer or provider depending on use
               const aadharHash= CryptoJS.SHA256(data.aadhar).toString();
               console.log(await contract.storeAadharHash(aadharHash,contractAdd))
              
              const userdata:userData={
                first_name:data.firstName,
                last_name:data.lastName,
                phone_no:data.phone,
                email_address:data.email,
                created_date:`${Date.now()}`,
                auid:`${contractAdd}`,
              }
                const register=await user.insertOne(userdata);
                if(register){
                    return NextResponse.json({success:true,message:'registered successfull'})
                }
              }
            
            else if(otp.otp !== data.otp){
            return NextResponse.json({success:false,message:'Invalid Otp'})
            }
            else{
            return NextResponse.json({success:false,message:'already registered'})
            }
            
           
            
        }else{
        return NextResponse.json({success:false,message:'verification failed'})
        }
      }
    }catch(e){
        console.log(e)
    }
    
    return NextResponse.json({success:false,message:'something went wrong'})
}