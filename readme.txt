SQL Server
- Using SSMS (or any DBMS), open the SeedData_Titles.sql file. Execute the script

WM-API/WM-Title Directory
- Ensure config.json exists within api executable directory. If not, create config.json within the directory)
- Within config.json, add connection string to sql server database as value of TitleConnectionString field. 
	Example: "TitleConnectionString": "ENTER CONNECTION STRING HERE"

Visual Studio can be used to run the project in development mode (via Start Debug/Start Without Debug options, which would lunch the webservice as an IIS Express application)

WM-Title-Front
*Ensure to install the latest version of Node.js (https://nodejs.org/en/, either LTS or Latest Version). You can check the version using the following commands within the command line:
	node -v
	npm -v
	
You must also add the api URI by setting it within the .env file, which exists within the /src directory.
Open the file with a text editor and set REACT_APP_WM_API_URL to the url of the webservice api
	Example: REACT_APP_WM_API_URL={Webservice Here}
(if the .env file does not exist, you can create the file within the /src directory and add the REACT_APP_WM_API_URL={webservice} variable)

To run the application, using command line, go change the directory to titles-front directory and run npm start:
	cd titles-front
	npm start