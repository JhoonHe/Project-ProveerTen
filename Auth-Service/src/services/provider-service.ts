import connection from '../config/db-config';
import Provider from '../models/Provider';
import comparePassword from './comparePassword-service';

export const registerProvider = (data: Provider, callback: any) => {
    const procInsertProviderQuery = 'call insertProvider (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,@message_text)';
    try {
        connection.query(procInsertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider, data.neighborhood,
        data.street, data.number_street, data.number_provider], (error, results) => {
            if (error) {
                return callback(error)
            }
            callback(null, results)
        })
    } catch (error) {
        return callback(error)
    }
}

export const loginProvider = (data: Provider, callback: any) => {
    const getProviderQuery = 'call get_data_provider(?);';
    try {
        connection.query(getProviderQuery, [data.email_provider], (error: any, results: any) => {
            if (error) {
                return callback(error)
            }
            let claveAlmacenada: string = results[0][0].password_provider;
            let verificar: boolean = comparePassword(data.password_provider, claveAlmacenada);
            callback(null, verificar)
        })
    } catch (error) {
        return callback(error)
    }
};