import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Server-app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename'
    };

    test('Should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe('function');

    });

    test('Should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const SaveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run( options );

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('File Created!!');

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect( SaveFileSpy ).toHaveBeenCalledTimes(1);
        expect( SaveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

    });

});
