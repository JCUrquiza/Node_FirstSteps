import fs, { writeFileSync } from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination : 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };

    const customFilePath = `${ customOptions.fileDestination }/${ customOptions.fileName }.txt`;
    
    // Para evitar falsos positivos, borrar los archivos creados en outputs
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
        
        const customOutputFolderExists = fs.existsSync( customOptions.fileDestination );
        if ( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('Should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        };

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toContain( options.fileContent );

    });

    test('Should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8' } );

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toContain( customOptions.fileContent );

    });

    test('Should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy= jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error'); }
        );
        const result = saveFile.execute( customOptions );

        expect( result ).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy= jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('error'); }
        );
        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe(false);

        writeFileSpy.mockRestore();
    });

});
