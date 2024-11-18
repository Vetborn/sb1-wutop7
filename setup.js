const { execSync } = require('child_process');

function setupNativeScript() {
    try {
        // Create .bashrc if it doesn't exist
        execSync('touch ~/.bashrc');

        // Create aliases for NativeScript commands
        const aliases = [
            'alias ns="node --no-warnings ./node_modules/.bin/@nativescript/preview-cli"',
            'alias nsc="node --no-warnings ./node_modules/.bin/@nativescript/preview-cli"',
            'alias tns="node --no-warnings ./node_modules/.bin/@nativescript/preview-cli"',
            'alias nativescript="node --no-warnings ./node_modules/.bin/@nativescript/preview-cli"'
        ];

        // Write aliases to .bashrc
        aliases.forEach(alias => {
            execSync(`echo '${alias}' >> ~/.bashrc`);
        });

        // Make preview-cli executable
        execSync('chmod +x ./node_modules/.bin/@nativescript/preview-cli');

        console.log('NativeScript environment setup completed successfully');
    } catch (error) {
        console.error('Error setting up NativeScript environment:', error);
        process.exit(1);
    }
}

setupNativeScript();