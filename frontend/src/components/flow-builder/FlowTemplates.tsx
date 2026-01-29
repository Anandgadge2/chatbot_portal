'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, User, Camera, MapPin, FileText, MessageSquare, CalendarDays, Search } from 'lucide-react';

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  steps: any[];
  triggers: any[];
}

/**
 * Dynamic placeholders (replaced from session/backend when the step runs):
 * - Grievance: {citizenName}, {category}, {description}, {grievanceId}, {department}, {date}
 * - Appointment: {citizenName}, {purpose}, {appointmentDate}, {appointmentTime}, {appointmentId}, {status}
 * - Track: {refNumber}, {status}, {assignedTo}, {remarks}, {recordType}
 */
export const FLOW_TEMPLATES: FlowTemplate[] = [
  {
    id: 'zp-amravati-full-flow',
    name: 'ZP Amravati – Full Citizen Services Flow (All-in-One)',
    description: 'Complete flow (Meta limits: max 3 buttons, 20 chars each): language selection (EN/Hi/Mr), main menu (Grievance, Appointment, Track), grievance, appointment, track status. Dynamic values from backend/session.',
    icon: <MessageSquare className="w-5 h-5" />,
    triggers: [
      { type: 'keyword', value: 'hi', startStepId: 'language_selection' },
      { type: 'keyword', value: 'hello', startStepId: 'language_selection' },
      { type: 'keyword', value: 'start', startStepId: 'language_selection' },
      { type: 'keyword', value: 'menu', startStepId: 'language_selection' }
    ],
    steps: [
      // Meta: max 3 buttons per message, 20 chars per button title
      {
        stepId: 'language_selection',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🇮🇳 *Zilla Parishad Amravati - Official Digital Portal*\n\nNamaskar! Welcome to the official WhatsApp service of Zilla Parishad Amravati.\n\nWe are dedicated to providing transparent and efficient services to all citizens.\n\n👇 *Please select your preferred language:*'
          },
          buttons: [
            { id: 'lang_en', text: { en: '🇬🇧 English' }, nextStep: 'main_menu_en' },
            { id: 'lang_hi', text: { en: '🇮🇳 हिंदी' }, nextStep: 'main_menu_hi' },
            { id: 'lang_mr', text: { en: '🇮🇳 मराठी' }, nextStep: 'main_menu_mr' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'lang_en', nextStepId: 'main_menu_en' },
          { type: 'button_click', value: 'lang_hi', nextStepId: 'main_menu_hi' },
          { type: 'button_click', value: 'lang_mr', nextStepId: 'main_menu_mr' }
        ],
        nextStep: null
      },
      {
        stepId: 'main_menu_en',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🏛️ *Citizen Services Menu*\n\nWelcome to the Zilla Parishad Amravati Digital Helpdesk.\n\n👇 *Please select a service:*'
          },
          buttons: [
            { id: 'grievance_en', text: { en: '📝 File Grievance' }, nextStep: 'grievance_start' },
            { id: 'appointment_en', text: { en: '📅 Book Appointment' }, nextStep: 'appointment_start' },
            { id: 'track_en', text: { en: '🔍 Track Status' }, nextStep: 'track_status' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'grievance_en', nextStepId: 'grievance_start' },
          { type: 'button_click', value: 'appointment_en', nextStepId: 'appointment_start' },
          { type: 'button_click', value: 'track_en', nextStepId: 'track_status' }
        ],
        nextStep: null
      },
      {
        stepId: 'main_menu_hi',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🏛️ *नागरिक सेवा मेनू*\n\nजिला परिषद अमरावती डिजिटल हेल्पडेस्क में आपका स्वागत है।\n\n👇 *कृपया एक सेवा चुनें:*'
          },
          buttons: [
            { id: 'grievance_hi', text: { en: '📝 शिकायत दर्ज करें' }, nextStep: 'grievance_start' },
            { id: 'appointment_hi', text: { en: '📅 अपॉइंटमेंट बुक' }, nextStep: 'appointment_start' },
            { id: 'track_hi', text: { en: '🔍 स्थिति ट्रैक करें' }, nextStep: 'track_status' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'grievance_hi', nextStepId: 'grievance_start' },
          { type: 'button_click', value: 'appointment_hi', nextStepId: 'appointment_start' },
          { type: 'button_click', value: 'track_hi', nextStepId: 'track_status' }
        ],
        nextStep: null
      },
      {
        stepId: 'main_menu_mr',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🏛️ *नागरिक सेवा मेनू*\n\nजिला परिषद अमरावती डिजिटल हेल्पडेस्कमध्ये आपले स्वागत आहे.\n\n👇 *कृपया एक सेवा निवडा:*'
          },
          buttons: [
            { id: 'grievance_mr', text: { en: '📝 तक्रार दाखल करा' }, nextStep: 'grievance_start' },
            { id: 'appointment_mr', text: { en: '📅 अपॉइंट बुक करा' }, nextStep: 'appointment_start' },
            { id: 'track_mr', text: { en: '🔍 स्थिती ट्रॅक करा' }, nextStep: 'track_status' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'grievance_mr', nextStepId: 'grievance_start' },
          { type: 'button_click', value: 'appointment_mr', nextStepId: 'appointment_start' },
          { type: 'button_click', value: 'track_mr', nextStepId: 'track_status' }
        ],
        nextStep: null
      },
      { stepId: 'grievance_start', type: 'message', content: { text: { en: '📝 *Register a Grievance*\n\nYou can file a formal complaint regarding any ZP department.\n\nTo begin, please provide the details as requested.' } }, nextStep: 'grievance_name' },
      {
        stepId: 'grievance_name',
        type: 'collect_input',
        content: {
          text: { en: '👤 *Citizen Identification*\n\nPlease enter your Full Name as per official documents:' },
          inputConfig: { inputType: 'text', saveToField: 'citizenName', validation: { required: true, minLength: 2, maxLength: 100 }, placeholder: 'Full name' }
        },
        expectedResponses: [{ type: 'any', value: '*', nextStepId: 'grievance_category' }],
        nextStep: 'grievance_category'
      },
      {
        stepId: 'grievance_category',
        type: 'message',
        content: { text: { en: '🏢 *Department Selection*\n\nPlease select the relevant department:' } },
        nextStep: 'grievance_description'
      },
      {
        stepId: 'grievance_description',
        type: 'collect_input',
        content: {
          text: { en: '✍️ *Grievance Details*\n\nPlease describe your issue in detail. Include date, location, and specific information for faster resolution.' },
          inputConfig: { inputType: 'text', saveToField: 'description', validation: { required: true, minLength: 10, maxLength: 1000 }, placeholder: 'Describe your grievance' }
        },
        nextStep: 'grievance_photo'
      },
      {
        stepId: 'grievance_photo',
        type: 'interactive_buttons',
        content: {
          text: { en: '📎 *Supporting Evidence (Optional)*\n\nUpload a photo or document to support your grievance. Supported: JPG, PNG, WEBP, PDF.' },
          buttons: [
            { id: 'photo_skip', text: { en: '⏭ Skip' }, nextStep: 'grievance_confirm' },
            { id: 'photo_upload', text: { en: '📤 Upload Photo' }, nextStep: 'grievance_photo_upload' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'photo_skip', nextStepId: 'grievance_confirm' },
          { type: 'button_click', value: 'photo_upload', nextStepId: 'grievance_photo_upload' }
        ],
        nextStep: null
      },
      { stepId: 'grievance_photo_upload', type: 'message', content: { text: { en: '📤 Please send a photo or document. You can skip by typing *back*.' } }, nextStep: 'grievance_confirm' },
      {
        stepId: 'grievance_confirm',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '📋 *Confirm Submission*\n\n👤 Name: {citizenName}\n🏢 Department: {category}\n📝 Issue: {description}\n\nIs the above information correct?'
          },
          buttons: [
            { id: 'confirm_yes', text: { en: '✅ Submit Grievance' }, nextStep: 'grievance_success' },
            { id: 'confirm_no', text: { en: '❌ Cancel' }, nextStep: 'main_menu_en' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'confirm_yes', nextStepId: 'grievance_success' },
          { type: 'button_click', value: 'confirm_no', nextStepId: 'main_menu_en' }
        ],
        nextStep: null
      },
      {
        stepId: 'grievance_success',
        type: 'message',
        content: {
          text: {
            en: '✅ *Grievance Registered Successfully*\n\nYour complaint has been logged in our system.\n\n🎫 *Ref No:* `{grievanceId}`\n🏢 *Dept:* {department}\n📅 *Date:* {date}\n\nYou will receive updates via WhatsApp.'
          }
        },
        nextStep: null
      },
      { stepId: 'appointment_start', type: 'message', content: { text: { en: '📅 *Book an Official Appointment*\n\nSchedule a meeting with the CEO, Zilla Parishad. Please provide the required details.' } }, nextStep: 'appointment_name' },
      {
        stepId: 'appointment_name',
        type: 'collect_input',
        content: {
          text: { en: '👤 *Your Name*\n\nPlease enter your Full Name (as per official records):' },
          inputConfig: { inputType: 'text', saveToField: 'citizenName', validation: { required: true, minLength: 2, maxLength: 100 } }
        },
        nextStep: 'appointment_purpose'
      },
      {
        stepId: 'appointment_purpose',
        type: 'collect_input',
        content: {
          text: { en: '🎯 *Purpose of Meeting*\n\nPlease briefly describe the purpose of your meeting:' },
          inputConfig: { inputType: 'text', saveToField: 'purpose', validation: { required: true, minLength: 5, maxLength: 500 } }
        },
        nextStep: 'appointment_date'
      },
      {
        stepId: 'appointment_date',
        type: 'collect_input',
        content: {
          text: { en: '📅 *Preferred Date*\n\nPlease type your preferred date (YYYY-MM-DD):' },
          inputConfig: { inputType: 'date', saveToField: 'appointmentDate', validation: { required: true } }
        },
        nextStep: 'appointment_time'
      },
      {
        stepId: 'appointment_time',
        type: 'collect_input',
        content: {
          text: { en: '⏰ *Preferred Time*\n\nPlease type your preferred time (e.g., 10:30 AM):' },
          inputConfig: { inputType: 'text', saveToField: 'appointmentTime', validation: { required: true, minLength: 3, maxLength: 50 } }
        },
        nextStep: 'appointment_confirm'
      },
      {
        stepId: 'appointment_confirm',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '📋 *Verify Appointment Details*\n\n👤 Name: {citizenName}\n🎯 Purpose: {purpose}\n📅 Date: {appointmentDate}\n⏰ Time: {appointmentTime}\n\nIs the above information correct?'
          },
          buttons: [
            { id: 'appt_confirm_yes', text: { en: '✅ Confirm Booking' }, nextStep: 'appointment_submitted' },
            { id: 'appt_confirm_no', text: { en: '❌ Cancel' }, nextStep: 'main_menu_en' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'appt_confirm_yes', nextStepId: 'appointment_submitted' },
          { type: 'button_click', value: 'appt_confirm_no', nextStepId: 'main_menu_en' }
        ],
        nextStep: null
      },
      {
        stepId: 'appointment_submitted',
        type: 'message',
        content: {
          text: {
            en: '✅ *Appointment Request Submitted*\n\nYour appointment request has been received.\n\n📄 *Ref No:* `{appointmentId}`\n👤 *Name:* {citizenName}\n📅 *Requested Date:* {appointmentDate}\n⏰ *Requested Time:* {appointmentTime}\n🎯 *Purpose:* {purpose}\n\n⏳ *Status:* {status}\n\nYou will be notified once the appointment is scheduled.'
          }
        },
        nextStep: null
      },
      {
        stepId: 'track_status',
        type: 'collect_input',
        content: {
          text: { en: '🔍 *Track Status*\n\nPlease enter your Reference Number (e.g., GRV00000001 or APT00000001):' },
          inputConfig: { inputType: 'text', saveToField: 'refNumber', validation: { required: true, minLength: 5, maxLength: 30 }, placeholder: 'Reference number' }
        },
        nextStep: 'track_result'
      },
      {
        stepId: 'track_result',
        type: 'message',
        content: {
          text: {
            en: '📄 *Status for Ref: {refNumber}*\n\n*Type:* {recordType}\n*Status:* {status}\n*Assigned to:* {assignedTo}\n\n📝 *Remarks:* {remarks}\n\n_Values are filled from backend when you add an API step to fetch grievance/appointment by ref number._'
          }
        },
        nextStep: null
      },
      {
        stepId: 'rts_service_selection',
        type: 'message',
        content: {
          text: { en: '📋 *Right to Service (RTS)*\n\nRTS services are being configured. Please contact the office or type *Hi* to return to the main menu.' }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'zp-amravati-main-menu',
    name: 'ZP Amaravati – Citizen Services Menu (Starter)',
    description: 'A ready “hi → main menu” starter with ZP-style service buttons (Grievance, Appointment, Track). Pair with the ZP templates below.',
    icon: <MessageSquare className="w-5 h-5" />,
    triggers: [
      { type: 'keyword', value: 'hi', startStepId: 'main_menu' },
      { type: 'keyword', value: 'hello', startStepId: 'main_menu' },
      { type: 'keyword', value: 'start', startStepId: 'main_menu' }
    ],
    steps: [
      {
        stepId: 'main_menu',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🏛️ *Citizen Services Menu*\n\nWelcome to the Zilla Parishad Digital Helpdesk.\n\n👇 *Please select a service:*'
          },
          buttons: [
            { id: 'grievance', text: { en: '📝 File Grievance' }, nextStep: 'handoff_note' },
            { id: 'appointment', text: { en: '📅 Book Appointment' }, nextStep: 'handoff_note' },
            { id: 'track', text: { en: '🔍 Track Status' }, nextStep: 'handoff_note' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'grievance', nextStepId: 'handoff_note' },
          { type: 'button_click', value: 'appointment', nextStepId: 'handoff_note' },
          { type: 'button_click', value: 'track', nextStepId: 'handoff_note' }
        ],
        nextStep: null
      },
      {
        stepId: 'handoff_note',
        type: 'message',
        content: {
          text: {
            en: '✅ Selection received.\n\nIf you imported the matching ZP templates as separate flows, configure triggers like:\n- `button_click: grievance`\n- `button_click: appointment`\n- `button_click: track`\n\nThen assign the correct active flow in WhatsApp settings.'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'zp-amravati-grievance',
    name: 'ZP Amaravati – Grievance Flow (Template)',
    description: 'ZP-style grievance filing skeleton: name → department (auto list) → description → optional photo → confirm.',
    icon: <FileText className="w-5 h-5" />,
    triggers: [
      { type: 'button_click', value: 'grievance', startStepId: 'grievance_start' },
      { type: 'keyword', value: 'grievance', startStepId: 'grievance_start' }
    ],
    steps: [
      {
        stepId: 'grievance_start',
        type: 'message',
        content: {
          text: {
            en: '📝 *Register a Grievance*\n\nYou can file a formal complaint regarding any ZP department.\n\nTo begin, please provide the details as requested.'
          }
        },
        nextStep: 'grievance_name'
      },
      {
        stepId: 'grievance_name',
        type: 'collect_input',
        content: {
          text: {
            en: '👤 *Citizen Identification*\n\nPlease enter your Full Name as it appears on official documents:'
          },
          inputConfig: {
            inputType: 'text',
            saveToField: 'citizenName',
            validation: { required: true, minLength: 2, maxLength: 100 },
            placeholder: 'Enter full name'
          }
        },
        nextStep: 'grievance_category'
      },
      {
        // IMPORTANT: our backend has special handling for stepId === 'grievance_category'
        // to automatically load departments as a WhatsApp list.
        stepId: 'grievance_category',
        type: 'message',
        content: {
          text: {
            en: '🏢 *Department Selection*\n\nPlease select the relevant department:'
          }
        },
        nextStep: 'grievance_description'
      },
      {
        stepId: 'grievance_description',
        type: 'collect_input',
        content: {
          text: {
            en: '✍️ *Grievance Details*\n\nPlease describe your issue in detail.\n\n_Tip: Include date, location, and specific information for faster resolution._'
          },
          inputConfig: {
            inputType: 'text',
            saveToField: 'description',
            validation: { required: true, minLength: 10, maxLength: 1000 },
            placeholder: 'Describe your grievance'
          }
        },
        nextStep: 'grievance_photo'
      },
      {
        stepId: 'grievance_photo',
        type: 'collect_input',
        content: {
          text: {
            en: '📎 *Supporting Evidence (Optional)*\n\nUpload a photo/document to support your grievance.\n\n_Supported formats: JPG, PNG, WEBP, PDF_'
          },
          inputConfig: {
            inputType: 'image',
            saveToField: 'media',
            validation: { required: false },
            placeholder: 'Upload photo'
          }
        },
        nextStep: 'grievance_confirm'
      },
      {
        stepId: 'grievance_confirm',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '📋 *Confirm Submission*\n\n👤 Name: {citizenName}\n🏢 Department: {category}\n📝 Issue: {description}\n\nIs the above information correct?'
          },
          buttons: [
            { id: 'confirm_yes', text: { en: '✅ Submit' }, nextStep: 'grievance_success' },
            { id: 'confirm_no', text: { en: '❌ Cancel' }, nextStep: 'grievance_cancel' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'confirm_yes', nextStepId: 'grievance_success' },
          { type: 'button_click', value: 'confirm_no', nextStepId: 'grievance_cancel' }
        ],
        nextStep: null
      },
      {
        stepId: 'grievance_success',
        type: 'message',
        content: {
          text: {
            en: '✅ *Submitted*\n\nYour grievance details are captured.\n\nNext step: connect this flow to a backend “Create Grievance” API step if you want auto-ticket creation, or keep this as a data-capture flow.'
          }
        },
        nextStep: null
      },
      {
        stepId: 'grievance_cancel',
        type: 'message',
        content: {
          text: {
            en: '❌ Submission cancelled.\n\nType *hi* to return to main menu.'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'zp-amravati-appointment',
    name: 'ZP Amaravati – Appointment Flow (Template)',
    description: 'ZP-style CEO appointment skeleton: name → purpose → preferred date/time → confirm.',
    icon: <CalendarDays className="w-5 h-5" />,
    triggers: [
      { type: 'button_click', value: 'appointment', startStepId: 'appointment_start' },
      { type: 'keyword', value: 'appointment', startStepId: 'appointment_start' }
    ],
    steps: [
      {
        stepId: 'appointment_start',
        type: 'message',
        content: {
          text: {
            en: '📅 *Book an Official Appointment*\n\nSchedule a meeting with the Chief Executive Officer (CEO), Zilla Parishad.\n\nPlease provide the required details to proceed.'
          }
        },
        nextStep: 'appointment_name'
      },
      {
        stepId: 'appointment_name',
        type: 'collect_input',
        content: {
          text: { en: '👤 *Your Name*\n\nPlease enter your Full Name:' },
          inputConfig: {
            inputType: 'text',
            saveToField: 'citizenName',
            validation: { required: true, minLength: 2, maxLength: 100 }
          }
        },
        nextStep: 'appointment_purpose'
      },
      {
        stepId: 'appointment_purpose',
        type: 'collect_input',
        content: {
          text: { en: '🎯 *Purpose of Meeting*\n\nPlease briefly describe the purpose of your meeting:' },
          inputConfig: {
            inputType: 'text',
            saveToField: 'purpose',
            validation: { required: true, minLength: 5, maxLength: 500 }
          }
        },
        nextStep: 'appointment_date'
      },
      {
        stepId: 'appointment_date',
        type: 'collect_input',
        content: {
          text: { en: '📅 *Preferred Date*\n\nPlease type your preferred date (YYYY-MM-DD):' },
          inputConfig: {
            inputType: 'date',
            saveToField: 'appointmentDate',
            validation: { required: true }
          }
        },
        nextStep: 'appointment_time'
      },
      {
        stepId: 'appointment_time',
        type: 'collect_input',
        content: {
          text: { en: '⏰ *Preferred Time*\n\nPlease type your preferred time (e.g., 10:30 AM):' },
          inputConfig: {
            inputType: 'text',
            saveToField: 'appointmentTime',
            validation: { required: true, minLength: 3, maxLength: 50 }
          }
        },
        nextStep: 'appointment_confirm'
      },
      {
        stepId: 'appointment_confirm',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '📋 *Verify Appointment Details*\n\n👤 Name: {citizenName}\n🎯 Purpose: {purpose}\n📅 Date: {appointmentDate}\n⏰ Time: {appointmentTime}\n\nIs the above information correct?'
          },
          buttons: [
            { id: 'appt_confirm_yes', text: { en: '✅ Submit' }, nextStep: 'appointment_success' },
            { id: 'appt_confirm_no', text: { en: '❌ Cancel' }, nextStep: 'appointment_cancel' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'appt_confirm_yes', nextStepId: 'appointment_success' },
          { type: 'button_click', value: 'appt_confirm_no', nextStepId: 'appointment_cancel' }
        ],
        nextStep: null
      },
      {
        stepId: 'appointment_success',
        type: 'message',
        content: {
          text: {
            en: '✅ *Submitted*\n\nYour appointment details are captured.\n\nNext step: connect this flow to a backend “Create Appointment” API step if you want auto-request creation.'
          }
        },
        nextStep: null
      },
      {
        stepId: 'appointment_cancel',
        type: 'message',
        content: {
          text: { en: '❌ Appointment request cancelled.\n\nType *hi* to return to main menu.' }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'zp-amravati-track-status',
    name: 'ZP Amaravati – Track Status (Template)',
    description: 'Collect reference number (GRV/APT) and show a status placeholder. You can attach an API call step to fetch real status.',
    icon: <Search className="w-5 h-5" />,
    triggers: [
      { type: 'button_click', value: 'track', startStepId: 'track_status' },
      { type: 'keyword', value: 'track', startStepId: 'track_status' }
    ],
    steps: [
      {
        stepId: 'track_status',
        type: 'collect_input',
        content: {
          text: { en: '🔍 *Track Status*\n\nPlease enter your Reference Number (e.g., GRV00000001 or APT00000001):' },
          inputConfig: {
            inputType: 'text',
            saveToField: 'refNumber',
            validation: { required: true, minLength: 5, maxLength: 30 },
            placeholder: 'Enter reference number'
          }
        },
        nextStep: 'track_result'
      },
      {
        stepId: 'track_result',
        type: 'message',
        content: {
          text: {
            en: '✅ Reference received: *{refNumber}*\n\nTo show real status, add an API Call step that queries your backend and then prints the result here.'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'language-selection',
    name: 'Language Selection Flow',
    description: 'Start with language selection (English, Hindi, Odia) with conditional routing',
    icon: <Languages className="w-5 h-5" />,
    triggers: [
      { type: 'keyword', value: 'hi', startStepId: 'language_selection' }
    ],
    steps: [
      {
        stepId: 'language_selection',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🇮🇳 *Welcome*\n\nPlease select your preferred language:\n\n👇 *Choose an option:*',
            hi: '🇮🇳 *स्वागत है*\n\nकृपया अपनी पसंदीदा भाषा चुनें:\n\n👇 *एक विकल्प चुनें:*',
            or: '🇮🇳 *ସ୍ୱାଗତ*\n\nଦୟାକରି ଆପଣଙ୍କର ପସନ୍ଦିତ ଭାଷା ବାଛନ୍ତୁ:\n\n👇 *ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ:*'
          },
          buttons: [
            { id: 'lang_en', text: { en: '🇬🇧 English' }, nextStep: 'main_menu_en' },
            { id: 'lang_hi', text: { en: '🇮🇳 हिंदी' }, nextStep: 'main_menu_hi' },
            { id: 'lang_or', text: { en: '🇮🇳 ଓଡ଼ିଆ' }, nextStep: 'main_menu_or' }
          ]
        },
        expectedResponses: [
          { type: 'button_click', value: 'lang_en', nextStepId: 'main_menu_en' },
          { type: 'button_click', value: 'lang_hi', nextStepId: 'main_menu_hi' },
          { type: 'button_click', value: 'lang_or', nextStepId: 'main_menu_or' }
        ],
        nextStep: null
      },
      {
        stepId: 'main_menu_en',
        type: 'interactive_buttons',
        content: {
          text: {
            en: '🏛️ *Main Menu*\n\nWelcome! How can we help you today?\n\n👇 *Select a service:*'
          },
          buttons: [
            { id: 'service_1', text: { en: 'Service 1' }, nextStep: 'service_1_en' },
            { id: 'service_2', text: { en: 'Service 2' }, nextStep: 'service_2_en' }
          ]
        },
        nextStep: null
      },
      {
        stepId: 'main_menu_hi',
        type: 'interactive_buttons',
        content: {
          text: {
            hi: '🏛️ *मुख्य मेनू*\n\nस्वागत है! आज हम आपकी कैसे मदद कर सकते हैं?\n\n👇 *एक सेवा चुनें:*'
          },
          buttons: [
            { id: 'service_1', text: { en: 'सेवा 1' }, nextStep: 'service_1_hi' },
            { id: 'service_2', text: { en: 'सेवा 2' }, nextStep: 'service_2_hi' }
          ]
        },
        nextStep: null
      },
      {
        stepId: 'main_menu_or',
        type: 'interactive_buttons',
        content: {
          text: {
            or: '🏛️ *ମୁଖ୍ୟ ମେନୁ*\n\nସ୍ୱାଗତ! ଆଜି ଆମେ ଆପଣଙ୍କର କିପରି ସାହାଯ୍ୟ କରିପାରିବା?\n\n👇 *ଏକ ସେବା ବାଛନ୍ତୁ:*'
          },
          buttons: [
            { id: 'service_1', text: { en: 'ସେବା 1' }, nextStep: 'service_1_or' },
            { id: 'service_2', text: { en: 'ସେବା 2' }, nextStep: 'service_2_or' }
          ]
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'collect-name',
    name: 'Collect Name',
    description: 'Ask user for their name with validation',
    icon: <User className="w-5 h-5" />,
    triggers: [],
    steps: [
      {
        stepId: 'ask_name',
        type: 'collect_input',
        content: {
          text: {
            en: '👤 *Your Name*\n\nPlease enter your full name:'
          },
          inputConfig: {
            inputType: 'text',
            saveToField: 'citizenName',
            validation: {
              required: true,
              minLength: 3,
              maxLength: 100
            },
            placeholder: 'Enter your full name'
          }
        },
        nextStep: 'confirm_name'
      },
      {
        stepId: 'confirm_name',
        type: 'message',
        content: {
          text: {
            en: '✅ Thank you, {citizenName}! Your name has been saved.'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'collect-photo',
    name: 'Collect Photo',
    description: 'Ask user to upload a photo (stored in Cloudinary)',
    icon: <Camera className="w-5 h-5" />,
    triggers: [],
    steps: [
      {
        stepId: 'ask_photo',
        type: 'collect_input',
        content: {
          text: {
            en: '📷 *Upload Photo*\n\nPlease upload a photo:\n\n_Supported formats: PNG, JPG, WEBP_'
          },
          inputConfig: {
            inputType: 'image',
            saveToField: 'photoUrl',
            validation: {
              required: false
            },
            placeholder: 'Upload your photo'
          }
        },
        nextStep: 'photo_received'
      },
      {
        stepId: 'photo_received',
        type: 'message',
        content: {
          text: {
            en: '✅ Photo uploaded successfully! Your photo has been saved.'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'collect-location',
    name: 'Collect Location',
    description: 'Ask user to share their location (lat/long)',
    icon: <MapPin className="w-5 h-5" />,
    triggers: [],
    steps: [
      {
        stepId: 'ask_location',
        type: 'collect_input',
        content: {
          text: {
            en: '📍 *Share Location*\n\nPlease share your location so we can assist you better.'
          },
          inputConfig: {
            inputType: 'location',
            saveToField: 'location',
            validation: {
              required: true
            },
            placeholder: 'Share your location'
          }
        },
        nextStep: 'location_received'
      },
      {
        stepId: 'location_received',
        type: 'message',
        content: {
          text: {
            en: '✅ Location received! Latitude: {location.latitude}, Longitude: {location.longitude}'
          }
        },
        nextStep: null
      }
    ]
  },
  {
    id: 'complete-form',
    name: 'Complete Form Flow',
    description: 'Collect name, photo, and location in sequence',
    icon: <FileText className="w-5 h-5" />,
    triggers: [],
    steps: [
      {
        stepId: 'ask_name',
        type: 'collect_input',
        content: {
          text: { en: '👤 *Your Name*\n\nPlease enter your full name:' },
          inputConfig: {
            inputType: 'text',
            saveToField: 'citizenName',
            validation: { required: true, minLength: 3 }
          }
        },
        nextStep: 'ask_photo'
      },
      {
        stepId: 'ask_photo',
        type: 'collect_input',
        content: {
          text: { en: '📷 *Upload Photo*\n\nPlease upload a photo:' },
          inputConfig: {
            inputType: 'image',
            saveToField: 'photoUrl',
            validation: { required: false }
          }
        },
        nextStep: 'ask_location'
      },
      {
        stepId: 'ask_location',
        type: 'collect_input',
        content: {
          text: { en: '📍 *Share Location*\n\nPlease share your location:' },
          inputConfig: {
            inputType: 'location',
            saveToField: 'location',
            validation: { required: true }
          }
        },
        nextStep: 'form_complete'
      },
      {
        stepId: 'form_complete',
        type: 'message',
        content: {
          text: { en: '✅ *Form Complete*\n\nThank you! All information has been collected.' }
        },
        nextStep: null
      }
    ]
  }
];

interface FlowTemplatesProps {
  onSelectTemplate: (template: FlowTemplate) => void;
}

export function FlowTemplates({ onSelectTemplate }: FlowTemplatesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">📋 Flow Templates</h3>
        <p className="text-sm text-gray-500">Quick start with pre-built flows</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FLOW_TEMPLATES.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:border-purple-400 transition-all"
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  {template.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{template.steps.length} steps</span>
                <Button size="sm" variant="outline" className="text-xs">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
