"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProvider = void 0;
const db_config_1 = __importDefault(require("../config/db-config"));
const registerProvider = (data) => {
    const insertProviderQuery = 'INSERT INTO Provider (nit_provider, email_provider, name_provider, last_name_provider, name_company, city_provider, password_provider, description_provider) VALUES (?,?,?,?,?,?,?,?)';
    const insertPhoneQuery = 'INSERT INTO ProviderPhone (number_provider, fk_phone_email_provider) VALUES (?,?)';
    const insertAddressQuery = 'INSERT INTO ProviderAddress (neighborhood, street, number_street, fk_address_email_provider) VALUES (?,?,?,?)';
    return new Promise((resolve, reject) => {
        db_config_1.default.query(insertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider], (error) => {
            if (error) {
                reject(error);
            }
            else {
                db_config_1.default.query(insertPhoneQuery, [data.number_provider, data.email_provider], (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        db_config_1.default.query(insertAddressQuery, [data.neighborhood, data.street, data.number_provider, data.email_provider], (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
};
exports.registerProvider = registerProvider;
