
export interface Brand {
    id: any;
    internalName: string;
    publicName: string;
    urlExtension: string;
    promotions: number,
    redeemed: number,
  }
  
  export  interface Promotion {
    id: any;
    brandId: string;
    name: string;
    date: Date;
    visits: number;
    redeemed: number;
    url: string;
    terms: string;
    incentive: string;
    promoCodes: string;
  }
  
  export  interface Feedback {
    id: any;
    firstName: string;
    lastName: string;
    email: string;
    date: Date;
    visits: number;
    orderId: number;
    redeemed: number;
    rating: number;
    feedback: string;
    promo: string;
  }
  

  export  interface Product {
    id: any;
    brandId: string;
    asinId: string;
    name: string;
    date: Date;
    visits: Number;
    redeemed: Number;
  }
  
  