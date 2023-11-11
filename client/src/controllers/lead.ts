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
  private statusList = {"Cliente em Potencial": 0, "Dados Confirmados": 1, "Análise do Lead": 2};
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
    if(typeof rawLead.id == 'number') {
      return {
        id: rawLead.id,
        name: rawLead.name,
        email: rawLead.email,
        telephone: rawLead.telephone,
        flHonSucumbenciais: rawLead.flHonSucumbenciais,
        flHonContratuais: rawLead.flHonContratuais,
        flHonDativos: rawLead.flHonDativos,
        flCreditoAutor: rawLead.flCreditoAutor,
        status: rawLead.status,
        created_at: new Date(),
        updated_at: new Date(),
      };
    } else {
      return {
        id: this.getCount(),
        name: rawLead.name,
        email: rawLead.email,
        telephone: rawLead.telephone,
        flHonSucumbenciais: rawLead.flHonSucumbenciais,
        flHonContratuais: rawLead.flHonContratuais,
        flHonDativos: rawLead.flHonDativos,
        flCreditoAutor: rawLead.flCreditoAutor,
        status: 'Cliente em Potencial',
        created_at: new Date(),
        updated_at: new Date(),
      };
    }
  }

  create(rawLead: Object): void {
    const newLead = this.validateLead(rawLead);
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
    const outputArray: LeadCollectionByStatus[] = [];

    for (const item of inputArray) {
      const status = item.status ?? '';
      if (!statusMap.has(status)) {
        statusMap.set(status, []);
      }
      statusMap.get(status)?.push(item);
    }

    for(const statusNameIndex in this.statusList) {
      outputArray[this.statusList[statusNameIndex]] = { statusName: statusNameIndex, itemsList: [] };
    }

    statusMap.forEach((items, statusName) => {
      outputArray[this.statusList[statusName]].itemsList = items;
    });

    
    return outputArray;
  }

  updateLeadsStatus(list: any) {
    let newList = Object.entries(list);
    for(const i in newList) {
      const statusName = newList[i][1].statusName;
      let itemsList = newList[i][1].itemsList
      for(const index in itemsList) {
        itemsList[index].status = statusName;
        this.update(itemsList[index]);
      }
    }
  }

  getCount() {
    return this.get().length || 0;
  }
}