import connection from '../config/db-config';
import Grocer from '../models/Grocer';

export const registerGrocer = (data: Grocer): Promise<boolean> => {

    const insertGrocerQuery = 'insert into Grocer (email_grocer, name_grocer, last_name_grocer, name_store, city_grocer, password_grocer) VALUES (?,?,?,?,?,?)';
    const insertPhoneQuery = 'insert into GrocerPhone (number_grocer, fk_phone_email_grocer) values (?,?)';
    const insertAddressQuery = 'insert into GrocerAddress (neighborhood, street, number_street, fk_address_email_grocer) VALUES (?,?,?,?)';

    return new Promise<boolean>((resolve, reject) => {
        connection.query(insertGrocerQuery, [data.email_grocer, data.name_grocer, data.last_name_grocer, data.name_store, data.city_grocer, data.password_grocer], (error) => {
            if (error) {
                reject(error);
            } else {
                connection.query(insertAddressQuery, [data.neighborhood, data.street, data.number_street, data.email_grocer], (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        connection.query(insertPhoneQuery, [data.number_grocer, data.email_grocer], (error) => {
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