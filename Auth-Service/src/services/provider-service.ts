import connection from '../config/db-config';
import Provider from '../models/Provider';

export const registerProvider = (data: Provider): Promise<boolean> => {

    const insertProviderQuery = 'INSERT INTO Provider (nit_provider, email_provider, name_provider, last_name_provider, name_company, city_provider, password_provider, description_provider) VALUES (?,?,?,?,?,?,?,?)';
    const insertPhoneQuery = 'INSERT INTO ProviderPhone (number_provider, fk_phone_email_provider) VALUES (?,?)';
    const insertAddressQuery = 'INSERT INTO ProviderAddress (neighborhood, street, number_street, fk_address_email_provider) VALUES (?,?,?,?)';

    return new Promise<boolean>((resolve, reject) => {
        connection.query(insertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider], (error) => {
            if (error) {
                reject(error);
            } else {
                connection.query(insertPhoneQuery, [data.number_provider, data.email_provider], (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(insertAddressQuery, [data.neighborhood, data.street, data.number_provider, data.email_provider], (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    });
};
