
//Class used to create a ticket object
export class Ticket {
  CaseId!: string;
  CustomerId!: string;
  Problem!: string;
  Solution!: string;
  Status: string = "Open"; //default value=Open
  DateOpened: Date = new Date(); //default value= current date
  DateClosed!: Date;
}

