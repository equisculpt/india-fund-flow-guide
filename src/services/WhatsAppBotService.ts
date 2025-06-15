
export class WhatsAppBotService {
  static async handleIncomingMessage(whatsappMessage: any): Promise<string> {
    const { from, message } = whatsappMessage;

    // Clean and normalize the message
    const cleanMessage = message.toLowerCase().trim();

    // Check if user is in a conversation flow
    const userState = await WhatsAppBotService.getUserState(from);
    
    if (userState.inFlow) {
      return await WhatsAppBotService.handleFlowResponse(from, cleanMessage, userState);
    }

    // Handle main menu commands
    return await WhatsAppBotService.processMainCommand(from, cleanMessage);
  }

  static async processMainCommand(userId: string, message: string): Promise<string> {
    // Handle greetings and main menu
    if (['hi', 'hello', 'hey', 'start', 'menu'].includes(message)) {
      return WhatsAppBotService.getMainMenu();
    }

    // Handle numbered selections
    switch (message) {
      case '1':
        return WhatsAppBotService.startSignupFlow(userId);
      case '2':
        return WhatsAppBotService.showLoginOptions(userId);
      case '3':
        return WhatsAppBotService.showInvestmentOptions(userId);
      case '4':
        return WhatsAppBotService.getPortfolioInfo(userId);
      case '5':
        return WhatsAppBotService.showSIPOptions(userId);
      case '6':
        return WhatsAppBotService.showDailyReturns(userId);
      case '7':
        return WhatsAppBotService.showKYCOptions(userId);
      case '8':
        return WhatsAppBotService.showPaymentOptions(userId);
      case '9':
        return WhatsAppBotService.handleReferrals(userId, 'info');
      case '0':
        return WhatsAppBotService.getHelpMenu();
      default:
        return WhatsAppBotService.handleUnknownCommand(message);
    }
  }

  static getMainMenu(): string {
    return `🌟 *Welcome to SIP Brewery!*\n\n` +
           `Your complete investment platform through WhatsApp.\n\n` +
           `*Main Menu:*\n` +
           `1️⃣ New User Signup\n` +
           `2️⃣ Login to Account\n` +
           `3️⃣ Invest in Mutual Funds\n` +
           `4️⃣ View Portfolio\n` +
           `5️⃣ Manage SIP\n` +
           `6️⃣ Check Daily Returns\n` +
           `7️⃣ Complete KYC\n` +
           `8️⃣ Payment & Deposits\n` +
           `9️⃣ Referral Program\n` +
           `0️⃣ Help & Support\n\n` +
           `Type the number or reply *'menu'* anytime to return here.`;
  }

  static async startSignupFlow(userId: string): Promise<string> {
    await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'name' });
    
    return `📝 *New User Registration*\n\n` +
           `Let's get you started with SIP Brewery! I'll need some basic information.\n\n` +
           `*Step 1 of 5*\n` +
           `Please enter your *full name*:`;
  }

  static async showLoginOptions(userId: string): Promise<string> {
    return `🔐 *Login to Your Account*\n\n` +
           `Choose your login method:\n\n` +
           `*A* - Login with Mobile Number\n` +
           `*B* - Login with Email\n` +
           `*C* - Login with PAN Card\n\n` +
           `Reply with A, B, or C`;
  }

  static async showInvestmentOptions(userId: string): Promise<string> {
    // Check if user is logged in first
    const isLoggedIn = await WhatsAppBotService.checkUserLogin(userId);
    if (!isLoggedIn) {
      return `⚠️ Please login first to access investment options.\n\nType *2* to login or *1* to signup.`;
    }

    return `💰 *Investment Options*\n\n` +
           `*A* - Browse Top Funds\n` +
           `*B* - Start New SIP\n` +
           `*C* - One-time Investment\n` +
           `*D* - Goal-based Investing\n` +
           `*E* - Tax Saving Funds (ELSS)\n\n` +
           `Reply with your choice (A-E)`;
  }

  static getPortfolioInfo(userId: string): string {
    // Mock portfolio data - in real implementation, this would fetch from database
    const portfolioData = {
      totalValue: 156750,
      totalInvested: 120000,
      totalGains: 36750,
      gainPercentage: 30.6,
      todayChange: 2450,
      todayChangePercent: 1.59,
      holdings: [
        {
          name: "HDFC Top 100 Fund",
          currentValue: 31200,
          invested: 25000,
          gains: 6200,
          gainPercentage: 24.8,
          units: 245.67
        },
        {
          name: "SBI Small Cap Fund", 
          currentValue: 42350,
          invested: 35000,
          gains: 7350,
          gainPercentage: 21.0,
          units: 892.45
        },
        {
          name: "Axis Bluechip Fund",
          currentValue: 28900,
          invested: 25000,
          gains: 3900,
          gainPercentage: 15.6,
          units: 567.23
        }
      ]
    };

    return `📊 *Your Portfolio Summary*\n\n` +
           `💰 *Current Value:* ₹${portfolioData.totalValue.toLocaleString()}\n` +
           `📈 *Total Invested:* ₹${portfolioData.totalInvested.toLocaleString()}\n` +
           `🎯 *Total Gains:* ₹${portfolioData.totalGains.toLocaleString()} (+${portfolioData.gainPercentage}%)\n` +
           `📅 *Today's Change:* ₹${portfolioData.todayChange.toLocaleString()} (+${portfolioData.todayChangePercent}%)\n\n` +
           `*📈 Your Holdings:*\n` +
           portfolioData.holdings.map((holding, index) => 
             `${index + 1}. *${holding.name}*\n` +
             `   Current: ₹${holding.currentValue.toLocaleString()} | Units: ${holding.units}\n` +
             `   Gains: ₹${holding.gains.toLocaleString()} (+${holding.gainPercentage}%)\n`
           ).join('\n') +
           `\n*Quick Actions:*\n` +
           `*A* - View detailed fund analysis\n` +
           `*B* - Add more investment\n` +
           `*C* - Redeem funds\n` +
           `*D* - Download statement\n\n` +
           `Reply with your choice or type *menu* for main menu.`;
  }

  static async showSIPOptions(userId: string): Promise<string> {
    const isLoggedIn = await WhatsAppBotService.checkUserLogin(userId);
    if (!isLoggedIn) {
      return `⚠️ Please login first to access SIP options.\n\nType *2* to login.`;
    }

    return `🔄 *SIP Management*\n\n` +
           `*Current SIPs:*\n` +
           `1. HDFC Top 100 Fund - ₹5,000/month (Active)\n` +
           `2. SBI Small Cap Fund - ₹3,000/month (Active)\n` +
           `3. Axis Bluechip Fund - ₹2,500/month (Paused)\n\n` +
           `*SIP Actions:*\n` +
           `*A* - Start New SIP\n` +
           `*B* - Modify Existing SIP\n` +
           `*C* - Pause/Resume SIP\n` +
           `*D* - Stop SIP\n` +
           `*E* - Change SIP Date\n` +
           `*F* - SIP Calculator\n\n` +
           `Reply with your choice (A-F)`;
  }

  static showDailyReturns(userId: string): string {
    const marketData = {
      sensex: { value: 65432, change: 234, changePercent: 0.36 },
      nifty: { value: 19876, change: 89, changePercent: 0.45 },
      topGainers: [
        { name: "HDFC Bank", change: 2.3 },
        { name: "Infosys", change: 1.8 },
        { name: "TCS", change: 1.5 }
      ],
      topLosers: [
        { name: "ONGC", change: -2.1 },
        { name: "Coal India", change: -1.9 }
      ]
    };

    return `📈 *Market Update & Daily Returns*\n\n` +
           `*📊 Market Indices:*\n` +
           `BSE Sensex: ${marketData.sensex.value.toLocaleString()} (+${marketData.sensex.change}, +${marketData.sensex.changePercent}%)\n` +
           `NSE Nifty: ${marketData.nifty.value.toLocaleString()} (+${marketData.nifty.change}, +${marketData.nifty.changePercent}%)\n\n` +
           `*🚀 Top Gainers:*\n` +
           marketData.topGainers.map(stock => `• ${stock.name}: +${stock.change}%`).join('\n') +
           `\n\n*📉 Top Losers:*\n` +
           marketData.topLosers.map(stock => `• ${stock.name}: ${stock.change}%`).join('\n') +
           `\n\n*Your Portfolio Today:*\n` +
           `Total Gain: ₹2,450 (+1.59%)\n` +
           `Best Performer: SBI Small Cap (+2.1%)\n\n` +
           `*Actions:*\n` +
           `*A* - View detailed market analysis\n` +
           `*B* - Set price alerts\n` +
           `*C* - Get fund recommendations\n\n` +
           `Type your choice or *menu* for main menu.`;
  }

  static async showKYCOptions(userId: string): Promise<string> {
    return `📋 *KYC Verification*\n\n` +
           `Complete your KYC to start investing:\n\n` +
           `*Current Status:* Pending\n\n` +
           `*Required Documents:*\n` +
           `✅ PAN Card\n` +
           `⏳ Aadhaar Card\n` +
           `⏳ Bank Statement\n` +
           `⏳ Address Proof\n\n` +
           `*KYC Options:*\n` +
           `*A* - Upload Documents\n` +
           `*B* - Video KYC (Instant)\n` +
           `*C* - Visit Branch\n` +
           `*D* - Check KYC Status\n\n` +
           `Reply with your choice (A-D)`;
  }

  static async showPaymentOptions(userId: string): Promise<string> {
    return `💳 *Payment & Deposits*\n\n` +
           `*Account Balance:* ₹5,000\n\n` +
           `*Payment Options:*\n` +
           `*A* - Add Money to Wallet\n` +
           `*B* - Setup AutoPay for SIP\n` +
           `*C* - Payment History\n` +
           `*D* - Update Bank Details\n` +
           `*E* - Generate Payment Link\n` +
           `*F* - Tax Certificates\n\n` +
           `*Supported Methods:*\n` +
           `• UPI (Google Pay, PhonePe, Paytm)\n` +
           `• Net Banking\n` +
           `• Debit Cards\n\n` +
           `Reply with your choice (A-F)`;
  }

  static async handleFlowResponse(userId: string, message: string, userState: any): Promise<string> {
    const { flowType, step } = userState;

    if (flowType === 'signup') {
      return await WhatsAppBotService.handleSignupFlow(userId, message, step);
    } else if (flowType === 'investment') {
      return await WhatsAppBotService.handleInvestmentFlow(userId, message, step);
    } else if (flowType === 'sip') {
      return await WhatsAppBotService.handleSIPFlow(userId, message, step);
    }

    return "Something went wrong. Type *menu* to return to main menu.";
  }

  static async handleSignupFlow(userId: string, message: string, step: string): Promise<string> {
    switch (step) {
      case 'name':
        await WhatsAppBotService.saveUserData(userId, 'name', message);
        await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'email' });
        return `✅ Name saved: ${message}\n\n*Step 2 of 5*\nPlease enter your *email address*:`;

      case 'email':
        if (!WhatsAppBotService.isValidEmail(message)) {
          return `❌ Invalid email format. Please enter a valid email address:`;
        }
        await WhatsAppBotService.saveUserData(userId, 'email', message);
        await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'pan' });
        return `✅ Email saved: ${message}\n\n*Step 3 of 5*\nPlease enter your *PAN number*:`;

      case 'pan':
        if (!WhatsAppBotService.isValidPAN(message)) {
          return `❌ Invalid PAN format. Please enter a valid PAN (e.g., ABCDE1234F):`;
        }
        await WhatsAppBotService.saveUserData(userId, 'pan', message);
        await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'dob' });
        return `✅ PAN saved: ${message}\n\n*Step 4 of 5*\nPlease enter your *date of birth* (DD/MM/YYYY):`;

      case 'dob':
        if (!WhatsAppBotService.isValidDate(message)) {
          return `❌ Invalid date format. Please enter date as DD/MM/YYYY:`;
        }
        await WhatsAppBotService.saveUserData(userId, 'dob', message);
        await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'confirm' });
        const userData = await WhatsAppBotService.getUserData(userId);
        return `✅ Date of birth saved: ${message}\n\n*Step 5 of 5 - Confirmation*\n\n` +
               `Please confirm your details:\n` +
               `📱 Mobile: ${userId}\n` +
               `👤 Name: ${userData.name}\n` +
               `📧 Email: ${userData.email}\n` +
               `🆔 PAN: ${userData.pan}\n` +
               `📅 DOB: ${userData.dob}\n\n` +
               `Type *CONFIRM* to complete registration or *EDIT* to modify details.`;

      case 'confirm':
        if (message === 'confirm') {
          await WhatsAppBotService.completeSignup(userId);
          await WhatsAppBotService.clearUserState(userId);
          return `🎉 *Registration Successful!*\n\n` +
                 `Welcome to SIP Brewery family! Your account has been created.\n\n` +
                 `*Next Steps:*\n` +
                 `1️⃣ Complete KYC verification\n` +
                 `2️⃣ Add money to start investing\n` +
                 `3️⃣ Choose your first investment\n\n` +
                 `Type *menu* to access all features.`;
        } else if (message === 'edit') {
          await WhatsAppBotService.setUserState(userId, { inFlow: true, flowType: 'signup', step: 'name' });
          return `Let's start over. Please enter your *full name*:`;
        } else {
          return `Please type *CONFIRM* to complete registration or *EDIT* to modify details.`;
        }

      default:
        await WhatsAppBotService.clearUserState(userId);
        return `Something went wrong. Type *menu* to return to main menu.`;
    }
  }

  static async handleReferrals(userId: string, action: string): Promise<string> {
    if (action === 'info') {
      const referralCode = await WhatsAppBotService.generateReferralCode(userId);
      return `🎁 *Referral Program*\n\n` +
             `*Your Referral Code:* ${referralCode}\n\n` +
             `*How it works:*\n` +
             `• Share your code with friends\n` +
             `• They get ₹500 signup bonus\n` +
             `• You earn ₹250 per referral\n` +
             `• Plus 0.1% commission on their investments\n\n` +
             `*Your Referral Stats:*\n` +
             `👥 Total Referrals: 8\n` +
             `💰 Total Earnings: ₹3,200\n` +
             `⏳ Pending: ₹500\n\n` +
             `*Actions:*\n` +
             `*A* - Share referral link\n` +
             `*B* - View referral history\n` +
             `*C* - Withdraw earnings\n\n` +
             `Type your choice (A-C)`;
    }
    
    const referralCode = await WhatsAppBotService.generateReferralCode(userId);
    return `Your referral code is: ${referralCode}`;
  }

  static getHelpMenu(): string {
    return `🆘 *Help & Support*\n\n` +
           `*Quick Help:*\n` +
           `*A* - How to invest?\n` +
           `*B* - How to start SIP?\n` +
           `*C* - KYC process\n` +
           `*D* - Payment issues\n` +
           `*E* - Account problems\n\n` +
           `*Contact Support:*\n` +
           `📞 Call: 1800-123-4567\n` +
           `📧 Email: support@sipbrewery.com\n` +
           `🕒 Hours: 9 AM - 6 PM (Mon-Sat)\n\n` +
           `*Legal:*\n` +
           `*F* - Terms & Conditions\n` +
           `*G* - Privacy Policy\n` +
           `*H* - Risk Disclosure\n\n` +
           `Type your choice or *menu* for main menu.`;
  }

  static handleUnknownCommand(message: string): string {
    return `❓ Sorry, I didn't understand "${message}"\n\n` +
           `Here's what you can do:\n` +
           `• Type *menu* for main options\n` +
           `• Type *help* for assistance\n` +
           `• Use numbers 1-9 for quick actions\n\n` +
           `Or try asking:\n` +
           `• "Show my portfolio"\n` +
           `• "Start new SIP"\n` +
           `• "Check market updates"\n` +
           `• "Help with investment"`;
  }

  // Utility functions
  static async getUserState(userId: string): Promise<any> {
    // In real implementation, this would fetch from database
    return { inFlow: false };
  }

  static async setUserState(userId: string, state: any): Promise<void> {
    // In real implementation, this would save to database
    console.log(`Setting user state for ${userId}:`, state);
  }

  static async clearUserState(userId: string): Promise<void> {
    // In real implementation, this would clear from database
    console.log(`Clearing user state for ${userId}`);
  }

  static async saveUserData(userId: string, field: string, value: string): Promise<void> {
    // In real implementation, this would save to database
    console.log(`Saving ${field} for ${userId}: ${value}`);
  }

  static async getUserData(userId: string): Promise<any> {
    // In real implementation, this would fetch from database
    return {
      name: "John Doe",
      email: "john@example.com",
      pan: "ABCDE1234F",
      dob: "01/01/1990"
    };
  }

  static async completeSignup(userId: string): Promise<void> {
    // In real implementation, this would create user account
    console.log(`Completing signup for ${userId}`);
  }

  static async checkUserLogin(userId: string): Promise<boolean> {
    // In real implementation, this would check database
    return true; // Mock authenticated state
  }

  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPAN(pan: string): boolean {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
  }

  static isValidDate(date: string): boolean {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(date);
  }

  static async generateReferralCode(userId: string): Promise<string> {
    // Generate a unique referral code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `SB${userId.substring(0, 3).toUpperCase()}${code}`;
  }
}
