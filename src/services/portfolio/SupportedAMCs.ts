
import { AMCParserFactory } from './AMCParserFactory';

export class SupportedAMCsManager {
  // Get list of supported AMCs
  static getSupportedAMCs(): string[] {
    return AMCParserFactory.getAllSupportedAMCs();
  }

  // Check if AMC is supported
  static isAMCSupported(amcName: string): boolean {
    return this.getSupportedAMCs().includes(amcName);
  }

  // Get parser capabilities for an AMC
  static getAMCCapabilities(amcName: string): {
    supportsExcel: boolean;
    supportsPDF: boolean;
    supportsMultipleTabs: boolean;
  } {
    const supportedAMCs = this.getSupportedAMCs();
    const isSupported = supportedAMCs.includes(amcName);

    return {
      supportsExcel: isSupported,
      supportsPDF: isSupported,
      supportsMultipleTabs: isSupported
    };
  }
}
