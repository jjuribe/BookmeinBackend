
//Class used to create a ticket object
export class Ticket {
  CaseId!: String;
  CustomerId!: String;
  Problem!: String;
  Solution!: String;
  Status: String = "Open"; //default value=Open
  DateOpened: Date = new Date(); //default value= current date
  DateClosed!: Date;
}

