# How to Contribute to DLCheck:

Before attempting to modify the code, run ```npm install``` to install all the dependencies required for the project.

The CLICOLOR variable in the .env could be modified to have either value of 1 to allow output colors or 0 to disable colors.

To run this tool in development mode, run the ```npm link``` command in the root of of the project.

# Code Formatting (Prettier):
To format the code, run ```npx prettier --write .``` to ensure that you're following the style guideline. Use ```npx prettier --check .``` to confirm that all source code files are formated.

# Code Checking (ESLint):
This project uses ESLint to check the code quality, to check for syntax errors/test your code quality, run ```eslint FILENAME``` to produce suggusted fixes.

# Prettier & ESLint VS Code Intergration:
To utilize Prettier and ESLint for this project, simply install the Prettier & ESLint extensions in VS Code and use the pre-configured files included in the project.

# Information about tests:
This project uses Jest test code functionalities, to run the existing tests, run the command ```npm run test```, to check the code coverage of the tests, run the command ```npm run coverage```. Consider to run the tests locally before trying to send in the updates. If you are adding new functionalities, please try to write some test to cover different cases.