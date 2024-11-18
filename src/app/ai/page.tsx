"use client"
import React, { useState } from "react"
import Navbar from "../components/navbar"
import './style.css'
import { AttachmentIcon, UpSideArrow } from "../components/svg"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai";

async function genAi(params:string) {
    if(!process.env.NEXT_PUBLIC_GOOGLLE_API){
        return;
    }
    

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent(params);
console.log(result.response.text());
return result;
}


export default function Ai(){
    const [ai,setAi]=useState('')
    const [message,setMessage]=useState('')
    const [generating,setGenerating]=useState(false)

    async function talkAi(){
        setAi('')
        setGenerating(true)
        try{
            const response = await genAi(message);
            
            if(response){
                setAi(response.response.text());
                setGenerating(false)
            }
        }catch(e){

        }
    }
    
    
    return(
        <main className="ai-main">
            <Navbar/>
            <div className="ai-body">
                <div className="ai-window">
                    <div className="ai-chat-window">
                 {!ai &&  <p>Hi! 👋 How can I help you today? 😊</p>}
                    {generating&&<p className="ai-response">Generating...</p>}
                    {ai && <pre className="ai-response" dangerouslySetInnerHTML={{ __html: ai.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<li>$1</li>') }} /> }
                    </div>
                <div className="ai-input-cont">
                {/* <div className="ai-attach-icon">
                    <AttachmentIcon/>
                    </div> */}
                   <textarea className="text-area" onChange={(e)=>setMessage(e.target.value)} />
                   <div className="ai-search-icon" onClick={talkAi}>
                    <UpSideArrow/>
                   </div>
                </div>
                
                </div>
            </div>
        </main>
    )
}