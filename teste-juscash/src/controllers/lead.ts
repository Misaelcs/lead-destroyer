import { APIClient } from './apiClient';

export interface Lead {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  flHonSucumbenciais: boolean;
  flHonContratuais: boolean;
  flHonDativos: boolean;
  flCreditoAutor: boolean;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export interface LeadCollection {
  leads: Lead[];
}

export interface LeadCollectionByStatus {
  statusName: string;
  itemsList: Lead[];
}

export class LeadController extends APIClient{
  private statusList = ['Cliente em Potencial', 'Dados Confirmados', 'Análise do Lead'];
  constructor() {
    super('lead');

  }

  private validateTelephone(telephone: string): boolean {
    return /^(\d{10}|\d{11})$/.test(telephone);
  }

  read(id: number = -1): Object | LeadCollection {
    const rawLead = super.get(id);

    if(rawLead as LeadCollection)
      return rawLead as LeadCollection
    else
      throw Error("The data retrieved doesn't match a Lead Collection type");
  }

  validateLeadList(rawLead: any): Lead[] {
    return rawLead;
  }

  validateLead(rawLead: any): Lead {
    this.validateTelephone(rawLead.telephone);

    return {
      name: rawLead.name,
      email: rawLead.email,
      telephone: rawLead.telephone,
      flHonSucumbenciais: rawLead.flHonSucumbenciais,
      flHonContratuais: rawLead.flHonContratuais,
      flHonDativos: rawLead.flHonDativos,
      flCreditoAutor: rawLead.flCreditoAutor,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  create(rawLead: Object): void {
    const newLead = this.validateLead(rawLead);
    newLead.status = 'Cliente em Potencial';
    super.post(newLead);
  }

  update(rawLead: Object): void {
    const newLead = this.validateLead(rawLead);

    super.put(newLead.id ?? -1, newLead);
  }

  getLeadsByStatus() {
    const leadList = super.get();

    return this.groupByStatus(this.validateLeadList(leadList));
  }

  groupByStatus(inputArray: Lead[]): LeadCollectionByStatus[] {
    const statusMap = new Map<string, Lead[]>();

    for (const item of inputArray) {
      const status = item.status ?? '';
      if (!statusMap.has(status)) {
        statusMap.set(status, []);
      }
      statusMap.get(status)?.push(item);
    }

    const outputArray: LeadCollectionByStatus[] = [];
    statusMap.forEach((items, statusName) => {
      outputArray.push({ statusName, itemsList: items });
      if(this.statusList.includes(statusName)){
        this.statusList.splice(this.statusList.indexOf(statusName), 1);
      }
    });

    for(const status in this.statusList) {
      outputArray.push({ statusName: this.statusList[status], itemsList: [] });
    }
    
    return outputArray;
  }
}