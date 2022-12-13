
//Class used to create an organization object
export class Organization {
  Id!: String;
  Name!: String;
  Description!: String;
  Address!: String;
  Phone!: String;
  Email!: String;
  Username!: String; //username of the organization admin
  OrganizationStatus: String = "Active"; //Active or Inactive
  OrganizationType: String = "Medical";// Mechanic / Hairdresser / Nail Salon / 
}
    
    