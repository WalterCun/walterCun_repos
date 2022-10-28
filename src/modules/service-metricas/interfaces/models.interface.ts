export interface ModelResponse {
    id: number; 
    name: string; 
    tribu: string; 
    organizacion: string;
    coverage: string; 
    codeSmells: number; 
    bugs: number; 
    vulnerabilities: number; 
    hotspots: number;
    verificationState: string; 
    state: string;
  }