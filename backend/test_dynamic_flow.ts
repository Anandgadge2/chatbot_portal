
import mongoose from 'mongoose';
import { DynamicFlowEngine } from './src/services/dynamicFlowEngine';
import ChatbotFlow from './src/models/ChatbotFlow';
import WhatsAppSession from './src/models/WhatsAppSession';
import Company from './src/models/Company';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

async function test() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected');

    const companyId = '6989db83453881ef7ba5c778'; 
    const phoneNumber = '919420015403'; // User's phone from screenshot

    const company = await Company.findById(companyId);
    if (!company) throw new Error('Company not found');

    const flow = await ChatbotFlow.findOne({ companyId, isActive: true, flowName: /Jharsuguda/i });
    if (!flow) throw new Error('Flow not found');

    console.log(`✨ Testing flow: ${flow.flowName}`);

    const sessionData = {
      currentStepId: 'appointment_purpose',
      purpose: 'Testing API call',
      language: 'en'
    };

    const session: any = {
      companyId,
      phoneNumber,
      language: 'en',
      data: sessionData,
      lastActivity: new Date()
    };

    const engine = new DynamicFlowEngine(flow, session as any, company, phoneNumber);

    console.log('🚀 Executing step: appointment_purpose with input...');
    await engine.executeStep('appointment_purpose', 'for the kankher office');

    console.log('🏁 Test finished');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

test();
