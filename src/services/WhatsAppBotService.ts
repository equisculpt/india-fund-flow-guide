
interface WhatsAppMessage {
  from: string;
  message: string;
  timestamp: number;
}

interface UserSession {
  userId: string;
  currentFlow: string;
  stepNumber: number;
  userData: any;
  lastActivity: number;
}

export class WhatsAppBotService {
  private static sessions = new Map<string, UserSession>();

  static async handleIncomingMessage(message: WhatsAppMessage): Promise<string> {
    const session = this.getOrCreateSession(message.from);
    const userMessage = message.message.toLowerCase().trim();

    // Main menu handling
    if (userMessage === 'hi' || userMessage === 'hello' || userMessage === 'menu') {
      return this.getMainMenu(session);
    }

    // Route to appropriate flow based on current session state
    switch (session.currentFlow) {
      case 'onboarding':
        return this.handleOnboarding(userMessage, session);
      case 'portfolio':
        return this.handlePortfolioQuery(userMessage, session);
      case 'investment':
        return this.handleInvestment(userMessage, session);
      case 'sip_management':
        return this.handleSIPManagement(userMessage, session);
      case 'kyc':
        return this.handleKYC(userMessage, session);
      default:
        return this.handleMenuSelection(userMessage, session);
    }
  }

  private static getOrCreateSession(phoneNumber: string): UserSession {
    if (!this.sessions.has(phoneNumber)) {
      this.sessions.set(phoneNumber, {
        userId: phoneNumber,
        currentFlow: 'main_menu',
        stepNumber: 0,
        userData: {},
        lastActivity: Date.now()
      });
    }
    const session = this.sessions.get(phoneNumber)!;
    session.lastActivity = Date.now();
    return session;
  }

  private static getMainMenu(session: UserSession): string {
    session.currentFlow = 'main_menu';
    session.stepNumber = 0;
    
    return `🌟 *Welcome to SIP Brewery!*\n\n` +
           `Choose an option by sending the number:\n\n` +
           `1️⃣ *New User Onboarding*\n` +
           `2️⃣ *View Portfolio*\n` +
           `3️⃣ *Make Investment*\n` +
           `4️⃣ *Manage SIP*\n` +
           `5️⃣ *Complete KYC*\n` +
           `6️⃣ *Generate Payment Link*\n` +
           `7️⃣ *Get Investment Advice*\n` +
           `8️⃣ *Referral Program*\n\n` +
           `Type *menu* anytime to return here.`;
  }

  private static handleMenuSelection(userMessage: string, session: UserSession): string {
    switch (userMessage) {
      case '1':
        session.currentFlow = 'onboarding';
        session.stepNumber = 1;
        return `🚀 *Welcome to Onboarding!*\n\n` +
               `Let's get you started with mutual fund investing.\n\n` +
               `First, please share your *full name*:`;

      case '2':
        session.currentFlow = 'portfolio';
        return this.getPortfolioInfo(session);

      case '3':
        session.currentFlow = 'investment';
        session.stepNumber = 1;
        return `💰 *Investment Options*\n\n` +
               `Choose investment type:\n` +
               `A) SIP (Systematic Investment Plan)\n` +
               `B) Lump Sum Investment\n\n` +
               `Reply with A or B:`;

      case '4':
        session.currentFlow = 'sip_management';
        return this.getSIPManagementOptions();

      case '5':
        session.currentFlow = 'kyc';
        session.stepNumber = 1;
        return `📋 *KYC Verification*\n\n` +
               `For KYC, I'll need:\n` +
               `• PAN Card photo\n` +
               `• Aadhaar Card photo\n` +
               `• Bank statement\n` +
               `• Selfie\n\n` +
               `Please share your *PAN number* first:`;

      case '6':
        return this.generatePaymentLink(session);

      case '7':
        return this.getInvestmentAdvice(session);

      case '8':
        return this.getReferralInfo(session);

      default:
        return `❌ Invalid option. Please choose a number from 1-8 or type *menu* for options.`;
    }
  }

  private static handleOnboarding(userMessage: string, session: UserSession): string {
    switch (session.stepNumber) {
      case 1:
        session.userData.name = userMessage;
        session.stepNumber = 2;
        return `Great! Nice to meet you *${userMessage}*.\n\n` +
               `Now, please share your *email address*:`;

      case 2:
        if (!this.isValidEmail(userMessage)) {
          return `❌ Please enter a valid email address:`;
        }
        session.userData.email = userMessage;
        session.stepNumber = 3;
        return `📱 Please share your *phone number* (with country code):`;

      case 3:
        session.userData.phone = userMessage;
        session.stepNumber = 4;
        return `🎂 Please share your *date of birth* (DD/MM/YYYY):`;

      case 4:
        session.userData.dob = userMessage;
        session.stepNumber = 5;
        return `🎯 What's your *investment goal*?\n\n` +
               `A) Wealth Creation\n` +
               `B) Tax Saving\n` +
               `C) Retirement Planning\n` +
               `D) Child Education\n\n` +
               `Reply with A, B, C, or D:`;

      case 5:
        const goals = { A: 'Wealth Creation', B: 'Tax Saving', C: 'Retirement Planning', D: 'Child Education' };
        session.userData.goal = goals[userMessage.toUpperCase() as keyof typeof goals] || userMessage;
        session.currentFlow = 'main_menu';
        
        return `✅ *Onboarding Complete!*\n\n` +
               `📊 *Your Profile:*\n` +
               `Name: ${session.userData.name}\n` +
               `Email: ${session.userData.email}\n` +
               `Goal: ${session.userData.goal}\n\n` +
               `🎉 You're all set! You can now:\n` +
               `• Start investing\n` +
               `• Complete KYC\n` +
               `• View recommended funds\n\n` +
               `Type *menu* to see all options.`;

      default:
        return this.getMainMenu(session);
    }
  }

  private static handlePortfolioQuery(userMessage: string, session: UserSession): string {
    // Mock portfolio data - in real implementation, fetch from Supabase
    return `📈 *Your Portfolio Summary*\n\n` +
           `💰 *Total Investment:* ₹45,000\n` +
           `📊 *Current Value:* ₹52,350\n` +
           `📈 *Total Returns:* ₹7,350 (16.33%)\n\n` +
           `🏢 *Your Funds:*\n` +
           `• HDFC Top 100 Fund: ₹20,000 → ₹23,500\n` +
           `• SBI Small Cap Fund: ₹15,000 → ₹18,200\n` +
           `• ICICI Prudential Bluechip: ₹10,000 → ₹10,650\n\n` +
           `💡 *AI Recommendation:*\n` +
           `Consider switching 20% of Small Cap to Large Cap for better stability.\n\n` +
           `Type *menu* for more options.`;
  }

  private static handleInvestment(userMessage: string, session: UserSession): string {
    switch (session.stepNumber) {
      case 1:
        if (userMessage.toLowerCase() === 'a') {
          session.userData.investmentType = 'SIP';
          session.stepNumber = 2;
          return `📅 *SIP Frequency:*\n\n` +
                 `A) Monthly\n` +
                 `B) Quarterly\n` +
                 `C) Yearly\n\n` +
                 `Reply with A, B, or C:`;
        } else if (userMessage.toLowerCase() === 'b') {
          session.userData.investmentType = 'Lump Sum';
          session.stepNumber = 3;
          return `💰 Enter investment amount (minimum ₹1000):`;
        }
        return `Please reply with A for SIP or B for Lump Sum.`;

      case 2:
        const frequencies = { A: 'Monthly', B: 'Quarterly', C: 'Yearly' };
        session.userData.frequency = frequencies[userMessage.toUpperCase() as keyof typeof frequencies];
        session.stepNumber = 3;
        return `💰 Enter SIP amount (minimum ₹500):`;

      case 3:
        const amount = parseInt(userMessage);
        if (amount < 500) {
          return `❌ Minimum amount is ₹500. Please enter a valid amount:`;
        }
        session.userData.amount = amount;
        session.stepNumber = 4;
        return `🏢 *Top Recommended Funds:*\n\n` +
               `A) HDFC Top 100 Fund (Large Cap)\n` +
               `B) SBI Small Cap Fund (Small Cap)\n` +
               `C) ICICI Prudential Bluechip (Large Cap)\n` +
               `D) Axis Long Term Equity (ELSS)\n\n` +
               `Choose A, B, C, or D:`;

      case 4:
        const funds = {
          A: 'HDFC Top 100 Fund',
          B: 'SBI Small Cap Fund', 
          C: 'ICICI Prudential Bluechip',
          D: 'Axis Long Term Equity'
        };
        session.userData.selectedFund = funds[userMessage.toUpperCase() as keyof typeof funds];
        
        const paymentLink = this.generateSecurePaymentLink(session);
        session.currentFlow = 'main_menu';
        
        return `✅ *Investment Summary*\n\n` +
               `Fund: ${session.userData.selectedFund}\n` +
               `Type: ${session.userData.investmentType}\n` +
               `Amount: ₹${session.userData.amount}\n` +
               `${session.userData.frequency ? `Frequency: ${session.userData.frequency}` : ''}\n\n` +
               `💳 *Payment Link:*\n${paymentLink}\n\n` +
               `Click the link to complete payment. Your investment will start immediately after payment.\n\n` +
               `Type *menu* for more options.`;

      default:
        return this.getMainMenu(session);
    }
  }

  private static handleSIPManagement(userMessage: string, session: UserSession): string {
    return `🔧 *SIP Management*\n\n` +
           `Current SIPs:\n` +
           `• HDFC Top 100: ₹2,000/month\n` +
           `• SBI Small Cap: ₹1,500/month\n\n` +
           `Options:\n` +
           `A) Increase SIP amount\n` +
           `B) Decrease SIP amount\n` +
           `C) Pause SIP\n` +
           `D) Stop SIP\n\n` +
           `Reply with A, B, C, or D:`;
  }

  private static handleKYC(userMessage: string, session: UserSession): string {
    switch (session.stepNumber) {
      case 1:
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userMessage.toUpperCase())) {
          return `❌ Invalid PAN format. Please enter a valid PAN number (e.g., ABCDE1234F):`;
        }
        session.userData.pan = userMessage.toUpperCase();
        session.stepNumber = 2;
        return `📸 Great! Now please *send a photo* of your PAN card.\n\nAfter sending the photo, type "next" to continue.`;

      case 2:
        if (userMessage === 'next') {
          session.stepNumber = 3;
          return `🆔 Now please share your *Aadhaar number* (12 digits):`;
        }
        return `Please send PAN card photo first, then type "next".`;

      case 3:
        if (!/^[0-9]{12}$/.test(userMessage)) {
          return `❌ Invalid Aadhaar number. Please enter 12 digits:`;
        }
        session.userData.aadhaar = userMessage;
        session.stepNumber = 4;
        return `📸 Please *send a photo* of your Aadhaar card.\n\nAfter sending, type "next" to continue.`;

      case 4:
        if (userMessage === 'next') {
          session.currentFlow = 'main_menu';
          return `✅ *KYC Submitted Successfully!*\n\n` +
                 `📋 Documents received:\n` +
                 `• PAN Card ✓\n` +
                 `• Aadhaar Card ✓\n\n` +
                 `⏳ Verification usually takes 24-48 hours.\n` +
                 `You'll receive a confirmation message once approved.\n\n` +
                 `Type *menu* for more options.`;
        }
        return `Please send Aadhaar card photo first, then type "next".`;

      default:
        return this.getMainMenu(session);
    }
  }

  private static getSIPManagementOptions(): string {
    return `🔧 *SIP Management*\n\n` +
           `Your Active SIPs:\n` +
           `💼 HDFC Top 100: ₹2,000/month\n` +
           `💼 SBI Small Cap: ₹1,500/month\n\n` +
           `What would you like to do?\n` +
           `A) Increase SIP amount\n` +
           `B) Decrease SIP amount\n` +
           `C) Pause SIP (temporary)\n` +
           `D) Stop SIP (permanent)\n\n` +
           `Reply with A, B, C, or D:`;
  }

  private static generatePaymentLink(session: UserSession): string {
    const paymentId = Math.random().toString(36).substr(2, 9);
    return `💳 *Generate Payment Link*\n\n` +
           `Enter amount: ₹____\n\n` +
           `Example: For ₹5000, just type: 5000\n\n` +
           `I'll create a secure payment link for you.`;
  }

  private static generateSecurePaymentLink(session: UserSession): string {
    const paymentId = Math.random().toString(36).substr(2, 9);
    return `https://sipbrewery.com/pay/${paymentId}`;
  }

  private static getInvestmentAdvice(session: UserSession): string {
    return `🧠 *AI Investment Advisor*\n\n` +
           `Based on current market analysis:\n\n` +
           `📈 *Trending Sectors:*\n` +
           `• Technology: +12% this month\n` +
           `• Healthcare: +8% this month\n` +
           `• Banking: +5% this month\n\n` +
           `💡 *Personalized Recommendations:*\n` +
           `• Consider increasing Large Cap exposure\n` +
           `• Good time for SIP in Small Cap funds\n` +
           `• ELSS funds for tax benefits\n\n` +
           `📊 *Market Outlook:* Positive for next 6 months\n\n` +
           `Type *3* to start investing or *menu* for options.`;
  }

  private static getReferralInfo(session: UserSession): string {
    const referralCode = `BREW${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    return `🎁 *Referral Program*\n\n` +
           `Your Referral Code: *${referralCode}*\n\n` +
           `📈 *Earnings:*\n` +
           `• 1% commission on friend's investments\n` +
           `• ₹500 bonus for each successful referral\n\n` +
           `👥 *Your Stats:*\n` +
           `• Referrals: 3\n` +
           `• Earnings: ₹2,450\n\n` +
           `Share this message with friends:\n` +
           `"Join SIP Brewery with my code ${referralCode} and start investing in mutual funds! 🚀"\n\n` +
           `Type *menu* for more options.`;
  }

  private static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static async sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
    // In real implementation, integrate with WhatsApp Business API
    console.log(`Sending to ${to}: ${message}`);
    return true;
  }

  static clearInactiveSessions(): void {
    const now = Date.now();
    const timeout = 30 * 60 * 1000; // 30 minutes

    for (const [phoneNumber, session] of this.sessions.entries()) {
      if (now - session.lastActivity > timeout) {
        this.sessions.delete(phoneNumber);
      }
    }
  }
}
