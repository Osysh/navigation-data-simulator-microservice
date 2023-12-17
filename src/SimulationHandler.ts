import path from "path";
import { Server } from "http";
import { Socket } from "./Socket";
import { ManageFiles } from "./ManageFiles";
import { SimulationGenerator } from "./SimulationGenerator";
import { DataToSend } from "./types";
import { isEmptyObject } from "./utils/isEmptyObject";

export class SimulationHandler {
  private socket: Socket;
  private isSendingData: boolean = false;
  private followingIndex: number = 0;
  private outputFilePath: string | undefined;
  private simulationDataList: DataToSend = {};
  private refreshInterval: number = 10; // default to 10 seconds

  constructor(private server: Server) {
    this.socket = new Socket(server);
    this.socket.initConnection();
  }

  private onGenerateDataEvent() {
    try {
      const simulationData = ManageFiles.readInputFile(path.resolve(__dirname, '../config/input.yml'));
      this.refreshInterval = simulationData.settings.rafraichissement; // in second
  
      const simulationGenerator = new SimulationGenerator();
      const processedRoutes = simulationGenerator.processRoutes(simulationData.mobile, this.refreshInterval);
      const { isWrittenInOutputFile, outputFilePath } = ManageFiles.writeRoutesToOutput(path.resolve(__dirname, '../output'), JSON.stringify(processedRoutes));

      if (!isWrittenInOutputFile) {
        throw new Error('Error during data processing');
      }

      this.outputFilePath = outputFilePath;
    } catch (error) {
      console.error('Error during data processing:', error);
    }
  }

  private getOutputData() {
    if (!this.outputFilePath) {
      this.onGenerateDataEvent();
    }
    
    if (isEmptyObject(this.simulationDataList)) {
      this.simulationDataList = JSON.parse(ManageFiles.readOutputFile(this.outputFilePath as string));
    }
  }

  public onSocket() {
    console.log('err')
    this.isSendingData = true;
    this.getOutputData();
    
    const simulationDataList = SimulationGenerator.convertToSortedTable(this.simulationDataList, this.refreshInterval);
  
    const sendNextData = () => {
      if (this.followingIndex < simulationDataList.length && this.isSendingData) {
        this.socket.sendData(simulationDataList[this.followingIndex]);
        this.followingIndex++;
        
        setTimeout(sendNextData, this.refreshInterval * 1000);
      }
    };
  
    sendNextData(); 
  };

  public stopSocketLoop() {
    this.isSendingData = false;
  }
}
