import fs from 'fs';
import { DataToSend, Mobile, Simu } from './types';
import yaml from 'yaml';

export class ManageFiles {
  constructor() {  }

  public static readInputFile(filePath: string): Simu {
    try {
      const file = fs.readFileSync(filePath, 'utf8');
      return yaml.parse(file) as Simu;
    } catch (error) {
      console.error('Error reading input file:', error);
      throw error; // Re-throw the error to handle it outside
    }
  }
  
  public static readOutputFile(filePath: string): string {
    try {
      const file = fs.readFileSync(filePath, 'utf8');
      return yaml.parse(file) as string;
    } catch (error) {
      console.error('Error reading output file:', error);
      throw error; // Re-throw the error to handle it outside
    }
  }

  public static writeRoutesToOutput(inputFilePath: string, data: any): { isWrittenInOutputFile: boolean, outputFilePath: string } {
    const currentDate = new Date().toISOString().replace(/:/g, '-').replace(/\..*$/, '');
    const outputFilePath = `${inputFilePath}/output-${currentDate}.yaml`;
    
    let isWrittenInOutputFile = false;
  
    try {
      // Convert JSON object to YAML
      const yamlData = yaml.stringify(data);
  
      // Write the YAML data to the output file
      fs.writeFileSync(outputFilePath, yamlData, 'utf8');
  
      console.log(`Conversion completed. YAML data saved to ${outputFilePath}`);
      isWrittenInOutputFile = true;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  
    return { isWrittenInOutputFile, outputFilePath };
  }
}
