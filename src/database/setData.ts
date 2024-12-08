import csv from "csvtojson";
import ConnectDb from "./connection";
import Product from "../Models/products";
import Sale from "../Models/sales";

const productsFilePath = "./data/products.csv";
const salesFilePath = "./data/sales.csv";

ConnectDb();

const setCollection = (file: any, collection: string) => {
  try {
    csv()
      .fromFile(file)
      .then((jsonObj: any) => {
       
        
        if (collection == "products") {
          Product.insertMany([...jsonObj]);
        } else {
          Sale.insertMany([...jsonObj]);
        }

        console.log(`data has been succesfully stored in the database for  ${collection} `);
      });
  } catch (err: any) {
    console.log(err);
  }
};
setCollection(productsFilePath, "products");
setCollection(salesFilePath, "sales");
