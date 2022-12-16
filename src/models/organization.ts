
//Class used to create an organization object
export class Organization {
  Id!: string;
  Name!: string;
  Description!: string;
  Address!: string;
  Phone!: string;
  Email!: string;
  Username!: string; //username of the organization admin
  OrganizationStatus: string = "Active"; //Active or Inactive
  OrganizationType: string = "Medical";// Mechanic / Hairdresser / Nail Salon / 
}
    
    