# HOPE Heals San Antonio Website

## Overview
A professional, mobile-first website for HOPE Heals San Antonio, a coalition of persons with lived experience dedicated to capacity building, supportive services, and advocacy for unsheltered populations in San Antonio.

## Project Structure
```
/
├── index.html          # Main HTML file with all sections
├── style.css           # Responsive CSS with mobile-first design
├── script.js           # JavaScript for interactivity, QR code, forms
├── assets/
│   └── images/         # Image assets (18 unique photos - all utilized)
│       ├── hope-heals-sa-logo.png           # Main logo with text
│       ├── hope-heals-sa-icon.png           # Icon-only logo (favicon)
│       ├── hope-heals-sa-logo-alt.jpg       # Alternative logo
│       ├── hope-heals-sa-doodle-logo.png    # Creative doodle logo
│       ├── hope-heals-sa-coalition-meeting.jpg
│       ├── hope-heals-sa-coalition-group.jpg
│       ├── hope-heals-sa-team-photo.jpg
│       ├── hope-heals-sa-mlk-event.jpg
│       ├── hope-heals-sa-dinner-event.jpg
│       ├── hope-heals-sa-donell-portrait.jpg
│       ├── hope-heals-sa-mhm-convening.jpg
│       ├── hope-heals-sa-community-outreach.jpg
│       ├── hope-heals-sa-team-planning.jpg
│       ├── hope-heals-sa-case-management.jpg
│       ├── hope-heals-sa-first-pres-event.jpg
│       ├── hope-heals-sa-driver-diagram.jpg
│       ├── hope-heals-sa-whiteboard-strategy.jpg
│       └── hope-heals-sa-whiteboard-planning.jpg
└── replit.md           # This documentation file
```

## Brand Identity
- **HOPE Acronym**: Having Only Positive Expectations
- **Values**: Humility, Respect, Collaboration
- **Colors**: Deep Navy (#1a365d), Slate Gray (#64748b), Clean White
- **Fonts**: Merriweather (headings), Open Sans (body)
- **Aesthetic**: Faith & Community - authoritative, modern, compassionate
- **Favicon**: Icon-only version of hands/heart logo

## Key Features
- **Functional QR Code**: Dynamically generated using qrcode.js, links to #involved section
- **Thank You Modal**: Clean popup with exact message: "Thank you for your commitment to HOPE Heals San Antonio. We will reach out to you soon regarding the next steps for your contribution."
- **16-Image Gallery**: Responsive grid with 6 captioned images, all 18 assets utilized across site
- **Mobile-First Design**: 2 cols mobile, 3 cols tablet, 4 cols desktop

## Site Sections
1. **Home**: Hero with HOPE acronym, impact counter, and CTA
2. **Our Story**: Logo featured prominently, mission, aim, values, and leadership
3. **The Coalition**: Four pillars - Immediate Outreach, Intervention, Advocacy, Education
4. **Impact Gallery**: 16 unique photos in responsive grid with captions
5. **Get Involved**: Donors, Volunteers, Partners + Pledge form with QR code
6. **Contact**: Contact form with Google Workspace-ready footer

## Gallery Images with Captions (First 6)
1. Coalition Meeting
2. Community Dinner at First Pres
3. Lived Experience Leadership (Donell)
4. MHM Convening
5. Coalition Team
6. Street Outreach

## Driver Diagram Pillars
1. **Immediate Outreach**: Connect individuals to mental and physical resources
2. **Intervention**: Street case management and social network building
3. **Advocacy**: Policy change, ID recovery, community awareness
4. **Education**: Success stories, financial literacy, public awareness

## Key Partners
SA Hope Center, All Wellness Center, First Presbyterian Church, Broken Warriors Angels, Life Restored, Mental Health Department, KRL Staff, STCH Ministries

## Language Guidelines
**DO USE**: Capacity Building, Supportive Services, Advocacy, Community Training, Lived Experience
**DO NOT**: Claim to be a housing provider

## Technical Details
- QR Code: Static image at `assets/images/qr-get-involved.png` (placeholder URL)
- Thank You Modal: CSS-animated popup with heart icon
- Pledge Form: Logs all lead data to browser console for demo purposes
- All images have descriptive alt text for accessibility
- SEO optimized metadata for "San Antonio Nonprofit Coalition"

## Running the Project
Static files served via Python HTTP server on port 5000.

## How to Update QR Code When Domain is Ready
When you purchase hopehealssa.org, run this command in the Shell to regenerate the QR code:
```bash
qrencode -o assets/images/qr-get-involved.png -s 10 -m 2 --foreground=1a365d --background=ffffff "https://hopehealssa.org/#involved"
```

## Demo: Viewing Lead Captures
To see pledge form submissions during a demo:
1. Open the website in a browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to the Console tab
4. Submit a pledge - you'll see full lead data logged with timestamp

## Future Enhancements
- Connect pledge form to email collection service (Mailchimp, etc.)
- Add payment processing when bank account is ready (Stripe integration)
- Update QR code with final domain URL
