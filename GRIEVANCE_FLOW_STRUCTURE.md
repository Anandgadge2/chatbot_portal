# Grievance Flow - Required Structure

## Backend Logic (Already Implemented ✅)

The backend (`dynamicFlowEngine.ts`) already handles:

1. **Grievance Creation** (line 899-979)
   - Triggered when user clicks button with ID `confirm_yes` on a step containing `grievance_confirm`
   - Creates grievance in database
   - Generates unique ID (e.g., GRV000123)
   - Saves to `session.data.grievanceId`

2. **Placeholder Replacement** (line 1027-1043)
   - Replaces `{grievanceId}` with actual ID
   - Replaces `{citizenName}`, `{departmentName}`, `{description}`, etc.
   - Replaces `{date}`, `{time}`, `{companyName}`

3. **Error Handling** (line 1048-1053)
   - Uses `flow.settings.errorFallbackMessage`
   - Default: "We encountered an error. Please try again."

## Required Flow Structure

### Step 1: Grievance Description (userInput)

```json
{
  "id": "grv_desc_hi",
  "type": "userInput",
  "data": {
    "label": "Grievance Description (Hindi)",
    "messageText": "कृपया अपनी शिकायत का विस्तार से वर्णन करें",
    "inputType": "text",
    "saveToField": "description",
    "validation": {
      "required": true,
      "minLength": 10
    }
  }
}
```

### Step 2: Confirmation (buttonMessage) ⚠️ CRITICAL

```json
{
  "id": "grievance_confirm_hi", // Must contain "grievance_confirm"
  "type": "buttonMessage",
  "data": {
    "label": "Confirmation (Hindi)",
    "messageText": "📋 *जमा करने की पुष्टि करें*\\n\\nकृपया अपने विवरण की जांच करें:\\n\\n👤 *नाम:* {citizenName}\\n🏢 *विभाग:* {departmentName}\\n📝 *विवरण:* {description}\\n\\n*क्या यह सही है?*",
    "buttons": [
      {
        "id": "confirm_yes", // Must be exactly "confirm_yes"
        "text": "✅ शिकायत दर्ज करें",
        "type": "quick_reply"
      },
      {
        "id": "confirm_no",
        "text": "❌ रद्द करें",
        "type": "quick_reply"
      }
    ]
  }
}
```

### Step 3: Success Message (textMessage) ⚠️ CRITICAL

```json
{
  "id": "grievance_success_hi", // Must contain "grievance_success"
  "type": "textMessage",
  "data": {
    "label": "Success Message (Hindi)",
    "messageText": "✅ *शिकायत सफलतापूर्वक पंजीकृत!*\\n\\n🎫 *संदर्भ संख्या:* {grievanceId}\\n\\nकलेक्टोरेट झारसुगड़ा ओडिशा सेवाओं का उपयोग करने के लिए धन्यवाद!"
  }
}
```

### Step 4: Cancelled Message (textMessage)

```json
{
  "id": "grievance_cancelled_hi",
  "type": "textMessage",
  "data": {
    "label": "Cancelled (Hindi)",
    "messageText": "🚫 *रद्द*\\n\\nशिकायत पंजीकरण रद्द कर दिया गया है।"
  }
}
```

## Edge Connections Required

```json
{
  "edges": [
    // Description → Confirmation
    {
      "source": "grv_desc_hi",
      "target": "grievance_confirm_hi"
    },
    // Confirmation (Yes) → Success
    {
      "source": "grievance_confirm_hi",
      "target": "grievance_success_hi",
      "sourceHandle": "confirm_yes"
    },
    // Confirmation (No) → Cancelled
    {
      "source": "grievance_confirm_hi",
      "target": "grievance_cancelled_hi",
      "sourceHandle": "confirm_no"
    }
  ]
}
```

## Flow Settings (Optional but Recommended)

```json
{
  "metadata": {
    "settings": {
      "sessionTimeout": 30,
      "enableTypingIndicator": true,
      "enableReadReceipts": true,
      "maxRetries": 3,
      "errorFallbackMessage": "⚠️ हमें एक त्रुटि का सामना करना पड़ा। कृपया बाद में पुन: प्रयास करें।"
    }
  }
}
```

## How It Works

1. User enters description → Saved to `session.data.description`
2. User sees confirmation with all collected data
3. User clicks "✅ शिकायत दर्ज करें" (confirm_yes)
4. Backend detects:
   - Current step ID contains `grievance_confirm`
   - Button ID is `confirm_yes`
   - Next step ID contains `grievance_success`
5. Backend calls `createGrievanceAndSetSession()`:
   - Creates grievance in database
   - Generates ID (e.g., GRV000123)
   - Saves to `session.data.grievanceId`
6. Backend executes success step:
   - Replaces `{grievanceId}` with actual ID
   - Sends message to user

## Testing Checklist

- [ ] Confirmation step ID contains "grievance_confirm"
- [ ] Confirmation has button with ID "confirm_yes"
- [ ] Success step ID contains "grievance_success"
- [ ] Success message includes `{grievanceId}` placeholder
- [ ] All required fields are collected (citizenName, departmentName, description)
- [ ] Error fallback message is set in flow settings
