// https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions#edge-functions-vs.-serverless-functions
import { Cabin_Sketch } from 'next/font/google';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export const runtime = "edge"
 
export async function POST(
  request: NextRequest,
  context: NextFetchEvent,
) {
try { 
  const body = await request.json();
  console.log('Ask gpt following ', body.prompt, body.about, body.fields, body.fields.length)
  // return NextResponse.json({answer: 'ok'});
  const completion = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    messages: [{"role":"system", "content":`Generate JSON formatted output for following ${body.prompt}\n ${body.about}\n ${body.fields}`},],
  });    
  console.log(completion)

  let cost: number | undefined;

  if (completion) {
    cost = ((completion.usage?.prompt_tokens || 0) * 0.0015 + (completion.usage?.completion_tokens || 0) * 0.002) / 1000;
  }
  
  // return NextResponse.json({ answer: completion.choices[0].message.content, inputTokens: completion.usage?.prompt_tokens, outputTokens: completion.usage?.completion_tokens, cost });
  return NextResponse.json(completion.choices[0].message.content);
  } catch (error: any) {
    console.log('---------------- error', error);
    return NextResponse.json({ error: error.message });
  }
}

// const comp = {"id":"chatcmpl-83ySPRJ8VkG8zNQ0wynoOBxMppaER","object":"chat.completion","created":1695958073,"model":"gpt-3.5-turbo-0613","choices":[{"index":0,"message":{"role":"assistant","content":"The baby had three sleep sessions in the last 24 hours. The total sleep time adds up to 11.5 hours, which is less than the recommended 13 hours for a 6-month-old baby. To improve the baby's sleep duration, it is suggested to establish a consistent bedtime routine, create a calm and soothing sleep environment, and ensure that the baby is well-rested during the day with regular naps. It may also be helpful to consult with a pediatrician for further guidance on improving the baby's sleep habits."},"finish_reason":"stop"}],"usage":{"prompt_tokens":110,"completion_tokens":108,"total_tokens":218}}