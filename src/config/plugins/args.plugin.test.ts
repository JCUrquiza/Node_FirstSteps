
const runCommand = async(args: string[]) => {

    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('Test args.plugins.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('Should return default values', async() => {

        const argv = await runCommand(['-b', '5']);

        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }) );

    });

    test('Should return configuration with custom values', async() => {

        const argv = await runCommand(['-b', '3', '-l', '9', '-s', 'true', '-n', 'custom-name']);

        expect( argv ).toEqual( expect.objectContaining({
            b: 3,
            l: 9,
            s: true,
            n: 'custom-name',
        }) );

    });

});
