'use server'
import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
let client: MongoClient

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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rsuman7868@gmail.com",
    pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
  },
});

function generateSixDigitPassword() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data)
    const a = await client.connect()
    const generateOtp = generateSixDigitPassword();

    if (a) {

      const db = client.db('ayuraksha');
      const otp = db.collection('otp');
      const uiddb = client.db('aadhardb');
      const uidCol= uiddb.collection('aadhar')
      const uidUser = await uidCol.findOne({uniqueNumber:data.aadhar})
      console.log(uidUser)
      if(uidUser == null){
        return NextResponse.json({ success: false, message: 'Aadhar not found' })
      }
      const mailOptions = {
        from: '"AyuRaksha" <rsuman7868@gmail.com>',
        to:uidUser.email,
        subject: `Your OTP Code for Secure Access - ${generateOtp}`,
        text: `Your OTP code is: ${generateOtp}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
              <h2 style="color: #333;">Welcome to AyuRaksha!</h2>
              <p style="font-size: 16px; color: #555;">We are excited to help you secure your account.</p>
              <p style="font-size: 16px; color: #555;">Please use the following OTP code to complete your action:</p>
              <div style="font-size: 24px; color: #4CAF50; margin: 20px 0; font-weight: bold; text-align: center;">
                ${generateOtp}
              </div>
              <p style="font-size: 14px; color: #777;">For security reasons, do not share this OTP with anyone.</p>
              <div style="border-top: 1px solid #eee; margin-top: 20px; padding-top: 10px;">
                <p style="font-size: 12px; color: #999;">If you did not request this OTP, please contact us immediately.</p>
                <p style="font-size: 12px; color: #999;">Thank you for choosing AyuRaksha.</p>
              </div>
            </div>
          </div>
        `,
      };
      const f = await otp.findOne({ email_id: uidUser.email })
      console.log(f)
      if (!f) {


        // Send the email
        await transporter.sendMail(mailOptions);
        await otp.createIndex({ time: 1 }, { expireAfterSeconds: 60 })

        await otp.insertOne({ otp: generateOtp, time: new Date(Date.now()), email_id:uidUser.email })




        return NextResponse.json({ success: true, message: 'otp sent successfully' })
      }
      return NextResponse.json({ success: false, message: 'user not found' })
    }
    
  } catch (e) {
    console.log(e)
  }

  return NextResponse.json({ success: false, message: 'something went wrong' })
}