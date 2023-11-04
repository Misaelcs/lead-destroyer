import { APIClient } from './apiClient';

interface Lead {
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

interface LeadCollection {
  leads: Lead[];
}

class LeadController extends APIClient{
  private api: any;
  private leads: Lead[] = [];
  private idCounter: number = 1;

  constructor() {
    super('lead');

  }

  private validateTelephone(telephone: string): boolean {
    return /^(\d{10}|\d{11})$/.test(telephone);
  }

  read(id: number = -1): Object | LeadCollection {
    const rawLead = super.get(id);
    let result;

    if(rawLead as LeadCollection)
      return rawLead as LeadCollection
    else
      throw Error("The data retrieved doesn't match a Lead Collection type");
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

    super.post(newLead);
  }

  update(rawLead: Object): void {
    const newLead = this.validateLead(rawLead);

    super.put(newLead.id ?? -1, newLead);
  }
}

export default LeadController;
