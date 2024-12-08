"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const connection_1 = __importDefault(require("./connection"));
const products_1 = __importDefault(require("../Models/products"));
const sales_1 = __importDefault(require("../Models/sales"));
const productsFilePath = "./data/products.csv";
const salesFilePath = "./data/sales.csv";
(0, connection_1.default)();
const setCollection = (file, collection) => {
    try {
        (0, csvtojson_1.default)()
            .fromFile(file)
            .then((jsonObj) => {
            if (collection == "products") {
                products_1.default.insertMany([...jsonObj]);
            }
            else {
                sales_1.default.insertMany([...jsonObj]);
            }
            console.log(`data has been succesfully stored in the database for  ${collection} `);
        });
    }
    catch (err) {
        console.log(err);
    }
};
setCollection(productsFilePath, "products");
setCollection(salesFilePath, "sales");
