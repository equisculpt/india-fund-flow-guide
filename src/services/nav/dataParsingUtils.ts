
export class DataParsingUtils {
  static parseHistoricalData(data: any): Array<{ date: string; nav: number }> {
    try {
      if (!data) {
        console.warn('No historical data provided. Returning empty array.');
        return [];
      }
  
      // Check if data is already in the correct format
      if (Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null && 'date' in item && 'nav' in item)) {
        return data as Array<{ date: string; nav: number }>;
      }
  
      // Attempt to parse the data as JSON if it's a string
      let parsedData;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing historical data JSON:', parseError);
          return [];
        }
      } else {
        parsedData = data;
      }
  
      // Check if the parsed data is an array
      if (!Array.isArray(parsedData)) {
        console.error('Historical data is not an array after parsing.');
        return [];
      }
  
      // Map the parsed data to the expected format
      const historicalData = parsedData.map((item: any) => {
        if (typeof item === 'object' && item !== null && 'date' in item && 'nav' in item) {
          return {
            date: item.date,
            nav: Number(item.nav)
          };
        } else {
          console.warn('Invalid historical data item:', item);
          return null;
        }
      }).filter((item: any) => item !== null); // Remove invalid items
  
      return historicalData as Array<{ date: string; nav: number }>;
    } catch (error) {
      console.error('Error parsing historical data:', error);
      return [];
    }
  }
}
